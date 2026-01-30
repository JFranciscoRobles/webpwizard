import { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "next-intl";

interface PageHeaderProps {
  title?: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  const t = useTranslations('header');
  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm relative">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {title || t('title')}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">{description || t('description')}</p>
        </div>
        <div className="absolute top-6 right-4">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
