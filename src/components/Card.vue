<template
  ><div class="card">
    <!-- <div v-html="$static.tunes.title" /> -->

    <!-- <g-link :to="this.shlug"> -->
    <!-- <g-link :to="{ name: 'tune', params: { id: this.shlug } }"> -->
    <b><div v-html="this.title" /></b>
    <!-- </g-link> -->
    <div v-html="this.id" />
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: 'TuneSource',
  },
  name: 'Card',
  props: {
    id: [String, Number],
    title: [String],
    shlug: [String],
    // tuneId: [String],
    // rhythm: [String]
  },
  data() {
    return {
      message: 'Try change me!',
    };
  },
  methods: {
    onClick() {
      this.message = 'Here you go :)';
    },
  },
};
</script>

<style>
.card {
  padding: 1rem;
  margin: 1rem;
  background: #f5f5f54f;
  border: 1px solid #ccc;
  width: 10rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<!--static-query>
query {
  googleSheet(path: $path){
    shlug
    title
    abc
    abcheader
    rhythm
    tempo
    tuneId
  }
}
<static-query-->
