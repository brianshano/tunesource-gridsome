// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
// Import global styles

import DefaultLayout from '~/layouts/Default.vue';

export default function(Vue, { router, head, isClient }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
  });
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto',
  });
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Encode+Sans+Expanded',
  });
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

  head.htmlAttrs = { lang: 'en' };
  if (process.isClient) {
    // browser only code
    console.log('in isClient');
  }
}
