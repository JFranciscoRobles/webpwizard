'use client';

import { Github, Image as ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";

export function PageFooter() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="border-t border-border/40 mt-16 py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ImageIcon className="w-5 h-5" />
            <span>{t('title')}</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/JFranciscoRobles/webpwizard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">{t('github')}</span>
            </a>
          </div>
        </div>

        {/* Privacy notice */}
        <p className="text-xs text-center text-muted-foreground mb-4">
          {t('privacy')}
        </p>

        {/* Footer links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('about')}
          </Link>
          <span className="text-muted-foreground/30">•</span>
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('privacyPolicy')}
          </Link>
          <span className="text-muted-foreground/30">•</span>
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('terms')}
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-center text-muted-foreground mt-6">
          © 2025 WebpWizard. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
