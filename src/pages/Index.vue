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
        <div class="pagination">
          <Pager :info="$page.allGoogleSheet.pageInfo" />
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
    const title = `Tunesource - ${
      this.$page.allGoogleSheet.edges.node.title
        ? this.$page.allGoogleSheet.edges.node.title
        : 'Irish trad tunes library'
    }`;
    const meta = [
      {
        key: 'og:title',
        name: 'og:title',
        content: title,
      },
      {
        key: 'twitter:title',
        name: 'twitter:title',
        content: title,
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

.pagination {
  width: 100%;
  margin: 0.5rem auto;
}
.pagination nav {
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
}
.pagination a {
  color: white;
  margin: 0.5rem;
  padding: 0.5rem;
}
.pagination a.active {
  color: #ccc;
  background-color: #ffffff10;
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
