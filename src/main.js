// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
// Import global styles

import DefaultLayout from '~/layouts/Default.vue';
import Search from '~/components/Search.vue';
import SearchResults from '~/components/SearchResults.vue';
import BottomNav from '~/components/BottomNav.vue';
import '~/assets/abcjs-audio.css';

export default function (Vue, { router, head, isClient }) {
  // head.link.push({
  //   rel: 'stylesheet',
  //   href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
  // });
  head.link.push({
    rel: 'stylesheet',
    href:
      'https://fonts.googleapis.com/css2?family=Encode+Sans+Expanded&display=swap',
  });
  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, maximum-scale=1',
  });
  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, maximum-scale=1',
  });
  // head.script.push({
  //   src: 'abcjs',
  // });
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
  Vue.component('Search', Search);
  Vue.component('SearchResults', SearchResults);
  Vue.component('BottomNav', BottomNav);

  head.htmlAttrs = {
    lang: 'en',
  };
  if (process.isClient) {
  }
  // Vue.use(abcjs);

  //Use Moment.Js library inside our project
  // Object.defineProperty(Vue.prototype, 'abcjs', {
  //   value: abcjs,
  // });
}
