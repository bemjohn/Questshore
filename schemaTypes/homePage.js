import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Make every destination memorable' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Curated bucket-list adventures waiting for you at every port of call.' }),
        defineField({ name: 'accentText', title: 'Accent Text', type: 'string', initialValue: 'Shore Excursions' }),
        defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'mobileBackgroundImage', title: 'Mobile Background Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'overlayOpacity', title: 'Overlay Opacity', type: 'number', initialValue: 40, validation: (Rule) => Rule.min(0).max(100) }),
        defineField({ name: 'showSearch', title: 'Show Search Form', type: 'boolean', initialValue: true }),
      ],
    }),
    defineField({
      name: 'destinationsSection',
      title: 'Explore Our Destinations Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Explore Our Destinations' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Handpicked shore excursions across the most breathtaking South Pacific ports.' }),
      ],
    }),
    defineField({
      name: 'whyQuestAshore',
      title: 'Why QuestAshore Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Why QuestAshore?' }),
        defineField({
          name: 'cards',
          title: 'Feature Cards',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'featureCard',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'text', title: 'Text', type: 'text' }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Shield Check', value: 'shield-check' },
                      { title: 'Info Circle', value: 'info-circle' },
                      { title: 'Dollar Sign', value: 'dollar-sign' },
                      { title: 'Heart', value: 'heart' },
                    ],
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Real Stories From Real Cruisers' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Hear from guests who experienced the QuestAshore difference.' }),
        defineField({
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'testimonial',
              fields: [
                defineField({ name: 'name', title: 'Name', type: 'string' }),
                defineField({ name: 'isVerified', title: 'Verified Guest', type: 'boolean', initialValue: true }),
                defineField({ name: 'rating', title: 'Rating (1-5)', type: 'number', initialValue: 5, validation: (Rule) => Rule.min(1).max(5) }),
                defineField({ name: 'quote', title: 'Quote', type: 'text' }),
                defineField({ name: 'avatarInitials', title: 'Avatar Initials', type: 'string', description: 'Single letter shown as avatar fallback' }),
                defineField({ name: 'avatarColor', title: 'Avatar Color', type: 'string', description: 'Tailwind color class e.g. sky-100' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Frequently Asked Questions' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Everything you need to know before booking.' }),
        defineField({
          name: 'faqs',
          title: 'FAQs',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'faq',
              fields: [
                defineField({ name: 'question', title: 'Question', type: 'string' }),
                defineField({ name: 'answer', title: 'Answer', type: 'text' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
