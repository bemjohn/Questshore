import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 's6n94hs6',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  deployment: {
    appId: 'f10b5n1ghlr1j95da9y2l51z',
  },
})
