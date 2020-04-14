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
      <Pager :info="$page.allGoogleSheet.pageInfo" />
    </div>
  </Layout>
</template>

<script>
import Card from '~/components/Card.vue';
import { Pager } from 'gridsome';

export default {
  mounted: function () {
    console.log(
      'in here',
      this.$page.allGoogleSheet.edges.map((tune) => {
        return tune.node.title;
      })
    );
  },
  // metaInfo: {
  //   title: '2TuneSource',
  // },
  metaInfo() {
    const title = 'tunesource - irish trad tunes library';
    const meta = [
      {
        key: 'og:title',
        name: 'og:title',
        content: 'tunesource - irish trad tunes library',
      },
      {
        key: 'twitter:title',
        name: 'twitter:title',
        content: 'tunesource - irish trad tunes library',
      },
      {
        name: 'twitter:description',
        content:
          'traditional and folk music abc music notation, chords, tabs and midi audio',
      },
      {
        name: 'description',
        content:
          'traditional and folk music abc music notation, chords, tabs and midi audio',
      },
      {
        property: 'og:description',
        content:
          'traditional and folk music abc music notation, chords, tabs and midi audio',
      },
      {
        property: 'og:image',
        content: '/src/assets/celtic-knot-tri-circles.png',
      },
      {
        property: 'og:url',
        content: 'http://tunesource.net',
      },
      {
        property: 'og:site_name',
        content: 'http://tunesource.net',
      },
      {
        property: 'og:type',
        content: 'website',
      },

      // twitter card
      {
        name: 'twitter:card',
        content: '/src/assets/celtic-knot-tri-circles.png'
          ? 'summary_large_image'
          : 'summary',
      },
      {
        name: 'twitter:creator',
        content: 'brianshano',
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black',
      },
    ];
    return {
      title: title ? title : 'TuneSource',
      meta,
    };
  },
  components: {
    Card,
    Pager,
  },
};
</script>

<page-query>
query ($page: Int){
  allGoogleSheet(perPage: 10, page: $page, filter: { featured: { eq: "1" }}) @paginate {
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

h1 {
  margin: 0 auto;
  color: white;
  font-weight: bold;
  text-align: center;
}
</style>
