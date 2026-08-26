#!/usr/bin/env python3
"""Check that every translation key used in the frontend has a value in each locale.

Usage:
    python3 scripts/check_translations.py            # report missing/extra keys, exit 1 on missing
    python3 scripts/check_translations.py --unused   # also report unused keys
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FRONTEND_DIR = ROOT / "resources" / "js"
LOCALES_DIR = ROOT / "public" / "locales"

# Matches t('key'), t("key"), i18n.t('key'), i18n.t("key")
KEY_RE = re.compile(r"(?:\bt|i18n\.t)\(\s*(['\"])([^'\"]+)\1")

# Keys that are intentionally dynamic or not real translation keys.
IGNORED_KEYS: set[str] = set()


def extract_keys() -> set[str]:
    keys: set[str] = set()
    for path in FRONTEND_DIR.rglob("*"):
        if path.suffix not in (".ts", ".tsx"):
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        for _, key in KEY_RE.findall(text):
            keys.add(key)
    return keys - IGNORED_KEYS


def load_locale_keys(locale_dir: Path) -> set[str]:
    translation_file = locale_dir / "translation.json"
    if not translation_file.exists():
        print(f"WARNING: missing translation file: {translation_file}")
        return set()
    data = json.loads(translation_file.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError(f"{translation_file} must contain a JSON object")
    return set(data.keys())


def main() -> int:
    parser = argparse.ArgumentParser(description="Check frontend translation keys.")
    parser.add_argument("--unused", action="store_true", help="also report unused keys")
    args = parser.parse_args()

    used = extract_keys()

    if not LOCALES_DIR.exists():
        print(f"ERROR: locales directory not found: {LOCALES_DIR}")
        return 1

    locale_dirs = sorted(p for p in LOCALES_DIR.iterdir() if p.is_dir())
    if not locale_dirs:
        print(f"ERROR: no locale directories found under {LOCALES_DIR}")
        return 1

    all_locale_keys: set[str] = set()
    has_missing = False

    for locale_dir in locale_dirs:
        locale = locale_dir.name
        locale_keys = load_locale_keys(locale_dir)
        all_locale_keys |= locale_keys
        missing = sorted(used - locale_keys)
        if missing:
            has_missing = True
            print(f"\n[{locale}] missing {len(missing)} key(s):")
            for key in missing:
                print(f"    {key}")

        if args.unused:
            unused = sorted(locale_keys - used)
            if unused:
                print(f"\n[{locale}] unused {len(unused)} key(s):")
                for key in unused:
                    print(f"    {key}")

    if not has_missing:
        print("All translation keys are present in every locale.")

    return 1 if has_missing else 0


if __name__ == "__main__":
    sys.exit(main())
