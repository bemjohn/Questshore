import { defineField, defineType } from 'sanity'

export const destinationsPage = defineType({
  name: 'destinationsPage',
  title: 'Destinations Index',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'DESTINATIONS' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Explore Our Destinations' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Handpicked shore excursions across the most breathtaking ports.' }),
  ],
})
