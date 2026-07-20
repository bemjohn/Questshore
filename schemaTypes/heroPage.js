import { defineField, defineType } from 'sanity'

export const heroPage = defineType({
  name: 'heroPage',
  title: 'Hero Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Caribbean', value: 'caribbean' },
          { title: 'South Pacific', value: 'south-pacific' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hero Background Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileBackgroundImage',
      title: 'Mobile Background Banner Image',
      description: 'Optional. Falls back to the main background image on mobile if not set.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      description: 'Dark overlay opacity (0 = transparent, 100 = fully dark)',
      type: 'number',
      initialValue: 40,
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'showSearch',
      title: 'Show Search Form',
      description: 'Show the destination search form on this hero (typically only for the home page).',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Make every destination memorable',
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Curated bucket-list adventures waiting for you at every port of call.',
    }),
    defineField({
      name: 'accentText',
      title: 'Accent Text (highlighted span)',
      type: 'string',
      initialValue: 'Shore Excursions',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      description: 'Header/site logo. Recommended size: 200x50px.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Browser tab icon. Recommended: 32x32px PNG or ICO.',
    }),
    defineField({
      name: 'socialShareImage',
      title: 'Social Share Image (OG)',
      type: 'image',
      description: 'Shown when the site is shared on social media. Recommended: 1200x630px.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage',
    },
  },
})
