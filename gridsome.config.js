// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'TuneSource',
  plugins: [
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: 'key8aW0IUe0jZYUVN',
        baseId: 'appaFXK6lOosee05c',
        tableName: 'tunes',
        typeName: 'Tunes',
        select: {}
      }
    }
  ]
};
