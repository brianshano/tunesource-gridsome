<template>
  <Layout>
    <h3>{{ $page.googleSheet.title }}</h3>
    <div>wut</div>
    <div>1{{ $page.googleSheet.shlug }}</div>
  </Layout>
</template>

<page-query>
query Post($path: String!) {
  googleSheet(path: $path){
    shlug
    title
    abc
    rhythm
    tempo
    tuneId
  }
}
</page-query>
<script>
export default {};
</script>
