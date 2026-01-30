import { getTranslations } from 'next-intl/server';
import { type Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { PageFooter } from '@/components/layout/page-footer';
import { Link } from '@/navigation';
import { ArrowLeft, Shield, Zap, Gift, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.about.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.about' });
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

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">{t('title')}</h1>
            <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
          </div>

          {/* What is WebpWizard */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h2 className="text-2xl font-semibold mb-4">{t('whatIs.title')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('whatIs.description')}</p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold mb-6">{t('features.title')}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                <Shield className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">{t('features.privacy.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('features.privacy.description')}</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                <Zap className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">{t('features.fast.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('features.fast.description')}</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                <Gift className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">{t('features.free.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('features.free.description')}</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                <Archive className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">{t('features.batch.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('features.batch.description')}</p>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h2 className="text-2xl font-semibold mb-4">{t('howItWorks.title')}</h2>
            <p className="text-muted-foreground mb-6">{t('howItWorks.description')}</p>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">1</span>
                <p className="text-muted-foreground">{t('step1')}</p>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">2</span>
                <p className="text-muted-foreground">{t('step2')}</p>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">3</span>
                <p className="text-muted-foreground">{t('step3')}</p>
              </li>
            </ol>
          </section>

          {/* Open Source */}
          <section className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-xl font-semibold mb-2">{t('openSource.title')}</h2>
            <p className="text-muted-foreground">{t('openSource.description')}</p>
          </section>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
