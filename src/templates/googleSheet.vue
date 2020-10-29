<template>
  <Layout>
    <TuneCard :tune="$page.googleSheet" />
  </Layout>
</template>
<page-query>
  query Sheet ($path: String!){
    googleSheet(path: $path) {
      title
      title2
      abc
      id
      tuneId
      rhythm
      abcheader
      shlug
      path
      musicKey
      url
      composer
    }
  }
</page-query>
<script>
import TuneCard from '~/components/TuneCard.vue';

export default {
  components: {
    TuneCard,
  },
  mounted () {
    console.log('mounted', this.$page.googleSheet)
  },
  metaInfo() {
    const title = `Tunesource - ${
      this.$page.googleSheet.title
        ? this.$page.googleSheet.title
        : 'Irish trad tunes library'
    }`;
    const { rhythm, path, abcheader } = this.$page.googleSheet;
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
