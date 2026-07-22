import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'southPacificPage',
  title: 'South Pacific (listing)',
  type: 'document',
  fields: [
    defineField({name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'destinations',
      title: 'Ports Shown On This Page',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'destination'}]})],
      description: 'South Pacific: Port Vila, Noumea, Lifou, Fiji.',
    }),
  ],
})
