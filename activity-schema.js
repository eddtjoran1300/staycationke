// schemas/activity.js
// Add this to your Sanity Studio schemas folder alongside property.js
// Then add it to schemas/index.js:
//   import activity from './activity'
//   export const schemaTypes = [property, activity, destination, siteSettings]

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'activity',
  title: 'Activity / Experience',
  type: 'document',

  fields: [

    defineField({
      name: 'name',
      title: 'Activity name',
      type: 'string',
      description: 'e.g. "Maasai Mara Hot Air Balloon Safari"',
      validation: (Rule) => Rule.required().max(80),
    }),

    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'Click "Generate" after typing the name.',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'activityType',
      title: 'Activity type',
      type: 'string',
      options: {
        list: [
          {title: 'Safari',          value: 'Safari'},
          {title: 'Beach & Water',   value: 'Beach'},
          {title: 'Cultural Tour',   value: 'Cultural'},
          {title: 'Adventure',       value: 'Adventure'},
          {title: 'Wildlife',        value: 'Wildlife'},
          {title: 'City Tour',       value: 'City Tour'},
          {title: 'Food & Drink',    value: 'Food'},
          {title: 'Wellness & Spa',  value: 'Wellness'},
          {title: 'Aerial',          value: 'Aerial'},
          {title: 'Day Trip',        value: 'Day Trip'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'active',
      title: 'Published / visible on site',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'featured',
      title: 'Featured badge',
      type: 'boolean',
      description: 'Shows a "Featured" badge on the activity card.',
      initialValue: false,
    }),

    // ── LOCATION ──────────────────────────────────────────────────────────

    defineField({
      name: 'town',
      title: 'Town / area',
      type: 'string',
      description: 'e.g. "Maasai Mara", "Diani Beach"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'county',
      title: 'County',
      type: 'string',
      options: {
        list: [
          'Mombasa', 'Kwale', 'Kilifi', 'Lamu', 'Tana River',
          'Taita-Taveta', 'Nairobi', 'Kiambu', 'Nakuru', 'Nyeri',
          'Laikipia', "Murang'a", 'Narok', 'Kajiado', 'Samburu',
          'Kisumu', 'Uasin Gishu', 'Other',
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'region',
      title: 'Region group',
      type: 'string',
      options: {
        list: [
          {title: '🏖  Coast',                value: 'coast'},
          {title: '🏙  Nairobi & Central',    value: 'central'},
          {title: '🦁  Safari & Rift Valley', value: 'safari'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── RATINGS ───────────────────────────────────────────────────────────

    defineField({
      name: 'guestRating',
      title: 'Guest rating (out of 10)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10).precision(1),
    }),

    defineField({
      name: 'ratingLabel',
      title: 'Rating label',
      type: 'string',
      options: {list: ['Exceptional', 'Excellent', 'Very Good', 'Good']},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'reviewCount',
      title: 'Number of reviews',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).integer(),
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "3 hours", "Full day", "2 days / 1 night"',
    }),

    // ── PRICING ───────────────────────────────────────────────────────────

    defineField({
      name: 'priceRange',
      title: 'Starting price (optional)',
      type: 'string',
      description: 'e.g. "From KES 8,500 / person" — display only.',
    }),

    // ── CONTENT ───────────────────────────────────────────────────────────

    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: '2–3 sentences. Used in the detail modal and WhatsApp share preview.',
      validation: (Rule) => Rule.required().min(40).max(400),
    }),

    defineField({
      name: 'features',
      title: 'What\'s included / features',
      type: 'array',
      description: 'Tick everything that applies. Shown with icons in the activity detail modal.',
      of: [{type: 'string'}],
      options: {
        list: [
          // Inclusions
          'Hotel pickup & drop-off', 'Airport transfer', 'Meals included',
          'Breakfast included', 'Lunch included', 'Dinner included',
          'Drinks included', 'Equipment provided', 'Guide included',
          'Professional guide', 'Expert naturalist guide',
          // Activity-specific
          'Game drive', 'Hot air balloon', 'Boat ride', 'Snorkelling gear',
          'Diving equipment', 'Bush walk', 'Night game drive',
          'Sundowner drinks', 'Bush dinner', 'Cultural visit',
          'Maasai village visit', 'Community experience',
          // Logistics
          'Small group (max 8)', 'Private tour available',
          'Child friendly', 'Wheelchair accessible',
          'Free cancellation', 'Instant confirmation',
          // Photography
          'Professional photos included', 'Video included',
          // Duration
          'Half day', 'Full day', 'Multi-day',
        ],
      },
      validation: (Rule) => Rule.required().min(2),
    }),

    // ── PHOTOS ────────────────────────────────────────────────────────────

    defineField({
      name: 'coverImage',
      title: 'Cover photo',
      type: 'image',
      description: 'Main photo for the activity card. Landscape, at least 1200×630px.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'gallery',
      title: 'Photo gallery',
      type: 'array',
      description: '📸 Drag and drop multiple photos at once. Min 2, max 10.',
      options: {layout: 'grid'},
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(2).max(10),
    }),

    // ── BOOKING LINK ──────────────────────────────────────────────────────

    defineField({
      name: 'expediaAffiliateLink',
      title: 'Expedia affiliate link',
      type: 'url',
      description: `
Paste the Expedia Things to Do affiliate link for this specific activity.

How to find it:
1. Go to expedia.com/things-to-do
2. Search for the activity by name
3. Click through to the activity's own page
4. Generate a trackable affiliate link from your CJ/EPS dashboard for that URL
5. Paste it here

Example:
https://www.expedia.com/activities/detail?id=123456&affid=XXXXX
      `.trim(),
      validation: (Rule) =>
        Rule.required()
          .uri({scheme: ['https']})
          .error('Must be a valid https:// Expedia affiliate URL'),
    }),
  ],

  preview: {
    select: {
      title:    'name',
      subtitle: 'town',
      media:    'coverImage',
      rating:   'guestRating',
      active:   'active',
      type:     'activityType',
    },
    prepare({title, subtitle, media, rating, active, type}) {
      return {
        title: `${active === false ? '⏸ ' : ''}${title}`,
        subtitle: `${type || ''} · ${subtitle || ''}${rating ? ' · ★ ' + rating : ''}`,
        media,
      }
    },
  },
})
