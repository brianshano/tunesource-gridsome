// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'TuneSource',
  templates: {
    // Tune: [
    //   {
    //     path: '/tune/:id/:shlug',
    //     component: './src/components/Card.vue'
    //   }
    // ],
    // googleSheet: [
    //   {
    //     path: '/tune/:Id',
    //     component: './src/templates/googleSheet.vue'
    //   }
    // ],
    googleSheet: [
      {
        path: '/tune/:tuneId/:shlug',
        component: './src/templates/googleSheet.vue'
      }
    ]
  },
  plugins: [
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: 'key8aW0IUed0jaZYaUVN',
        baseId: 'appY0wjOYEZ8hqbPy',
        tableName: 'tunes',
        typeName: 'tunes',
        route: '/tune/:id',
        select: {}
      }
    },
    // {
    //   use: 'gridsome-source-google-sheets',
    //   options: {
    //     sheetId: '1cZ_4uSP-uIHuU0iNm_Z1a-IcvWfFkxXQxtvVUPiKYdA',
    //     apiKey: 'AIzaSyDkGg8NyrGoqeqLcDRKzgWhnGMVE8VFmGY',
    //     route: '/tune/:Id'
    //     // type: 'TYPE_NAME', //Optional - default is googleSheet. Used for graphql queries.
    //   }
    // },
    {
      use: 'gridsome-source-google-sheets',
      options: {
        sheetId: '18S1_eIU9kOISjpcFSbrhbhJ35zzRQQccEh2RKjMzIZw',
        apiKey: 'AIszaSyDkGg8NfyrGoqeqaLcDRKfzgWhnGMaVE8VFmGY',
        route: '/tune/:tuneId/:shlug'
        // type: 'TYPE_NAME', //Optional - default is googleSheet. Used for graphql queries.
      }
    }
  ]
};
