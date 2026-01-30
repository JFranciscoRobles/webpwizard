import { getTranslations } from 'next-intl/server';
import { type Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { PageFooter } from '@/components/layout/page-footer';
import { Link } from '@/navigation';
import { ArrowLeft, FileText, UserCheck, AlertTriangle, Scale, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.terms.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.terms' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <PageHeader />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {tCommon('back')}
          </Button>
        </Link>

        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">{t('title')}</h1>
            <p className="text-sm text-muted-foreground">{t('lastUpdated')}</p>
          </div>

          {/* Intro */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <p className="text-muted-foreground leading-relaxed">{t('intro')}</p>
          </section>

          {/* The Service */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <div className="flex gap-4 items-start">
              <FileText className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('service.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('service.description')}</p>
              </div>
            </div>
          </section>

          {/* No Account */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <div className="flex gap-4 items-start">
              <UserCheck className="w-6 h-6 text-green-600 shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('noAccount.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('noAccount.description')}</p>
              </div>
            </div>
          </section>

          {/* Limitations */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <div className="flex gap-4 items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('limitations.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('limitations.description')}</p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h2 className="text-xl font-semibold mb-4">{t('intellectual.title')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('intellectual.description')}</p>
          </section>

          {/* Liability */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <div className="flex gap-4 items-start">
              <Scale className="w-6 h-6 text-orange-600 shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{t('liability.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('liability.description')}</p>
              </div>
            </div>
          </section>

          {/* Changes */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h2 className="text-xl font-semibold mb-4">{t('changes.title')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('changes.description')}</p>
          </section>

          {/* GitHub Link */}
          <section className="bg-muted/30 rounded-2xl p-6 border border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5" />
              <span className="text-sm">View source code on GitHub</span>
            </div>
            <a
              href="https://github.com/JFranciscoRobles/webpwizard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              github.com/JFranciscoRobles/webpwizard →
            </a>
          </section>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
