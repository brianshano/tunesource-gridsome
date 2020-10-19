<template>
  <Layout>
    <section>
      <div class="container home">
        <div
          class="results-title text-white text-center block pt-1 pb-1 mt-4 mb-2"
        >
          <h1>Favourites</h1>
        </div>
        <!--div v-if="$page.allGoogleSheet.edges.length" class="tune-list">
        <div
          v-for="page in $page.allGoogleSheet.edges"
          :key="tune.tuneId"
          class="w-full max-w-xs min-w-10 rounded overflow-hidden shadow-lg bg-gray-400 m-4"
        >
          <Card :tune="page" />
        </div>
      </div>
      <div class="pagination">
        <Pager :info="$page.allGoogleSheet.pageInfo" />
      </div>
    </div-->
        <div v-if="this.localFavs" class="tune-list">
          <div
            v-for="tuneId in this.localFavs"
            :key="tuneId"
            class="w-full max-w-xs min-w-10 rounded overflow-hidden shadow-lg bg-gray-400 m-4"
          >
            <div v-for="edge in getFavItems(tuneId)">
              <Card :tune="edge.node" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import { Pager } from 'gridsome';
import Card from '~/components/Card';

export default {
  metaInfo() {
    const title = 'Tunesource - Your Favourites';
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
          'traditional and folk music abc music notation, chords, sheet music and midi audio',
      },
      {
        name: 'description',
        content:
          'traditional and folk music abc music notation, chords, sheet music and midi audio',
      },
      {
        property: 'og:description',
        content:
          'traditional and folk music abc music notation, chords, sheet music and midi audio',
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
    Pager,
    Card,
  },

  data() {
    return {
      show: true,
      localFavs: {},
      userFavs: {},
    };
  },
  mounted() {
    if (localStorage.favs) {
      // highlight Star if it's already a fav

      this.localFavs = JSON.parse(localStorage.getItem('favs'));
    }
    console.log('mounted', this.localFavs);
  },
  methods: {
    getFavItems(tuneId) {
      return this.$page.allGoogleSheet.edges.filter((edge) => {
        return edge.node.tuneId === tuneId;
      });
    },
  },
};
</script>
<page-query>
  query {
  allGoogleSheet(sortBy: "featured") {
    edges{
      node{
        tuneId
          id
          title
          shlug
          tuneId
          abc
          rhythm
          musicKey
          abcheader
          path
      }
    }
  }
}
</page-query>
<style>
.tune-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  height: 1005;
}
.container.home {
  margin: 0 auto;
}
</style>
