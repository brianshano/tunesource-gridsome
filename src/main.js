// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import TuneLayout from '~/layouts/TuneLayout.vue';
// import abcjs from 'abcjs';
// import 'abcjs/abcjs-audio.css';

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
  Vue.component('TuneLayout', TuneLayout);

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
