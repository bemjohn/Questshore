import { defineField, defineType } from 'sanity'

export const destination = defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'South Pacific', value: 'South Pacific' },
          { title: 'Caribbean', value: 'Caribbean' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (detail page)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroLabel',
      title: 'Hero Label',
      type: 'string',
      description: 'e.g. "SOUTH PACIFIC EXCURSIONS" or "CARIBBEAN EXCURSIONS"',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
    }),
    defineField({
      name: 'pointsOfInterest',
      title: 'Points of Interest',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'excursions',
      title: 'Excursions',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'excursion',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({
              name: 'highlights',
              title: 'Highlights',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            }),
            defineField({ name: 'adultPrice', title: 'Adult Price ($)', type: 'number', validation: (Rule) => Rule.required().min(0) }),
            defineField({ name: 'childPrice', title: 'Child Price ($)', type: 'number', description: 'Leave empty if not applicable' }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'adultPrice',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'region',
      media: 'image',
    },
  },
})
