<template>
  <Layout>
    <section>
      <div class="container home">
        <div
          class="results-title text-white text-center block pt-1 pb-1 mt-4 mb-2"
        >
          <h1>Hornpipes</h1>
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
    allGoogleSheet(perPage: 20, page: $page, filter: { rhythm: { eq: "hornpipe" }}) @paginate {
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
