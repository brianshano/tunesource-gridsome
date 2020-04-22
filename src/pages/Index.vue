<template>
  <Layout>
    <h2 class="title text-xs sm:text-sm lg:text-base pt-4">
      Search the library of traditional and folk tunes.
    </h2>
    <div class="container home">
      <div v-if="$page.allGoogleSheet.edges.length" class="tune-list">
        <div
          v-for="page in $page.allGoogleSheet.edges"
          :key="page.tuneId"
          class="w-full max-w-xs min-w-10 rounded overflow-hidden shadow-lg bg-gray-400 m-4"
        >
          <!--img
            class="w-full "
            src="../assets/celtic-knot-tri-circles.svg"
            alt="Sunset in the mountains"
          /-->
          <g-link :to="page.node.path">
            <div class="px-4 py-2">
              <div class="font-bold text-lg sm:text-xl text-center">
                {{ page.node.title }}
              </div>
            </div>
          </g-link>
          <div class="card-clickables px-6 py-3 bg-gray-200">
            <div>
              <span
                class="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                {{ page.node.rhythm }}
              </span>
              <span
                class="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                {{ page.node.key }}
              </span>
            </div>
            <span
              class="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              <i class="fas fa-share" aria-hidden="true" />
            </span>
            <span
              class="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              <i class="fas fa-heart" aria-hidden="true" />
            </span>
            <!--button class="btn btn-blue m-2">
                {{ page.node.title }}
            </button-->
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <Pager :info="$page.allGoogleSheet.pageInfo" />
    </div>

    <hr />
    <!--div
        class="tune-card"
        v-for="(page, i) in $page.allGoogleSheet.edges"
        :key="`${i}-${page.tuneId}`"
      ></div-->
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
          # abcheader
          path
        }
      }
    }
  }
</page-query>
<script>
import { Pager } from 'gridsome';
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
  margin: 2rem 1rem;
  height: 1005;
}
.container.home {
  margin: 0 auto;
}
.tune-card {
  width: 100%;
  max-width: 23rem;
}

.card-clickables {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.pagination {
  border: 1px solid white;
  background-color: #444;
  width: 100%;
  margin: 0 auto;
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
</style>
