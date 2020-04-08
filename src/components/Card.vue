<template>
  <div class="card">
    <b><div v-html="this.title" /></b>
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
