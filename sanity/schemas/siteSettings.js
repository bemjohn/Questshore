import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fieldsets: [
    {name: 'currency', title: 'Currency', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Exchange Rates',
    }),
    defineField({
      name: 'exchangeRate',
      title: 'Exchange Rate',
      description: '1 USD equals how many AUD? The AUD price stored in Sanity is divided by this rate to show the USD price.',
      type: 'number',
      fieldset: 'currency',
      validation: (Rule) => Rule.required().min(0.01),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Exchange Rates' };
    },
  },
})
