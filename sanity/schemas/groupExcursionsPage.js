import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'groupExcursionsPage',
  title: 'Group Excursions (Custom)',
  type: 'document',
  fields: [
    defineField({name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}}),
  ],
})
