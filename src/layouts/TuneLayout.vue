<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
        <g-link class="nav__link" to="/tune/">Tune</g-link>
      </nav>
    </header>
    <slot />
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
  import abcjs from 'abcjs';
export default {

mounted: function() {
    const abcTune = this.$page.googleSheet.abc;
    const abcNo = `X:962 T:Cooley's T:Luttrell's Pass R:reel C:Joe Mills, Galway (1924-1973) D:Dubliners: 25 Years Celebration. D:Noel Hill & Tony Linnane D:Frankie Gavin & Paul Brock: Tribute to Joe Cooley Z:id:hn-reel-48 M:C| K:Edor EBBA B2EB|~B2AB dBAG|(3FED AD BDAD|FDFA dAFD| EBBA B2EB|~B2AB defg|afef dBAF|1 DEFD E2ED:|2 DEFD E2gf|| |:eB~B2 eBgB|eB~B2 gedB|A2FA DAFA|~A2FA defg| eB~B2 eBgB|eB~B2 defg|afef dBAF|1 DEFD E2gf:|2 DEFD E2ED||`;
    const abcTest = "X:962 T:Cooley\'s T:Luttrell\'s Pass R:reel C:Joe Mills, Galway (1924-1973) D:Dubliners: 25 Years Celebration. D:Noel Hill & Tony Linnane D:Frankie Gavin & Paul Brock: Tribute to Joe Cooley Z:id:hn-reel-48 M:C| K:Edor EBBA B2EB|~B2AB dBAG|(3FED AD BDAD|FDFA dAFD| EBBA B2EB|~B2AB defg|afef dBAF|1 DEFD E2ED:|2 DEFD E2gf|| |:eB~B2 eBgB|eB~B2 gedB|A2FA DAFA|~A2FA defg| eB~B2 eBgB|eB~B2 defg|afef dBAF|1 DEFD E2gf:|2 DEFD E2ED||";
  const tuneBook = new abcjs.TuneBook('../../static/norbeckNumbered.abc');
    console.log(`In TuneLayouts:`, tuneBook.tunes.map((tune) => {
      return tune
    }));


    // abcjs.renderAbc('paper', abcTest);
  },
}
</script>
<style>
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
