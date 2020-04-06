<template
  ><div class="card">
    <!-- <div v-html="$static.tunes.title" /> -->
    <b><div v-html="this.title"/></b>
    <div v-html="this.id" />
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  name: 'Card',
  props: {
    id: [String, Number],
    title: [String]
    // tuneId: [String],
    // rhythm: [String]
  },
  data() {
    return {
      message: 'Try change me!'
    };
  },
  methods: {
    onClick() {
      this.message = 'Here you go :)';
    }
  }
};
</script>

<style>
.card {
  padding: 1rem;
  margin: 1rem;
  background: #f5f5f5;
  border: 1px solid #ccc;
}
</style>
<static-query>
query {
  tunes(id:"this.id") {
    title
  }
}
</static-query>
