// app/activity/[slug]/page.js
import { client, ACTIVITY_BY_SLUG_QUERY, ACTIVITIES_QUERY, urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import ActivityDetailClient from '@/components/ActivityDetailClient'

export async function generateMetadata({ params }) {
  const activity = await client.fetch(ACTIVITY_BY_SLUG_QUERY, { slug: params.slug })
  if (!activity) return {}

  const imageUrl = activity.coverImage
    ? urlFor(activity.coverImage).width(1200).height(630).fit('crop').url()
    : 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80'

  const title = `${activity.name} · ${activity.town} — StaycationKE`
  const description = activity.shortDescription

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://staycationske.com/activity/${params.slug}`,
      siteName: 'StaycationKE',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: activity.name }],
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

export async function generateStaticParams() {
  const activities = await client.fetch(ACTIVITIES_QUERY)
  return activities.map((a) => ({ slug: a.slug.current }))
}

export default async function ActivityPage({ params }) {
  const activity = await client.fetch(ACTIVITY_BY_SLUG_QUERY, { slug: params.slug })
  if (!activity) notFound()

  return <ActivityDetailClient activity={activity} />
}
