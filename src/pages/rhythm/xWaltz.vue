<template>
  <Layout>
    <h1>Waltzes</h1>
    <div>Waltzyes</div>
    <div v-html="$static.googleSheet.title" />
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'TuneSource Waltzes'
  }
}
</script>
<static-query>
query {
  googleSheet(id:"967") {
    title
  }
}
</static-query>
