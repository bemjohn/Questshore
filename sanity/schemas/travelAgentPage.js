import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'travelAgentPage',
  title: 'Travel Agent',
  type: 'document',
  fields: [
    defineField({name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'featuredDestinations',
      title: 'Destination Cards Shown',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'destination'}]})],
    }),
  ],
})
