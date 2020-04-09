// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import TuneLayout from '~/layouts/TuneLayout.vue';
import Search from '~/components/Search.vue';
import '~/assets/global-styles.scss'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'




export default function(Vue, { router, head, isClient }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css'
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto'
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Encode+Sans+Expanded'
  })
  head.htmlAttrs = { lang: 'en' }

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
  Vue.component('TuneLayout', TuneLayout);
  Vue.component('Search', Search);
  // Vue.component('Pager', Pager);
  Vue.use(Buefy, {
    defaultIconPack: 'fas' // Font Awesome Solid
  })

  if (process.isClient) {
    // browser only code
    console.log('in isClient')
  }
}
