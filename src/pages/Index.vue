<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    
    <Search />
    <h1>Welcome to TuneSource</h1>
    <ul v-if="$page.allGoogleSheet.edges.length" class="cardList">
      <li v-for="page in $page.allGoogleSheet.edges" :key="page.tuneId">
        <g-link :to="page.node.path"
          ><Card
            v-bind:id="page.node.tuneId"
            v-bind:shlug="page.node.shlug"
            v-bind:title="page.node.title"
            v-bind:rhythm="page.node.rhythm"
        /></g-link>
      </li>
    </ul>
    <div class="pagination">
      <Pager :info="$page.allGoogleSheet.pageInfo"/>
    </div>
  </Layout>
 
</template>
<script>
// import Pager from 'gridsome'
// import Search from '~/components/Search.vue'
// import { Pager } from "gridsome";




export default() {
  metaInfo: {
    title: 'TuneSource',
  },
  name: 'TuneSource',
  components: {
    // Pager,
    Search
  }
}
</script>
<page-query>
query ($page: Int){
  allGoogleSheet(perPage: 10, page: $page) @paginate {
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
        rhythm
      }
    }
  }
}

</page-query>

<script>
import Card from '~/components/Card.vue';
import { Pager } from "gridsome";


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
    Pager
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
  justify-content: space-evenly;
}
.cardList a {
  color: black;
  text-decoration: none;
}
</style>
