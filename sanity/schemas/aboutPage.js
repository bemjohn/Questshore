import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Us',
  type: 'document',
  fields: [
    defineField({name: 'heroBanner', title: 'Hero Banner — Group of Travelers', type: 'image', options: {hotspot: true}}),
    defineField({name: 'collageImage1', title: 'Collage Photo — Left Top', type: 'image', options: {hotspot: true}}),
    defineField({name: 'collageImage2', title: 'Collage Photo — Left Bottom', type: 'image', options: {hotspot: true}}),
    defineField({name: 'collageImage3', title: 'Collage Photo — Right Column', type: 'image', options: {hotspot: true}}),
  ],
})
