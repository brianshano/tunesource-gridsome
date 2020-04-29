<template>
  <Layout>
    <div>
      <div
        class="results-title text-white text-center block pt-1 pb-1 mt-4 mb-2"
      >
        <h1>Favourites</h1>
      </div>
      <div v-if="$page.allGoogleSheet.edges.length" class="tune-list">
        <div
          v-for="page in $page.allGoogleSheet.edges"
          :key="page.tuneId"
          class="w-full max-w-xs min-w-10 rounded overflow-hidden shadow-lg bg-gray-400 m-4"
        >
          <Card :page="page" />
        </div>
      </div>
      <div class="pagination">
        <Pager :info="$page.allGoogleSheet.pageInfo" />
      </div>
    </div>
  </Layout>
</template>
<page-query>
  query ($page: Int){
    # allGoogleSheet(perPage: 15, page: $page, filter: { featured: { eq: "1" }}) @paginate {
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
          key
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
    };
  },
  data() {
    return {
      show: true,
    };
  },
};
</script>
