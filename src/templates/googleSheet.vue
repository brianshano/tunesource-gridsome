<template>
  <Layout>
    <TuneCard :tune="$page.googleSheet" />
  </Layout>
</template>
<page-query>
  query Sheet ($path: String!){
    googleSheet(path: $path) {
      title
      abc
      id
      tuneId
      rhythm
      abcheader
      shlug
      path
      musicKey
      url
    }
  }
</page-query>
<script>
import TuneCard from '~/components/TuneCard.vue';

export default {
  metaInfo() {
    const title = `Tunesource - ${
      this.$page.allGoogleSheet.edges.node.title
        ? this.$page.allGoogleSheet.edges.node.title
        : 'Irish trad tunes library'
    }`;
  },
  components: {
    TuneCard,
  },
  metaInfo() {
    const { title } = this.$page.googleSheet;
    const { rhythm } = this.$page.googleSheet;
    const { path } = this.$page.googleSheet;
    const { abcheader } = this.$page.googleSheet;
    const descriptionMeta = abcheader
      .split(/\r\n|\r|\n/)
      .filter((line, index) => {
        return index > 0;
      })
      .map((line) => {
        return `${line.substring(2)},`;
      })
      .join(' ');
    console.log('META', title);
    const meta = [
      // open-graph tags
      {
        key: 'og:title',
        name: 'og:title',
        content: `${title} - ${
          rhythm.charAt(0).toUpperCase() + rhythm.slice(1)
        } on TuneSource trad tunes`,
      },
      {
        key: 'title',
        name: 'title',
        content: `${title} - ${
          rhythm.charAt(0).toUpperCase() + rhythm.slice(1)
        } on TuneSource trad tunes`,
      },
      {
        key: 'twitter:title',
        name: 'twitter:title',
        content: `${title} - ${
          rhythm.charAt(0).toUpperCase() + rhythm.slice(1)
        } on TuneSource`,
      },
      {
        name: 'twitter:description',
        content: `TuneSource tunes database - ${descriptionMeta}`,
      },
      {
        name: 'description',
        content: `TuneSource tunes database - ${descriptionMeta}`,
      },
      {
        property: 'og:description',
        content: `TuneSource tunes database - ${descriptionMeta}`,
      },
      {
        property: 'og:image',
        content: 'https://www.tunesource.net/tunesource-open-graph2.png',
      },
      {
        property: 'og:url',
        content: 'https://www.tunesource.net' + path,
      },
      {
        property: 'og:site_name',
        content: 'https://www.tunesource.net',
      },
      {
        property: 'og:type',
        content: 'website',
      },

      // twitter card
      {
        name: 'twitter:card',
        content: 'https://www.tunesource.net/tunesource-open-graph2.png'
          ? 'summary_large_image'
          : 'summary',
      },
      {
        name: 'twitter:creator',
        content: 'brianshano',
      },
    ];
    console.log('METAmeta', meta);
    return {
      title,
      meta,
    };
  },
};
</script>
