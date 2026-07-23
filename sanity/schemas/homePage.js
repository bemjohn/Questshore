import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fieldsets: [
    {name: 'hero', title: 'Hero Section', options: {collapsible: true, collapsed: false}},
    {name: 'destinations', title: 'Explore Our Destinations Section', options: {collapsible: true, collapsed: false}},
    {name: 'testimonials', title: 'Real Stories From Real Cruisers Section', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fieldset: 'hero',
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
      fieldset: 'destinations',
      of: [{type: 'reference', to: [{type: 'destination'}]}],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      fieldset: 'testimonials',
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
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
})
