<template>
  <Layout>
    <h3>{{ $page.googleSheet.title }}</h3>
    <div>wut</div>
    <div>1{{ $page.googleSheet.shlug }}</div>
    <div>2{{ $page.googleSheet.rhythm }}</div>
    <div>3{{ $page.googleSheet.tempo }}</div>
    <div>4{{ $page.googleSheet.tuneId }}</div>
    <div id="paper">sss</div>
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
