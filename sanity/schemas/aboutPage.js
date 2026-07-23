import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Us',
  type: 'document',
  fieldsets: [
    {name: 'hero', title: 'Hero Section', options: {collapsible: true, collapsed: false}},
    {name: 'howItStarted', title: 'Tab: How It Started', options: {collapsible: true, collapsed: false}},
    {name: 'givingBack', title: 'Tab: Giving Back', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({name: 'heroBanner', title: 'Hero Banner — Group of Travelers', type: 'image', options: {hotspot: true}, fieldset: 'hero'}),
    defineField({name: 'collageImage1', title: 'Collage Photo — Left Top', type: 'image', options: {hotspot: true}, fieldset: 'howItStarted'}),
    defineField({name: 'collageImage2', title: 'Collage Photo — Left Bottom', type: 'image', options: {hotspot: true}, fieldset: 'howItStarted'}),
    defineField({name: 'collageImage3', title: 'Collage Photo — Right Column', type: 'image', options: {hotspot: true}, fieldset: 'howItStarted'}),
    defineField({name: 'givingBackImage1', title: 'Giving Back Photo — Left Top', type: 'image', options: {hotspot: true}, fieldset: 'givingBack'}),
    defineField({name: 'givingBackImage2', title: 'Giving Back Photo — Left Bottom', type: 'image', options: {hotspot: true}, fieldset: 'givingBack'}),
    defineField({name: 'givingBackImage3', title: 'Giving Back Photo — Right Column', type: 'image', options: {hotspot: true}, fieldset: 'givingBack'}),
  ],
  preview: {
    prepare() {
      return { title: "About Us Page" };
    },
  },
})
