<template>
  <div class="layout">
    <header class="header flex flex-col items-center content-center">
      <div
        class="header-title logo flex flex-col items-center content-center pt-2 pb-4"
      >
        <g-link to="/">
          <div class="text-gray-400 text-lg sm:text-xl lg:text-2xl xl:text-3xl">
            {{ $static.metadata.siteName }}
          </div>
        </g-link>
        <h1 class="text-gray-600 text-xs sm:text-sm lg:text-base">
          Irish Trad Session Tunes Library
        </h1>
      </div>
      <!--nav class="nav container flex justify-evenly text-sm	text-gray-500">
        <g-link class="" to="/">Home</g-link>
        <g-link class="" to="/about/">About</g-link>
      </nav-->
    </header>
    <div class="main container1 lg mx-auto">
      <h2 class="text-center text-white text-xs sm:text-sm lg:text-base pt-4">
        Search the library of traditional and folk tunes.
      </h2>
      <section>
        <div class="center mx-auto w-full">
          <Search />
        </div>
      </section>

      <slot />
    </div>

    <!-- <section class="footer flex flex-col items-center justify-center py-6 px-4">
      <div
        class="footer-container flex flex-col items-center justify-center text-gray-200"
      >
        <div class="footer-title font-bold text-lg">TuneSource 2020</div>
        <div class="footer-links text-sm text-center">About | Stats | Advanced Search</div>
      </div>
    </section> -->
    <BottomNav />
  </div>
</template>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>
<script>
import BottomNav from '~/components/BottomNav.vue';

export default {
  components: {
    BottomNav,
  },
};
</script>
<style>
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
    'Helvetica', 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  overflow-x: hidden;
  width: 100%;
}

.layout {
  width: 100vw;
  height: 100%;
  margin: 0 auto;
  background-color: #5c7997;
}
.container1 {
  height: 100%;
  min-height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #091a28;
  font-family: 'Encode Sans Expanded', sans-serif;
}
.header-title a {
  color: white;
  font-size: 2rem;
}
.header-title h1 {
  color: white;
  font-family: 'Encode Sans Expanded', sans-serif;
}
nav {
  color: white;
}
</style>
