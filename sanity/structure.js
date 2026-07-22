const PAGES = [
  {id: 'homePage', type: 'homePage', title: 'Home'},
  {id: 'aboutPage', type: 'aboutPage', title: 'About Us'},
  {id: 'southPacificPage', type: 'southPacificPage', title: 'South Pacific (listing)'},
  {id: 'caribbeanPage', type: 'caribbeanPage', title: 'Caribbean Excursions (listing)'},
  {id: 'groupExcursionsPage', type: 'groupExcursionsPage', title: 'Group Excursions (Custom)'},
  {id: 'travelAgentPage', type: 'travelAgentPage', title: 'Travel Agent'},
]

export const myStructure = (S) =>
  S.list()
    .title('QuestAshore Website')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items(
              PAGES.map((p) =>
                S.listItem()
                  .title(p.title)
                  .id(p.id)
                  .child(S.document().schemaType(p.type).documentId(p.id)),
              ),
            ),
        ),
      S.divider(),
      S.listItem()
        .title('Destinations (ports)')
        .child(S.documentTypeList('destination').title('Destinations')),
    ])
