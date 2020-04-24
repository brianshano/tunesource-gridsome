<template>
  <Layout>
    <!--h1>{{ $page.googleSheet.title }}</h1-->
    <TuneCard :tune="$page.googleSheet" />
  </Layout>
</template>
<page-query>
  query Sheet ($path: String!){
    googleSheet(path: $path) {
      title
      abc
      id
      rhythm
      abcheader
      path
      key
    }
  }
</page-query>
<script>
import 'abcjs/abcjs-audio.css';
import TuneCard from '~/components/TuneCard.vue';

export default {
  metaInfo: {
    title: 'TuneSource!',
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
    // return newLines.toString();
    // const { title } = this.$page.googleSheet;
    console.log('META', title);
    const meta = [
      // open-graph tags
      {
        key: 'og:title',
        name: 'og:title',
        content: `${title} - ${
          rhythm.charAt(0).toUpperCase() + rhythm.slice(1)
        } on TuneSource`,
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
        content:
          'https://res.cloudinary.com/bshano/image/upload/f_auto/v1587633025/tunesource/tunesource-open-graph2.png',
      },
      {
        property: 'og:url',
        content: 'http://tunesource.net' + path,
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
        content: 'https://res.cloudinary.com/bshano/image/upload/f_auto/v1587633025/tunesource/tunesource-open-graph2.png'
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
      title: title ? title : 'TuneSource',
      meta,
    };
  },
};
</script>
