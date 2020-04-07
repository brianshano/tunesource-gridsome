<template>
  <Layout>
    <div>
      <h3>Test Tune</h3>
      <div>{{ $page.tunes.title }}</div>
      <h1 v-html="$page.tunes.title" />
      <div v-html="$page.tunes.shlug" />
    </div>
  </Layout>
</template>

<page-query>
query Tune($id: ID!) {
  tunes: tunes(id: $id) {
    title
    shlug
  }
}
</page-query>
<script>
export default {
  metainfo() {
    return {
      title: 'title'
    };
  }
};
</script>
