// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  var path = require('path');
  api.configureWebpack({
    // resolve: {
    //   alias: {
    //     abcjs: path.resolve('node_modules', 'abcjs/index.js'),
    //     // abcjs: path.resolve('node_modules', 'abcjs/index.js'),
    //   },
    // },
  });

  // api.loadSource(({ addCollection }) => {
  // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  // });
  api.loadSource((actions) => {
    // const posts = actions.addCollection('googleSheet');
    // const tags = actions.addCollection('googleSheet');
    // makes all ids in the `tags` field reference a `Tag`
    // tags.addReference('rhythm', 'googleSheet');
    // tags.addNode({
    //   id: '1',
    //   title: 'The author',
    // });
    // posts.addNode({
    //   id: '1',
    //   title: 'A post',
    //   tags: ['1'],
    // });
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
