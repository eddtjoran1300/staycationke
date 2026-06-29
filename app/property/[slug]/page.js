// app/property/[slug]/page.js
import { client, PROPERTY_BY_SLUG_QUERY, PROPERTIES_QUERY, urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import PropertyDetailClient from '@/components/PropertyDetailClient'

// Generate OG metadata per property — this is what WhatsApp reads
export async function generateMetadata({ params }) {
  const property = await client.fetch(PROPERTY_BY_SLUG_QUERY, { slug: params.slug })
  if (!property) return {}

  const imageUrl = property.coverImage
    ? urlFor(property.coverImage).width(1200).height(630).fit('crop').url()
    : 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80'

  const title = `${property.name} · ${property.town} — StaycationKE`
  const description = property.shortDescription

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://staycationske.com/property/${params.slug}`,
      siteName: 'StaycationKE',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: property.name }],
      type: 'website',
      locale: 'en_KE',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

// Pre-generate pages for all active properties at build time
export async function generateStaticParams() {
  const properties = await client.fetch(PROPERTIES_QUERY)
  return properties.map((p) => ({ slug: p.slug.current }))
}

export default async function PropertyPage({ params }) {
  const property = await client.fetch(PROPERTY_BY_SLUG_QUERY, { slug: params.slug })
  if (!property) notFound()

  return <PropertyDetailClient property={property} />
}
