// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import TuneLayout from '~/layouts/TuneLayout.vue';
// import abcjs from 'abcjs';
// import 'abcjs/abcjs-audio.css';
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

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
  Vue.component('TuneLayout', TuneLayout);
  Vue.use(Buefy, {
    defaultIconPack: 'fas' // Font Awesome Solid

  })

  //Use ABCjs library inside our project
  // Vue.prototype.$abcjs = abcjs
  // Object.defineProperty(Vue.prototype, '$abcjs', {
  //   value: abcjs
  // });
  if (process.isClient) {
    // browser only code
    console.log('in isClient')
  }
}
