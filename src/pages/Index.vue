<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image
      alt="Example image"
      src="~/assets/celtic-knot-tri-circles.png"
      width="135"
    />
    <!-- <g-image
        alt="Example image"
        src="https://tunesource.net/static/media/celtic-knot-tri-circles-white.b9fc2e4d.svg"
        width="135"
      />-->

    <h1>Welcome to TuneSource</h1>

    <p>search tunes</p>

    <p class="home-links">
      <a href="https://gridsome.org/docs/" target="_blank" rel="noopener"
        >Gridsome Docs</a
      >
      <a
        href="https://github.com/gridsome/gridsome"
        target="_blank"
        rel="noopener"
        >GitHub {title}</a
      >
    </p>
    <ul v-if="$page.posts.edges.length" class="cardList">
      <li v-for="edge in $page.posts.edges" :key="edge.node.id">
        <!-- {{ edge.node.title }} -->
        <Card v-bind:id="edge.node.id" v-bind:title="edge.node.title" />
      </li>
    </ul>
  </Layout>
</template>

<script>
import Card from '~/components/Card.vue';

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    Card
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
.cardList {
  display: flex;
  flex-wrap: wrap;
}
</style>

<page-query>
query {
  posts: allTunes {
    edges{
      node{
        title
        id
        tuneId
        rhythm
      }
    }
  }
}
</page-query>
