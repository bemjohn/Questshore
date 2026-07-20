import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Us',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'About us' }),
        defineField({ name: 'description', title: 'Description', type: 'text', initialValue: 'QuestAshore is all about encouraging cruise guests to adventure beyond the shore..And making each destination exciting and accessible with our bucket list experiences.' }),
      ],
    }),
    defineField({
      name: 'tabs',
      title: 'Content Tabs',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'tab',
          fields: [
            defineField({ name: 'name', title: 'Tab Name', type: 'string' }),
            defineField({ name: 'quote', title: 'Quote', type: 'text' }),
            defineField({ name: 'body', title: 'Body Content', type: 'array', of: [{ type: 'block' }] }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'whyChooseUs',
      title: 'Why Choose Us Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'WHY CHOOSE US' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Our Advantages' }),
        defineField({
          name: 'cards',
          title: 'Feature Cards',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'featureCard',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'text', title: 'Text', type: 'text' }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Shield Check', value: 'shield-check' },
                      { title: 'Info Circle', value: 'info-circle' },
                      { title: 'Dollar Sign', value: 'dollar-sign' },
                      { title: 'Heart', value: 'heart' },
                    ],
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
