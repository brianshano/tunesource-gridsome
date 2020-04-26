<template>
  <div>
    <section class="tune-title py-4">
      <h2 class="text-lg text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
        {{ this.tune.title }}
      </h2>
      <div class="text-sm sm:text-base lg:text-lg">
        {{
          $page.googleSheet.rhythm.charAt(0).toUpperCase() +
          $page.googleSheet.rhythm.slice(1)
        }}
        in
        {{ $page.googleSheet.key }}
      </div>
    </section>

    <section class="section-audio pt-6 pb-2 px-4">
      <container id="audio" :class="[{ 'abcjs-large': isMobile }, 'audio']">
      </container>
    </section>
    <section class="section-audio pt-2 pb-6 px-4">
      <container id="audio2" class="text-white">
        <div class="button-row flex flex-row justify-between">
          <v-btn outline class="p-2 y-2" @click="doPlay"
            ><div v-if="isPlaying">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-pause"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </div>
            <div v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-play"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg></div
          ></v-btn>
          <v-btn outline class="p-2 y-2" @click="doRestart"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-skip-back"
            >
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line></svg
          ></v-btn>
          <!--v-btn outline class="p-2 y-2" @click="doOneThird"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-skip-forward"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line></svg
          ></v-btn-->

          <v-btn
            outline
            @click="doDownload"
            :class="[
              { 'opacity-50 cursor-not-allowed': !isDownloadable },
              'p-2 y-2',
            ]"
          >
            <div v-if="isDownloading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-loader"
              >
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
            </div>
            <div v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-download"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg></div
          ></v-btn>
        </div>
      </container>
    </section>
    <section class="bg-gray-100">
      <container class="tune-abc py-8 bg-gray-100" id="paper">tune</container>
    </section>
    <section class="bg-yellow-600">
      <container>
        <div class="py-4 m-4 text-xs">
          <div>
            {{ $page.googleSheet.abcheader }}{{ $page.googleSheet.abc }}
          </div>
        </div>
      </container>
    </section>
    <!--section>
      <container class="suggestions p-2 m-2 py-8 text-xs">
        <div v-if="extractedSuggestions.length > 0">
          <div>Suggestions:</div>
          <div>
            {{ extractedSuggestions }}
            <div
              class="tune-card"
              v-for="(tuneid, i) in extractedSuggestions"
              :key="`${i}-${tuneid}`"
            >
              <TuneLinker :tuneid="tuneid" />
            </div>
          </div>
        </div>
      </container>
    </section-->
  </div>
</template>

<script>
// import abcjs from 'abcjs';
const abcjs = require('abcjs');
import '../abcjs-audio.css';
import TuneHeader from '~/components/TuneHeader';
import TuneLinker from '~/components/TuneLinker.vue';
const synthControl = new abcjs.synth.SynthController();

export default {
  metaInfo: {
    title: 'TuneSource',
  },
  props: {
    tune: Object,
  },
  components: {
    TuneHeader,
    TuneLinker,
  },
  computed: {
    extractedSuggestions: function () {
      const hashtag = this.tune.abcheader
        .split(' ')
        .filter((v) => v.startsWith('#'));
      if (typeof hashtag !== 'undefined') {
        console.log(
          'Hi. hastga defined.',
          hashtag.map((t) => t.replace(/\D/g, ''))
        );
        return hashtag.map((t) => t.replace(/\D/g, ''));
      } else {
        return 'none';
      }
    },
  },
  data: function () {
    return {
      windowWidth: 0,
      isMobile: false,
      isPlaying: false,
      isPaused: true,
      isDownloading: false,
      isDownloadable: false,
    };
  },
  mounted: function () {
    const abcTune = this.tune.abcheader + ' ' + this.tune.abc;
    const cursorControl = {}; // see section on CursorControl
    const abcOptions = {
      add_classes: true,
      responsive: 'resize',
    };
    const audioParams = {
      chordsOff: true,
      defaultQpm: 100,
      loopToggle: true,
      tempo: false,
    };

    if (abcjs.synth.supportsAudio()) {
      console.log('in supportsAudio');
      synthControl.load('#audio', cursorControl, {
        displayLoop: true,
        displayRestart: false,
        displayPlay: false,
        displayProgress: true,
        displayWarp: true,
      });

      const visualObj = abcjs.renderAbc('paper', abcTune, abcOptions);
      const createSynth = new abcjs.synth.CreateSynth();
      createSynth
        .init({ visualObj: visualObj[0] })
        .then(function () {
          synthControl
            .setTune(visualObj[0], false, audioParams)
            .then(function () {
              console.log('Audio successfully loaded.');
            })
            .catch(function (error) {
              console.warn('Audio problem:', error);
            });
        })
        .catch(function (error) {
          console.warn('Audio problem:', error);
        });
    } else {
      document.querySelector('#audio').innerHTML =
        'Audio is not supported in this browser.';
    }

    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth);

      //Init
      this.getWindowWidth();
    });
  },
  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
      if (document.documentElement.clientWidth > 500) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    doPlay() {
      this.isPlaying = !this.isPlaying;
      this.isDownloadable = true;
      console.log('do play pause', this.isPlaying);
      if (synthControl) {
        synthControl.play();
      }
    },
    doRestart() {
      if (synthControl) {
        synthControl.restart();
      }
    },
    doLoader() {
      this.isDownloading = !this.isDownloading;
    },
    doDownload() {
      if (this.isDownloadable) {
        this.doLoader();
        synthControl.download(
          `tunesource-${this.tune.rhythm}_${this.tune.shlug}.wav`
        );
        this.isDownloading = !this.isDownloading;
      }
    },
  },
  beforeDestroy() {
    if (synthControl) {
      synthControl.destroy();
    }
  },
};
</script>

<style>
section {
  width: 100%;
  margin: 0 auto;
  display: flex;
  /*height: 8rem;*/
}
.tune-title {
  color: white;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 768px) {
    background: rgb(255, 255, 255);
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(92, 121, 151, 1) 77%
    );
  }
}
.tune-title > h2 {
  /* font-size: 1.4rem; */
  font-weight: bold;
  font-family: 'Encode Sans Expanded', sans-serif;
}
.footer {
  /*text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f5f5f5;*/
}

container {
  width: 100%;
  max-width: 1024px;
  /*border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc*/
  margin: 0 auto;
}

.audio {
  display: flex;
  justify-content: space-between;
}
#audio {
  width: 100%;

  /**/
}
.audio input {
  color: #444;
}
.section-audio {
  background-color: #424242;
}
.abcjs-inline-audio {
  width: 100%;
}
svg .abcjs-title {
  display: none;
}
</style>
