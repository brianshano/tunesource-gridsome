<template>
  <div class="layout">
    <header class="header">
      <div class="header-title">
        <g-link to="/"><h1>{{ $static.metadata.siteName }}</h1></g-link>
        <h2>Irish Trad Session Tunes Library</h2>
        <g-image
      alt="Example image"
      src="~/assets/celtic-knot-tri-circles.png"
      width="135"
    />
      </div>
      
      <!--nav-- class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
        <g-link class="nav__link" to="/tune/">Tune</g-link>
      </!--nav-->
    </header>
    <div class="container">
    <transition name="fade" appear>
      <main>
        <slot />
      </main>
    </transition>
    <footer class="footer">
  <div class="content has-text-centered">
    <p>
      TuneSource.net 2020
    </p>
  </div>
</footer>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
<style>


.nav__link {
  margin-left: 20px;
}
</style>
