<template>
  <Layout>
    <h1>{{ $page.googleSheet.title }}</h1>
    <!--TuneCard :tune="$page.googleSheet" /-->
  </Layout>
</template>
<page-query>
  query Sheet ($path: String!){
    googleSheet(path: $path) {
      title
      abc
      id
      tuneId
      rhythm
      abcheader
      shlug
      path
      musicKey
    }
  }
</page-query>
<script>
// import 'abcjs/abcjs-audio.css';

export default {
  metaInfo: {
    // title: 'TuneSource!',
  },
};
</script>
