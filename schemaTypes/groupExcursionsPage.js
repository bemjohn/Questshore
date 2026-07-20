import { defineField, defineType } from 'sanity'

export const groupExcursionsPage = defineType({
  name: 'groupExcursionsPage',
  title: 'Group Excursions (Custom)',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Custom Group Shore Excursions' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Tailored private port adventures for your group, family, or corporate event.' }),
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Introduction Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'GROUP EXPERIENCES DESIGNED WITH YOU IN MIND' }),
        defineField({ name: 'text', title: 'Text', type: 'text' }),
      ],
    }),
    defineField({
      name: 'groupTypes',
      title: 'Group Types',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'groupType',
          fields: [
            defineField({ name: 'number', title: 'Number', type: 'string', initialValue: '01' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'text', title: 'Text', type: 'text' }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Users', value: 'users' },
                  { title: 'Briefcase', value: 'briefcase' },
                  { title: 'Sparkles', value: 'sparkles' },
                ],
              },
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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'GET STARTED' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Design Your Private Group Experience' }),
        defineField({ name: 'successTitle', title: 'Success Title', type: 'string', initialValue: 'Request Received!' }),
        defineField({ name: 'successText', title: 'Success Text', type: 'text' }),
      ],
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer Note',
      type: 'text',
      initialValue: 'All custom group departures feature our standard Back-To-Ship Guarantee.',
    }),
  ],
})
