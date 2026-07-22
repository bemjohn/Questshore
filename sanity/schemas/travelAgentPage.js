import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'travelAgentPage',
  title: 'Travel Agent',
  type: 'document',
  fieldsets: [
    {name: 'hero', title: 'Hero Section', options: {collapsible: true, collapsed: false}},
    {name: 'destinations', title: 'Our Destinations Section', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}, fieldset: 'hero'}),
    defineField({
      name: 'featuredDestinations',
      title: 'Destination Cards Shown',
      type: 'array',
      fieldset: 'destinations',
      of: [defineArrayMember({type: 'reference', to: [{type: 'destination'}]})],
    }),
  ],
})
