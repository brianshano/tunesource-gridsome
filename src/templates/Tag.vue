<template>
  <Layout>
    <h1>{{ $page.tag.title }}</h1>
    <ul>
      <li v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id">
        <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
      </li>
    </ul>
  </Layout>
</template>

<page-query>
query ($id: String!) {
  allGoogleSheet(filter: { rhythm: { in: [$rhythm] }}) {
    title
    belongsTo {
      edges {
        node {
         
            id
            title
            path
          }
        
      }
    }
  }
}
</page-query>
