<?php

namespace App\Enums;

enum MenuItemType: string
{
    case Header = 'header';
    case Link = 'link';

    public function isHeader(): bool
    {
        return $this === self::Header;
    }

    public function isLink(): bool
    {
        return $this === self::Link;
    }
}
