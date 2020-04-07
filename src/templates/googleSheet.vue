<template>
  <Layout>
    <h3>{{ $page.googleSheet.title }}</h3>

    <div>{{ $page.googleSheet.shlug }}</div>
  </Layout>
</template>

<page-query>
query Post($path: String!) {
  googleSheet(path: $path){
    shlug
    title
  }
}
</page-query>
<script>
export default {};
</script>
