import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: "Type the short port name only, lowercase, with dashes instead of spaces — e.g. 'port-vila', NOT 'port-vila-vanuatu'. This must exactly match the folder name under app/destinations/[region]/ in the code.",
      options: {
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 40),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'country', type: 'string', title: 'Country'}),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {list: ['South Pacific', 'Caribbean']},
    }),
    defineField({name: 'cardImage', type: 'image', title: 'Card Image'}),
    defineField({name: 'heroImage', type: 'image', title: 'Hero Image'}),
    defineField({name: 'overview', type: 'text', title: 'Overview'}),
    defineField({
      name: 'points_of_interest',
      title: 'Points of Interest',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'excursions',
      title: 'Excursions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'photo', type: 'image', title: 'Photo', options: {hotspot: true}},
            {
              name: 'pricing',
              title: 'Pricing',
              type: 'object',
              fields: [
                {name: 'adult', type: 'number', title: 'Adult Price'},
                {name: 'child', type: 'number', title: 'Child Price'},
              ],
            },
            {name: 'description', type: 'text', title: 'Description'},
            {name: 'requiresTime', type: 'boolean', title: 'Requires Time'},
            {
              name: 'highlights',
              title: 'Highlights',
              type: 'array',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'orderRank', direction: 'asc'}],
    },
  ],
})
