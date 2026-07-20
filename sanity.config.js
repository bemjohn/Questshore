import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'QuestAshore Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(
                S.documentList()
                  .title('Home Page')
                  .id('homePageDocuments')
                  .filter('_type == "homePage"'),
              ),
            S.listItem()
              .title('About Us')
              .id('aboutPage')
              .child(
                S.documentList()
                  .title('About Us')
                  .id('aboutPageDocuments')
                  .filter('_type == "aboutPage"'),
              ),
            S.listItem()
              .title('Destinations')
              .id('destinationsGroup')
              .child(
                S.list()
                  .title('Destinations')
                  .items([
                    S.listItem()
                      .title('Destinations Index')
                      .id('destinationsPage')
                      .child(
                        S.documentList()
                          .title('Destinations Index')
                          .id('destinationsPageDocuments')
                          .filter('_type == "destinationsPage"'),
                      ),
                    S.listItem()
                      .title('South Pacific')
                      .id('southPacific')
                      .child(
                        S.documentList()
                          .title('South Pacific')
                          .id('southPacificRegion')
                          .filter('_type == "regionPage" && region == "south-pacific"'),
                      ),
                    S.listItem()
                      .title('Caribbean')
                      .id('caribbean')
                      .child(
                        S.documentList()
                          .title('Caribbean')
                          .id('caribbeanRegion')
                          .filter('_type == "regionPage" && region == "caribbean"'),
                      ),
                    S.divider(),
                    S.listItem()
                      .title('All Destinations')
                      .id('allDestinations')
                      .child(
                        S.documentList()
                          .title('All Destinations')
                          .id('destinationDocuments')
                          .filter('_type == "destination"'),
                      ),
                  ]),
              ),
            S.listItem()
              .title('Group Excursions (Custom)')
              .id('groupExcursionsPage')
              .child(
                S.documentList()
                  .title('Group Excursions (Custom)')
                  .id('groupExcursionsPageDocuments')
                  .filter('_type == "groupExcursionsPage"'),
              ),
            S.listItem()
              .title('Travel Agent')
              .id('travelAgentPage')
              .child(
                S.documentList()
                  .title('Travel Agent')
                  .id('travelAgentPageDocuments')
                  .filter('_type == "travelAgentPage"'),
              ),
            S.listItem()
              .title('Contact Us')
              .id('contactPage')
              .child(
                S.documentList()
                  .title('Contact Us')
                  .id('contactPageDocuments')
                  .filter('_type == "contactPage"'),
              ),
            S.divider(),
            S.listItem()
              .title('Affiliate Network')
              .id('affiliateNetworkPage')
              .child(
                S.documentList()
                  .title('Affiliate Network')
                  .id('affiliateNetworkPageDocuments')
                  .filter('_type == "affiliateNetworkPage"'),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
