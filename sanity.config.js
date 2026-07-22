import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemas'
import {myStructure} from './sanity/structure'

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 's6n94hs6',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({structure: myStructure})],
  schema: {
    types: schemaTypes,
  },
})
