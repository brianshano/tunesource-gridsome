<template>
  <Layout>
    <section>
      <div class="mx-auto">
        <div
          class="results-title text-white text-center block pt-1 pb-1 mt-4 mb-2"
        >
          <h1>Popular Tunes</h1>
        </div>
        <div v-if="$page.allGoogleSheet.edges.length" class="tune-list">
          <div
            v-for="page in $page.allGoogleSheet.edges"
            :key="page.tuneId"
            class="w-full max-w-xs min-w-10 rounded overflow-hidden shadow-lg bg-gray-400 m-4"
          >
            <Card :tune="page.node" />
          </div>
        </div>
        <div class="pagination mb-8 hidden sm:block">
          <Pager :info="$page.allGoogleSheet.pageInfo" :range="5"/>
          <div class="mb-12">&nbsp;</div>
        </div>
        <div class="pagination mb-8 block sm:hidden">
          <Pager :info="$page.allGoogleSheet.pageInfo" :range="2"/>
          <div class="mb-12">&nbsp;</div>
        </div>
      </div>
    </section>
  </Layout>
</template>
<page-query>
  query ($page: Int){
    allGoogleSheet(perPage: 20, page: $page) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          tuneId
          id
          title
          shlug
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
<script>
import { Pager } from 'gridsome';
import Card from '~/components/Card';

export default {
  metaInfo() {
    // const title = `Tunesource - ${
    //   this.$page.allGoogleSheet.edges.node.title
    //     ? this.$page.allGoogleSheet.edges.node.title
    //     : 'Irish trad tunes library'
    // }`;
    const meta = [
      {
        key: 'og:title',
        name: 'og:title',
        content: 'Tunesource - Irish Trad Session Tunes Library',
      },
      {
        key: 'twitter:title',
        name: 'twitter:title',
        content: 'Tunesource - Irish Trad Session Tunes Library',
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
        content: 'https://www.tunesource.net/tunesource-open-graph2.png',
      },
      {
        property: 'twitter:image',
        content: 'https://www.tunesource.net/tunesource-open-graph2.png',
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
      // title: title ? title : 'TuneSource',
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
    };
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
h2.title {
  text-align: center;
  color: white;
}
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
.tune-card {
  width: 100%;
  max-width: 23rem;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fav {
  color: red;
}
</style>
