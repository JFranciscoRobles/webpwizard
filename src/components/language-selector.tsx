'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { localeNames, type Locale } from '@/i18n/config';
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "@/navigation";

export function LanguageSelector({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  // Get current locale from params if available, otherwise use hook
  const currentLocale = (params?.locale as Locale) || locale;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-1.5", className)}
        >
          <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
          <span className="sm:hidden">{currentLocale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(localeNames) as Locale[]).map((loc) => (
          <DropdownMenuItem
            key={loc}
            disabled={loc === currentLocale}
            onClick={() => {
              // Navigate to the same page with different locale
              router.replace(pathname, { locale: loc });
            }}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <span>{localeNames[loc]}</span>
              {loc === currentLocale && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
