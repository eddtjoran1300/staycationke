// app/terms/page.js
import { client, SITE_SETTINGS_QUERY } from '@/lib/sanity'
import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'Terms of Use — StaycationKE',
}

export default async function TermsPage() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)
  return <LegalPage title="Terms of Use" content={settings?.termsOfUse} />
}
