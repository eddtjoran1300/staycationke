// app/privacy/page.js
import { client, SITE_SETTINGS_QUERY } from '@/lib/sanity'
import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'Privacy Policy — StaycationKE',
}

export default async function PrivacyPage() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)
  return <LegalPage title="Privacy Policy" content={settings?.privacyPolicy} />
}
