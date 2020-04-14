<template>
  <TuneLayout>
    <h1 class="tune-info tune-title" v-if="$page.googleSheet.title">
      {{ $page.googleSheet.title }}
    </h1>
    <div class="tune-subline">
      <div class="tune-info tune-rhythm">{{ $page.googleSheet.rhythm }}</div>
      <div class="tune-info tune-id">
        Tune ID: {{ $page.googleSheet.tuneId }}
      </div>
    </div>
    <div class="notation">
      <div id="paper"></div>
    </div>
    <AudioPlayer />

    <div v-if="$page.googleSheet.url" class="youtube">
      <!--iframe
        width="560"
        height="315"
        src="{{ytid}}"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe-->
      <!--p>We have a URL {{ $page.googleSheet.url }} and {{ ytid }}</p-->
    </div>
    <ClientOnly>
      <p>this is client only</p>
    </ClientOnly>
  </TuneLayout>
</template>

<script>
import 'abcjs/abcjs-audio.css';
import AudioPlayer from '../components/AudioPlayer';
export default {
  mounted: function () {
    console.log('data', this.$data.ytid);
    this.$data.ytid =
      'https://www.youtube.com/embed/' + this.$page.googleSheet.url;
  },

  name: 'TuneDisplay',
  metaInfo() {
    const { title } = this.$page.googleSheet;
    const { rhythm } = this.$page.googleSheet;
    const { path } = this.$page.googleSheet;
    // const { title } = this.$page.googleSheet;
    const meta = [
      // open-graph tags
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
      { name: 'twitter:description', content: rhythm },
      {
        name: 'description',
        content: rhythm,
      },
      {
        property: 'og:description',
        content: rhythm,
      },
      {
        property: 'og:image',
        content: '.src/assets/celtic-knot-tri-circles.png',
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
        content: '.src/assets/celtic-knot-tri-circles.png'
          ? 'summary_large_image'
          : 'summary',
      },
      {
        name: 'twitter:creator',
        content: 'brianshano',
      },
    ];
    console.log('METAtitle', title);
    console.log('METAmeta', meta);
    return {
      title: title ? title : 'TuneSource',
      meta,
    };
  },
  components: {
    AudioPlayer,
  },
};
</script>
<page-query>
query Post($path: String!) {
  googleSheet(path: $path){
    shlug
    title
    abc
    abcheader
    tempo
    tuneId
    url
    rhythm
    path
  }
}
</page-query>

<style>
#audio {
  padding: 3rem 1rem;
  width: 100%;
  background-color: #424242;
}

.tune-info {
  color: white;
  text-align: center;
}

.tune-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    font-size: 1.6rem;
    border: 1px solid red;
  }
}

.tune-subline {
  display: flex;
  justify-content: space-between;
}

.youtube {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
