// app/layout.js
import './globals.css'
import Script from 'next/script'
import { client, SITE_SETTINGS_QUERY } from '@/lib/sanity'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageLoader from '@/components/PageLoader'
import ExpediaLoader from '@/components/ExpediaLoader'
import ShareToast from '@/components/ShareToast'

export async function generateMetadata() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)
  return {
    title: settings?.siteTitle || 'StaycationKE | Holiday Rentals & Experiences in Kenya',
    description: settings?.siteDescription || 'Discover and book the best holiday rentals across Kenya.',
    metadataBase: new URL(settings?.siteUrl || 'https://staycationske.com'),
    openGraph: {
      title: settings?.siteTitle || 'StaycationKE',
      description: settings?.siteDescription || 'Holiday rentals across Kenya.',
      url: settings?.siteUrl || 'https://staycationske.com',
      siteName: 'StaycationKE',
      images: settings?.ogImage
        ? [{ url: `https://cdn.sanity.io/images/duscjrto/production/${settings.ogImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`, width: 1200, height: 630 }]
        : [{ url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80', width: 1200, height: 630 }],
      locale: 'en_KE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.siteTitle || 'Staycation Kenya',
      description: settings?.siteDescription || 'Holiday rentals across Kenya.',
    },
  }
}

export default async function RootLayout({ children }) {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)

  return (
    <html lang="en">
      <body>
        <PageLoader />
        <ExpediaLoader />
        <ShareToast />
        <Nav settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />

        {/* Google Translate — must load before body content finishes */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit(){
              new google.translate.TranslateElement({
                pageLanguage:'en',
                includedLanguages:'en,sw,fr,de,es,ar,zh-CN,pt,it',
                layout:google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay:false
              },'google_translate_element');
            }
          `}
        </Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* Expedia Widget — lazyOnload so it doesn't block page render */}
        <Script
          src="https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js"
          strategy="lazyOnload"
          id="eg-widgets-script"
          onLoad={() => {
            if (window.EGWidgets) window.EGWidgets.init()
          }}
        />
      </body>
    </html>
  )
}
