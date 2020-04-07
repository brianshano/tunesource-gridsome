// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'TuneSource',
  templates: {
    googleSheet: [
      {
        path: '/tune/:tuneId/:shlug',
        component: './src/templates/googleSheet.vue',
      },
    ],
  },
  plugins: [
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API,
        baseId: process.env.AIRTABLE_BASEID,
        tableName: 'tunes',
        typeName: 'tunes',
        route: '/tune/:id',
        select: {},
      },
    },
    {
      use: 'gridsome-source-google-sheets',
      options: {
        sheetId: process.env.GOOG_SHEET_ID,
        apiKey: process.env.GOOG_SHEETS_API,
        route: '/tune/:tuneId/:shlug',
        // type: 'TYPE_NAME', //Optional - default is googleSheet. Used for graphql queries.
      },
    },
  ],
};
