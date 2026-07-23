import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'caribbeanPage',
  title: 'Caribbean Excursions (listing)',
  type: 'document',
  fieldsets: [
    {name: 'hero', title: 'Hero Section', options: {collapsible: true, collapsed: false}},
    {name: 'destinations', title: 'Destination List Section', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}, fieldset: 'hero'}),
    defineField({
      name: 'destinations',
      title: 'Ports Shown On This Page',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'destination'}]})],
      description: 'Caribbean: Roatan, Cozumel.',
      fieldset: 'destinations',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Caribbean Excursions Page" };
    },
  },
})
