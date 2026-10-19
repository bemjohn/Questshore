import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'groupExcursionsPage',
  title: 'Group Excursions (Custom)',
  type: 'document',
  fieldsets: [
    {name: 'hero', title: 'Hero Section', options: {collapsible: true, collapsed: false}},
    {name: 'groupExperiences', title: 'Group Experiences', options: {collapsible: true, collapsed: false}},
    {name: 'groupExpectations', title: 'What You Can Expect', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}, fieldset: 'hero'}),
    defineField({
      name: 'groupExperiences',
      title: 'Group Experiences',
      type: 'array',
      fieldset: 'groupExperiences',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'groupExperience',
          fields: [
            defineField({name: 'order', title: 'Order Number', type: 'string', description: 'Display number, e.g. 01'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
            defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'alt', title: 'Image Alt Text', type: 'string'}),
            defineField({name: 'reversed', title: 'Reverse Layout', type: 'boolean', initialValue: false}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'order'},
          },
        }),
      ],
    }),
    defineField({
      name: 'groupExpectations',
      title: 'What You Can Expect',
      type: 'array',
      fieldset: 'groupExpectations',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'groupExpectation',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
            defineField({
              name: 'iconKey',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Guide', value: 'guide'},
                  {title: 'Shield', value: 'shield'},
                  {title: 'Sliders', value: 'sliders'},
                  {title: 'Gift', value: 'gift'},
                  {title: 'Headset', value: 'headset'},
                  {title: 'Camera', value: 'camera'},
                ],
              },
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'iconKey'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Group Excursions Page" };
    },
  },
})
