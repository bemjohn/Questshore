import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'Title'},
        {name: 'subtitle', type: 'string', title: 'Subtitle'},
        {name: 'image', type: 'image', title: 'Hero Image'},
      ],
    }),
    defineField({
      name: 'featuredDestinations',
      title: 'Featured Destinations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'destination'}]}],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'quote', type: 'text', title: 'Quote'},
            {name: 'author', type: 'string', title: 'Author'},
          ],
        },
      ],
    }),
  ],
})
