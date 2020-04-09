<template>
  <div class="search">
    {{ message }}
    <button @click="onClick">
      Change
    </button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      message: 'Try change me!'
    }
  },
  methods: {
    onClick () {
      this.message = 'Here you go :)'
    }
  }
}
</script>

<style>
.search {
  padding: 20px;
  background: #FFF;
}
</style>