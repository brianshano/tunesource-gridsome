<template>
  <Layout>
    <section>
      <div class="mx-auto">
        <div
          class="results-title text-white text-center block pt-1 pb-1 mt-4 mb-2"
        >
          <h1>Tunes Index</h1>
        </div>
        <div v-if="$page.allGoogleSheet.edges.length" class="tune-list">
          <div
            v-for="page in $page.allGoogleSheet.edges"
            :key="page.tuneId"
            class="w-full max-w-xl min-w-20 rounded overflow-hidden shadow-lg bg-gray-400 m-2 p-2"
          >
            <div class="w-full flex justify-around">
              <div class="w-1/12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-music"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <div class="w-6/12">
                <g-link :to="`${page.node.path}`">{{ page.node.title }}</g-link>
              </div>
              <div class="w-8">
                <g-link :to="`rhythm/${page.node.rhythm}`">{{
                  page.node.rhythm
                }}</g-link>
              </div>
              <div class="w-8">
                <!-- <g-link :to="`key/${page.node.musicKey}`"> -->
                {{ page.node.musicKey }}
                <!-- </g-link> -->
              </div>
            </div>
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
    allGoogleSheet(perPage: 200, page: $page) @paginate {
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
    const meta = [
      {
        name: 'description',
        content:
          'traditional and folk music abc music notation, chords, sheet music and midi audio',
      },
      {
        name: 'twitter:description',
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
      // title: title,
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
