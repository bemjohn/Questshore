import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'groupExcursionsPage',
  title: 'Group Excursions (Custom)',
  type: 'document',
  fieldsets: [
    {name: 'hero', title: 'Hero Section', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}, fieldset: 'hero'}),
  ],
})
