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
      name: 'exchangeRate',
      title: 'USD to AUD Exchange Rate',
      description: '1 USD equals how many AUD? Used to convert all prices.',
      type: 'number',
      fieldset: 'currency',
      validation: (Rule) => Rule.required().min(0.01),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
})
