import { defineField, defineType } from 'sanity'

export const affiliateNetworkPage = defineType({
  name: 'affiliateNetworkPage',
  title: 'Affiliate Network',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'AFFILIATE NETWORK' }),
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'howItWorks',
      title: 'How It Works Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'HOW IT WORKS' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Four Simple Steps' }),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'step',
              fields: [
                defineField({ name: 'number', title: 'Number', type: 'string' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'text', title: 'Text', type: 'text' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'WHY JOIN' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Affiliate Benefits' }),
        defineField({
          name: 'benefits',
          title: 'Benefits',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'benefit',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'text', title: 'Text', type: 'text' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'formSection',
      title: 'Form Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'APPLY NOW' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Become an Affiliate' }),
        defineField({ name: 'successTitle', title: 'Success Title', type: 'string', initialValue: 'Application Received!' }),
        defineField({ name: 'successText', title: 'Success Text', type: 'text' }),
      ],
    }),
  ],
})
