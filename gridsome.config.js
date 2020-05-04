// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'TuneSource',
  siteUrl: 'https://tunesource.net/',
  templates: {
    googleSheet: [
      {
        path: '/tune/:tuneId/:shlug',
        // path: '/:shlug',
        component: './src/templates/googleSheet.vue',
      },
    ],
  },
  icon: {
    favicon: {
      src: './src/assets/favicons/favicon.png',
      sizes: [16, 32, 96],
    },
    touchicon: {
      src: './src/assets/favicons/apple-icon.png',
      sizes: [60, 76, 114, 120, 144, 152, 167, 180],
      precomposed: true,
    },
  },
  plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-162299256-2',
      },
    },
    {
      use: 'gridsome-plugin-manifest',
      options: {
        background_color: '#091a28',
        icon_path: './src/assets/favicons/favicon.png',
        name: 'TuneSource',
        short_name: 'TuneSource',
        theme_color: '#5c7997',
        lang: 'en',
      },
    },
    {
      use: 'gridsome-source-google-sheets',
      options: {
        sheetId: process.env.GOOG_SHEET_ID,
        apiKey: process.env.GOOG_SHEETS_API,
        route: '/tune/:tuneId/:shlug',
        route: '/:shlug',
        // type: 'TYPE_NAME', //Optional - default is googleSheet. Used for graphql queries.
      },
    },
    {
      use: 'gridsome-plugin-service-worker',
      options: {
        networkFirst: {
          routes: [
            '/',
            /\.(js|css|png)$/, // means "every JS, CSS, and PNG images"
          ],
        },
      },
    },
    {
      use: 'gridsome-plugin-tailwindcss',
      /* These are the default options. You don't need to set any options to get going.*/
      options: {
        // tailwindConfig: './some/file/js',
        // purgeConfig: {},
        // presetEnvConfig: {},
        shouldPurge: true /* this was preventing outher library css files loading (abcjs-audio) */,
        shouldImport: true,
        shouldTimeTravel: true,
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
        exclude: ['/exclude-me'],
        config: {
          '/tune/*': {
            changefreq: 'weekly',
            priority: 1,
          },
          '/about': {
            changefreq: 'monthly',
            priority: 0.7,
          },
        },
      },
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        collections: [
          {
            typeName: 'googleSheet',
            indexName: 'googleSheet',
            fields: [
              'title',
              'shlug',
              'abcheader',
              'rhythm',
              'key',
              'path',
              'tuneId',
              'id',
            ],
          },
        ],
        searchFields: ['title', 'shlug', 'rhythm'],
      },
    },
  ],
};
