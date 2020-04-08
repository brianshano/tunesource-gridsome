<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image
      alt="Example image"
      src="~/assets/celtic-knot-tri-circles.png"
      width="135"
    />

    <h1>Welcome to TuneSource</h1>

    <h2>Google Sheets Source</h2>

    <ul v-if="$page.allGoogleSheet.edges.length" class="cardList">
      <li v-for="page in $page.allGoogleSheet.edges" :key="page.tuneId">
        <g-link :to="page.node.path"
          ><Card
            v-bind:id="page.node.tuneId"
            v-bind:shlug="page.node.shlug"
            v-bind:title="page.node.title"
        /></g-link>
      </li>
    </ul>
  </Layout>
 
</template>
<script>
export default() {
  const page = 1;
}
</script>
<page-query>
query {
  allGoogleSheet(perPage: 20, page: 1) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges{
      node{
         abc
        abcheader
        title
        tuneId
        shlug
        path
      }
    }
  }
}

</page-query>

<script>
import Card from '~/components/Card.vue';

export default {
  metaInfo: {
    title: 'TuneSource',
  },
  components: {
    Card,
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
.cardList {
  display: flex;
  flex-wrap: wrap;

  list-style: none;
}
.cardList a {
  color: black;
  text-decoration: none;
}
</style>
<!--
body {
  --body-color: #ebf4f1;
  --bg: #091a28;
  --bg-secondary: #071521;
  --bg-teritary: #0e2233;
  --bg-transparent: rgba(9, 26, 40, 0.88);
  --border-color: #0d2538;
  --border-color-darker: #0d2538;
  --inline-code-text: #e24cb2;
  --inline-code-bg: rgba(212, 53, 159, 0.1);
  --primary-color: #00835c;
  --primary-color-dark: #00a672;
  --glow: 2px 2px 15px 0 #071521;
}
body {
  /* color: hsla(0, 0%, 0%, 0.8); */
  color: #f5f5f5;
  font-family: 'Jost', 'Helvetica', 'Helvetica Neue', 'Segoe UI', 'Helvetica',
    'Arial', sans-serif;
  font-weight: normal;
  word-wrap: break-word;
  font-kerning: normal;
  -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
  -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
  -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
  font-feature-settings: 'kern', 'liga', 'clig', 'calt';
}
body,
html {
  background-color: var(--bg);
  touch-action: manipulation;
  width: 100%;
  transition: background-color 0.3s;
}
-->