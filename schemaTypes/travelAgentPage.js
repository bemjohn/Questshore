import { defineField, defineType } from 'sanity'

export const travelAgentPage = defineType({
  name: 'travelAgentPage',
  title: 'Travel Agent',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'TRAVEL AGENT NETWORK' }),
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'perks',
      title: 'The Perks Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'THE PERKS' }),
        defineField({
          name: 'perks',
          title: 'Perks',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'perk',
              fields: [
                defineField({ name: 'number', title: 'Number', type: 'string' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'text', title: 'Text', type: 'text' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'formSection',
      title: 'Form Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'GET IN TOUCH' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Partner With Us' }),
        defineField({ name: 'successTitle', title: 'Success Title', type: 'string', initialValue: 'Message Received!' }),
        defineField({ name: 'successText', title: 'Success Text', type: 'text', initialValue: 'Thank you for your interest. Our team will be in touch within 24 hours.' }),
      ],
    }),
  ],
})
