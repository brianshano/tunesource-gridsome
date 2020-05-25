<template>
  <Layout>
    <section>
      <div class="container home">
        <div class="results-title text-white text-center block pt-1 pb-1 mt-4 mb-2">
          <h1>Waltzes</h1>
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

<script>
import { Pager } from 'gridsome';
import Card from '~/components/Card';

export default {
  components: {
    Pager,
    Card,
  },
};
</script>

<page-query>
  query ($page: Int){
    allGoogleSheet(perPage: 20, page: $page, filter: { rhythm: { eq: "waltz" }}) @paginate {
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