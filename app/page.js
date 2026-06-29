// app/page.js
import { client, PROPERTIES_QUERY, ACTIVITIES_QUERY, DESTINATIONS_QUERY, SITE_SETTINGS_QUERY, urlFor } from '@/lib/sanity'
import HeroSection from '@/components/HeroSection'
import CategoryBar from '@/components/CategoryBar'
import PropertyGrid from '@/components/PropertyGrid'
import DestinationsSection from '@/components/DestinationsSection'
import ActivitiesSection from '@/components/ActivitiesSection'
import AboutSection from '@/components/AboutSection'

export default async function HomePage() {
  const [properties, activities, destinations, settings] = await Promise.all([
    client.fetch(PROPERTIES_QUERY),
    client.fetch(ACTIVITIES_QUERY),
    client.fetch(DESTINATIONS_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ])

  return (
    <>
      <HeroSection settings={settings} />
      <CategoryBar />
      <PropertyGrid properties={properties} />
      <AboutSection settings={settings} />
      <DestinationsSection destinations={destinations} />
      <ActivitiesSection activities={activities} />
    </>
  )
}
