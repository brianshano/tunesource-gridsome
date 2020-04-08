<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image
      alt="Example image"
      src="~/assets/celtic-knot-tri-circles.png"
      width="135"
    />

    <h1>Welcome to TuneSource</h1>
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
  mounted: function() {
    console.log('in here', this.$page.allGoogleSheet.edges.map((tune) => {
      return tune.node.title
    }));
  },
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
