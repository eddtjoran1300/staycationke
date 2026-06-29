// app/affiliate/page.js
import { client, SITE_SETTINGS_QUERY } from '@/lib/sanity'
import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'Affiliate Disclosure — StaycationKE',
}

export default async function AffiliatePage() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)
  return <LegalPage title="Affiliate Disclosure" content={settings?.affiliateDisclosure} />
}
