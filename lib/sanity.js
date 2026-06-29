// lib/sanity.js
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// ── GROQ QUERIES ────────────────────────────────────────────────────────────

// All active properties
export const PROPERTIES_QUERY = `
  *[_type == "property" && active == true] | order(guestRating desc) {
    _id,
    name,
    slug,
    propertyType,
    town,
    county,
    region,
    starRating,
    guestRating,
    ratingLabel,
    reviewCount,
    featured,
    priceRange,
    shortDescription,
    amenities,
    coverImage,
    "gallery": gallery[]{
      asset,
      alt,
      caption
    },
    expediaAffiliateLink,
  }
`

// Single property by slug
export const PROPERTY_BY_SLUG_QUERY = `
  *[_type == "property" && slug.current == $slug && active == true][0] {
    _id,
    name,
    slug,
    propertyType,
    town,
    county,
    region,
    starRating,
    guestRating,
    ratingLabel,
    reviewCount,
    featured,
    priceRange,
    shortDescription,
    amenities,
    coverImage,
    "gallery": gallery[]{
      asset,
      alt,
      caption
    },
    expediaAffiliateLink,
  }
`

// All active activities
export const ACTIVITIES_QUERY = `
  *[_type == "activity" && active == true] | order(guestRating desc) {
    _id,
    name,
    slug,
    activityType,
    town,
    county,
    region,
    guestRating,
    ratingLabel,
    reviewCount,
    featured,
    priceRange,
    shortDescription,
    features,
    coverImage,
    "gallery": gallery[]{
      asset,
      alt,
      caption
    },
    expediaAffiliateLink,
  }
`

// Single activity by slug
export const ACTIVITY_BY_SLUG_QUERY = `
  *[_type == "activity" && slug.current == $slug && active == true][0] {
    _id,
    name,
    slug,
    activityType,
    town,
    county,
    region,
    guestRating,
    ratingLabel,
    reviewCount,
    featured,
    priceRange,
    shortDescription,
    features,
    coverImage,
    "gallery": gallery[]{
      asset,
      alt,
      caption
    },
    expediaAffiliateLink,
  }
`

// All active destinations
export const DESTINATIONS_QUERY = `
  *[_type == "destination" && active == true] | order(region asc, order asc) {
    _id,
    name,
    slug,
    county,
    region,
    shortDescription,
    coverImage,
    expediaAffiliateLink,
    isFeatured,
    order,
  }
`

// Site settings singleton
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    heroHeadlinePart1,
    heroHeadlinePart2,
    heroSubtitle,
    heroBackgroundImage,
    featuredDestinations,
    siteTitle,
    siteDescription,
    ogImage,
    siteUrl,
    aboutHeadline,
    aboutBody,
    affiliateDisclosure,
    privacyPolicy,
    termsOfUse,
    footerTagline,
    instagramUrl,
    twitterUrl,
    tiktokUrl,
    footerDisclaimerText,
  }
`
