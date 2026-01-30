import { getTranslations } from 'next-intl/server';
import { type Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { PageFooter } from '@/components/layout/page-footer';
import { Link } from '@/navigation';
import { ArrowLeft, Shield, Cookie, Eye, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.privacy.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.privacy' });
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

          {/* No Data Collection */}
          <section className="bg-green-500/5 rounded-2xl p-8 border border-green-500/20">
            <div className="flex gap-4 items-start">
              <Shield className="w-6 h-6 text-green-600 shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-3">{t('noDataCollection.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('noDataCollection.description')}</p>
              </div>
            </div>
          </section>

          {/* What We Collect */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h2 className="text-xl font-semibold mb-4">{t('whatWeCollect.title')}</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <Eye className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">{t('whatWeCollect.analytics.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('whatWeCollect.analytics.description')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <div className="flex gap-4 items-start">
              <Cookie className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-3">{t('cookies.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('cookies.description')}</p>
              </div>
            </div>
          </section>

          {/* Third Party */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h2 className="text-xl font-semibold mb-4">{t('thirdParty.title')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('thirdParty.description')}</p>
          </section>

          {/* Your Rights */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h2 className="text-xl font-semibold mb-4">{t('yourRights.title')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('yourRights.description')}</p>
          </section>

          {/* Contact */}
          <section className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <div className="flex gap-4 items-start">
              <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-3">{t('contact.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('contact.description')}</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
