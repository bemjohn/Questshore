import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Us',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Get in Touch' }),
        defineField({ name: 'description', title: 'Description', type: 'text', initialValue: 'Have questions about our port excursions or need help planning your time ashore? We are here to help you coordinate the perfect itinerary.' }),
      ],
    }),
    defineField({
      name: 'info',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'CONTACT US' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: "We'd Love to Hear From You" }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'email', title: 'Email', type: 'string', initialValue: 'hello@questashore.com' }),
        defineField({ name: 'supportHours', title: 'Support Hours', type: 'string', initialValue: 'Monday – Friday, 9:00 AM – 5:00 PM (EST)' }),
      ],
    }),
    defineField({
      name: 'form',
      title: 'Form Settings',
      type: 'object',
      fields: [
        defineField({ name: 'successTitle', title: 'Success Title', type: 'string', initialValue: 'Message Sent!' }),
        defineField({ name: 'successText', title: 'Success Text', type: 'text', initialValue: 'Thank you for reaching out. We will get back to you within 24 hours.' }),
      ],
    }),
  ],
})
