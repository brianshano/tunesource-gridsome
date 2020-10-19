// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'TuneSource',
  siteUrl: 'https://tunesource.net',
  templates: {
    googleSheet: [
      {
        path: '/tune/:tuneId/:shlug',
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
      use: 'gridsome-plugin-sentry',
      options: {
        dsn:
          'https://bd4fe81a3ade4af49d4cf7f446bbd4c8@o163653.ingest.sentry.io/5287040',
        attachProps: true, // defaults to true
        logErrors: process.env.NODE_ENV === 'development', // defaults to false, see below for further info
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
        purgeConfig: {},
        // presetEnvConfig: {},
        shouldPurge: false /* this was preventing outher library css files loading (abcjs-audio) */,
        shouldImport: true,
        shouldTimeTravel: true,
        whitelist: ['abcjs'],
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: ['/exclude-me'],
        config: {
          '/tune/*': {
            changefreq: 'weekly',
            priority: 0.9,
            lastmod: '2020-09-19',
          },
          '/about': {
            changefreq: 'monthly',
            priority: 0.7,
          },
        },
      },
    },
    {
      use: 'gridsome-plugin-nprogress',
      options: {
        // Setting a color is optional.
        color: '#0366d6',
        // Disable the loading spinner.
        showSpinner: true,
      },
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        searchFields: [
          'title',
          'title2',
          'shlug',
          'rhythm',
          'musicKey',
          'abcheader',
        ],
        collections: [
          {
            typeName: 'googleSheet',
            indexName: 'googleSheet',
            fields: [
              'title',
              'title2',
              'shlug',
              'abcheader',
              'rhythm',
              'musicKey',
              'path',
              'tuneId',
              'id',
            ],
          },
        ],
      },
    },
  ],
};
