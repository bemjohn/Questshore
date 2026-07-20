import { defineField, defineType } from 'sanity'

export const regionPage = defineType({
  name: 'regionPage',
  title: 'Region Page',
  type: 'document',
  fields: [
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'South Pacific', value: 'south-pacific' },
          { title: 'Caribbean', value: 'caribbean' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
        defineField({ name: 'accentText', title: 'Accent Text', type: 'string' }),
        defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'mobileBackgroundImage', title: 'Mobile Background Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'overlayOpacity', title: 'Overlay Opacity', type: 'number', initialValue: 30, validation: (Rule) => Rule.min(0).max(100) }),
        defineField({ name: 'showSearch', title: 'Show Search Form', type: 'boolean', initialValue: false }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'region',
    },
  },
})
