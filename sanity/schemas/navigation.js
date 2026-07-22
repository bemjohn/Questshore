import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'href', type: 'string', title: 'URL'},
            {name: 'hasDropdown', type: 'boolean', title: 'Has Dropdown'},
          ],
        },
      ],
    }),
  ],
})
