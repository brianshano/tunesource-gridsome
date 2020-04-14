<template>
  <section>
    <b-field label="Search the tune library">
      <b-autocomplete
        rounded
        v-model="name"
        :data="filteredDataArray"
        placeholder="start typing search"
        icon="magnify"
        clearable
        @select="(option) => (selected = option)"
      >
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
  </section>
</template>

<script>
export default {
  mounted() {
    console.log('mounted', this.$page.allGoogleSheet.edges);

    const list = this.$page.allGoogleSheet.edges.map((tune) => {
      console.log('tune', tune);
      return { shlug: tune.node.shlug, title: tune.node.title };
    });
    console.log('mounted11', list);
    this.data = list;
  },
  data() {
    console.log('loste', this);
    return {
      data: [],
      dataTest: [
        { shlug: 'molly-st-george', title: 'Molly St. George' },
        { shlug: 'Planxty-Davis', title: 'Planxty Davis' },
        { shlug: 'lady-iveagh', title: 'Lady Iveagh' },
        { shlug: 'huntingtone-castle', title: 'Huntingtone Castle' },
        { shlug: 'dawning-of-the-day', title: 'Dawning of the Day, The' },
        { shlug: 'south-wind-the', title: 'South Wind, The' },
        // 'Planxty Davis',
        // 'Lady Iveagh',
        // 'Huntingtone Castle',
        // 'Idir Deighric gus Breo',
        // 'Fáinne Geal an Lae',
        // 'Dawning of the Day, The',
        // 'South Wind, The',
        // 'Spanish Cloak, The',
        // 'For Ireland I Wont Say Her Name',
        // 'Roslyn Castle',
        // 'Casadh An tSúgáin',
        // 'Celia Connellan',
        // 'Gracious Fair Lady, The',
        // 'Love Is a Tormenting Pain',
        // 'Forlorn Queen, The',
      ],
      name: '',
      selected: null,
    };
  },
  computed: {
    filteredDataArray() {
      if (this.name.length > 0) {
        let testes = this.data.filter((option) => {
          console.log('searching', this.name, option.title);
          return (
            option.title
              .toString()
              .toLowerCase()
              .indexOf(this.name.toLowerCase()) >= 0
          );
        });
        let testes2 = testes.map((test) => {
          return test.title;
        });
        console.log('testes', testes2);
        return testes2;
      }
    },
  },
};
</script>
<page-query>
query {
  allGoogleSheet(sortBy: "featured") {
    edges{
      node{
        
        title
        tuneId
        shlug
        path

      }
    }
  }
}
</page-query>
<style>
.search {
  padding: 20px;
  background: #fff;
}
</style>
