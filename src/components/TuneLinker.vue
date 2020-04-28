<template>
  <div>
    <div>Suggested: {{ this.tuneid }}</div>
    <div v-html="$static.googleSheet.title" />
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'TuneSource',
  },
  props: {
    tuneid: String,
  },
};
</script>

<static-query>
query {
  googleSheet(id:"967") {
    title
  }
}
</static-query>
