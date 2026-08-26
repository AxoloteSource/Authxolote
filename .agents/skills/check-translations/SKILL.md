---
name: check-translations
description: >
  Verifies frontend i18n translation keys against locale files using the project script
  `scripts/check_translations.py`. Use when the user mentions translations, i18n,
  missing translation keys, unused keys, locales, t('key'), or after adding/changing any
  t() call in resources/js.
---

# Check Translations

This project has a script to validate that every translation key used in the frontend exists in every locale file.

## Script

- Path: `scripts/check_translations.py`
- Frontend source scanned: `resources/js/**/*.{ts,tsx}` — extracts keys from `t('key')`, `t("key")`, `i18n.t('key')`, `i18n.t("key")`
- Locale files checked: `public/locales/<locale>/translation.json` (currently `en`, `es`)

## Usage

```bash
# Report missing keys per locale. Exits 1 if any key is missing.
python3 scripts/check_translations.py

# Also report keys defined in locales but not used in the frontend.
python3 scripts/check_translations.py --unused
```

## When to run it

- After adding or changing any `t()` / `i18n.t()` call in `resources/js`.
- When the user reports a missing translation or raw keys showing in the UI.
- Before finalizing changes that touch UI labels.

## Workflow

1. Run `python3 scripts/check_translations.py`.
2. If output reports `[locale] missing N key(s)`: add each listed key with its translation to `public/locales/<locale>/translation.json` for **every** locale directory (`en` and `es`).
3. Re-run the script until it prints: `All translation keys are present in every locale.`
4. Use `--unused` only when the user asks to clean up dead keys; do not delete keys on your own initiative.
