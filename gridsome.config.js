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
        component: './src/templates/Tune.vue',
      },
    ],
  },
  plugins: [
    {
      use: "gridsome-plugin-manifest",
      options: {
          background_color: "#091a28",
          icon_path: "./src/assets/favicons/favicon.png",
          name: "TuneSource",
          short_name: "TuneSource",
          theme_color: "#5c7997",
          lang: "en",
      },
  },
  {
    use: "gridsome-plugin-service-worker",
    options: {
      networkFirst: {
        routes: [
          "/",
          /\.(js|css|png)$/, // means "every JS, CSS, and PNG images"
        ],
      },
    },
  },
    // {
    //   use: 'gridsome-plugin-pwa',
    //   options: {
    //       title: 'TuneSource',
    //       startUrl: '/',
    //       display: 'standalone',
    //       statusBarStyle: 'default',
    //       manifestPath: 'manifest.json',
    //       disableServiceWorker: false,
    //       serviceWorkerPath: 'service-worker.js',
    //       cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg',
    //       shortName: 'TuneSource',
    //       themeColor: '#5c7997',
    //       backgroundColor: '#091a28',
    //       icon: './src/assets/favicons/favicon-32x32.png', 
    //       msTileImage: './src/assets/favicons/ms-icon-144x144.png',
    //       msTileColor: '#091a28'
    //   }
    // },
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
