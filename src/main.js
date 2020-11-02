// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
// Import global styles

import DefaultLayout from '~/layouts/Default.vue';
import Search from '~/components/Search.vue';
import SearchResults from '~/components/SearchResults.vue';
import BottomNav from '~/components/BottomNav.vue';
import '~/assets/abcjs-audio.css';
// import '~/main.css'
import '~/assets/global-styles.scss'

export default function (Vue, { router, head, isClient }) {
  head.link.push({
    rel: 'stylesheet',
    href:
      'https://fonts.googleapis.com/css2?family=Encode+Sans+Expanded&display=swap',
  });

  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1, viewport-fit=cover',
  });

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
}
