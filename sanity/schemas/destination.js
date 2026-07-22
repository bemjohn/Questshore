import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}}),
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
