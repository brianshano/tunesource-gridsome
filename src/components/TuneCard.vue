<template>
  <div>
    <section class="tune-title py-4">
      <h2 class="text-lg text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
        {{ this.tune.title }}
        <button
          @click="favMe(show)"
          class="star p-2"
          aria-label="Favourite Tune"
          v-if="show"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#999"
            stroke="none"
            stroke-width="0"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-star fav"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            ></polygon>
          </svg>
        </button>
        <button
          @click="favMe(show)"
          class="star p-2"
          aria-label="Favourite Tune"
          v-else
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#ccc"
            stroke="none"
            stroke-width="0"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-star"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            ></polygon>
          </svg>
        </button>
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

    <section class="section-audio pt-3 pb-2 px-4">
      <div
        id="audio"
        :class="[{ 'abcjs-large': showLargePlayer }, 'audio', 'tune-container']"
      ></div>
    </section>
    <section class="section-audio pb-2 px-4">
      <div id="audio2" class="text-white tune-container">
        <div class="button-row flex flex-row justify-between">
          <button
            class="player-button p-2 y-2"
            @click="doRestart"
            title="restart"
            aria-label="Restart Tune"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-skip-back"
            >
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>
          <button
            title="play/pause"
            class="player-button p-2 y-2 hover:bg-blue-500 focus:bg-green-500"
            @click="doPlay"
            aria-label="Play/Pause"
          >
            <div v-if="isPlaying">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
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
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-play"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </button>
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

          <button
            @click="doDownload"
            :class="[
              { 'opacity-50 cursor-not-allowed': !isDownloadable },
              { 'opacity-50 cursor-not-allowed': isMobile },
              'player-button p-2 y-2',
            ]"
            aria-label="Download Wav"
          >
            <div v-if="isDownloading" title="download wav">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
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
            <div v-else title="download wav - press play first">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
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
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
    <section class="bg-gray-100">
      <div class="tune-abc py-8 bg-gray-100 tune-container" id="paper">
        tune
      </div>
    </section>
    <section class="bg-yellow-600">
      <div>
        <div class="tune-container py-4 m-4 text-xs px-2 sm:px-8 sm:text-sm">
          <h2 class="font-bold">ABC Notation</h2>
          <div>
            {{ $page.googleSheet.abcheader }}{{ $page.googleSheet.abc }}
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="suggestions p-2 m-2 py-8 text-xs">
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
      </div>
    </section>
  </div>
</template>

<script>
import TuneHeader from '~/components/TuneHeader';
import TuneLinker from '~/components/TuneLinker.vue';
export default {
  metaInfo: {
    // title: 'TuneSource',
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
      showLargePlayer: false,
      isPlaying: false,
      isPaused: true,
      isDownloading: false,
      isDownloadable: false,
      // abcjs: false,
      synthControl: {},
      show: false,
      favs: [],
    };
  },
  mounted: function () {
    // localStorage.clear();
    if (localStorage.favs) {
      // highlight Star if it's already a fav
      this.favs = JSON.parse(localStorage.getItem('favs'));
      if (this.favs.includes(this.tune.tuneId)) {
        this.show = true;
      }
    } else {
      // initialise the localStorage Favs array
      const lsetup = [];
      localStorage.setItem('favs', JSON.stringify(lsetup));
    }
    // this.abcjs = abcjs();
    const abcjs = require('abcjs');
    const abcTune = this.tune.abcheader + ' ' + this.tune.abc;
    const cursorControl = {}; // see section on CursorControl
    const abcOptions = {
      add_classes: true,
      responsive: 'resize',
    };
    const audioParams = {
      chordsOff: true,
      loopToggle: true,
      tempo: false,
      options: {
        defaultQpm: 100,
      },
    };

    if (abcjs.synth.supportsAudio()) {
      console.log('in supportsAudio');
      const synthControl = new abcjs.synth.SynthController();
      this.synthControl = synthControl;
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
      if (
        document.documentElement.clientWidth > 500 &&
        document.documentElement.clientWidth < 768
      ) {
        this.showLargePlayer = true;
      } else {
        this.showLargePlayer = false;
      }
      if (document.documentElement.clientWidth < 768) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    doPlay() {
      this.isPlaying = !this.isPlaying;
      this.isDownloadable = true;
      if (this.synthControl) {
        this.synthControl.play();
      }
    },
    doRestart() {
      if (this.synthControl) {
        this.synthControl.restart();
      }
    },
    doLoader() {
      this.isDownloading = !this.isDownloading;
    },
    doDownload() {
      if (this.isDownloadable && !this.isMobile) {
        this.doLoader();
        this.synthControl.download(
          `tunesource-${this.tune.rhythm}_${this.tune.shlug}.wav`
        );
        this.isDownloading = !this.isDownloading;
      }
    },
    favMe(show) {
      var currentFavs = JSON.parse(localStorage.getItem('favs'));
      if (show) {
        currentFavs = currentFavs.filter((t) => {
          return t !== this.tune.tuneId;
        });
      } else {
        currentFavs.push(this.tune.tuneId);
      }

      localStorage.setItem('favs', JSON.stringify(currentFavs));
      this.show = !this.show;
    },
  },
  beforeDestroy() {
    if (this.synthControl) {
      this.synthControl.destroy();
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

.tune-container {
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
.player-button {
  &:hover {
    background-color: #5c7997;
    outline: #5c7997;
  }
  &:focus {
    background-color: #ffffff20;
    outline: #ffffff20;
  }
}
svg .abcjs-title {
  display: none;
}

/* hacky import of abcjs-audio.css because tailwind wont compress css if i dont or I haven't properly figured it out...bundleRenderer.renderToStream*/

/* Some basic CSS to make the Audio controls in abcjs presentable. */
/* purgecss start ignore */
.abcjs-inline-audio {
  width: 100%;
}

.abcjs-inline-audio {
  height: 26px;
  padding: 0 5px;
  border-radius: 3px;
  background-color: #424242;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.abcjs-inline-audio .abcjs-btn {
  width: 28px;
  height: 26px;
  margin-right: 2px;
  padding: 3px 4px;

  background: none;
  border: 1px solid transparent;
  box-sizing: border-box;
}

.abcjs-btn g {
  fill: #f4f4f4;
  stroke: #f4f4f4;
}

.abcjs-inline-audio .abcjs-btn:hover g {
  fill: #cccccc;
  stroke: #cccccc;
}

.abcjs-inline-audio .abcjs-midi-selection.abcjs-pushed {
  border: 1px solid #cccccc;
  background-color: #666666;
  box-sizing: border-box;
}

.abcjs-inline-audio .abcjs-midi-loop.abcjs-pushed {
  border: 1px solid #cccccc;
  background-color: #666666;
  box-sizing: border-box;
}

.abcjs-inline-audio .abcjs-midi-reset.abcjs-pushed {
  border: 1px solid #cccccc;
  background-color: #666666;
  box-sizing: border-box;
}

.abcjs-inline-audio .abcjs-midi-start .abcjs-pause-svg {
  display: none;
}

.abcjs-inline-audio .abcjs-midi-start .abcjs-loading-svg {
  display: none;
}

.abcjs-inline-audio .abcjs-midi-start.abcjs-pushed .abcjs-play-svg {
  display: none;
}

.abcjs-inline-audio .abcjs-midi-start.abcjs-loading .abcjs-play-svg {
  display: none;
}

.abcjs-inline-audio .abcjs-midi-start.abcjs-pushed .abcjs-pause-svg {
  display: inherit;
}

.abcjs-inline-audio .abcjs-midi-progress-background {
  background-color: #424242;
  height: 10px;
  border-radius: 5px;
  border: 2px solid #cccccc;
  margin: 0 8px 0 15px;
  position: relative;
  flex: 1;
  padding: 0;
  box-sizing: border-box;
}

.abcjs-inline-audio .abcjs-midi-progress-indicator {
  width: 20px;
  margin-left: -10px; /* half of the width */
  height: 14px;
  background-color: #f4f4f4;
  position: absolute;
  display: inline-block;
  border-radius: 6px;
  top: -4px;
  left: 0;
  box-sizing: border-box;
}

.abcjs-inline-audio .abcjs-midi-clock {
  margin-left: 4px;
  margin-top: 1px;
  margin-right: 2px;
  display: inline-block;
  font-family: sans-serif;
  font-size: 16px;
  box-sizing: border-box;
  color: #f4f4f4;
}

.abcjs-inline-audio .abcjs-tempo-wrapper {
  font-size: 10px;
  color: #f4f4f4;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.abcjs-inline-audio .abcjs-midi-tempo {
  border-radius: 2px;
  border: none;
  margin: 0 2px 0 4px;
  width: 45px;
  padding-left: 2px;
  box-sizing: border-box;
}

.abcjs-inline-audio .abcjs-loading .abcjs-loading-svg {
  display: inherit;
}

.abcjs-inline-audio .abcjs-loading {
  outline: none;
  animation-name: abcjs-spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.abcjs-inline-audio .abcjs-loading-svg circle {
  stroke: #f4f4f4;
}

@keyframes abcjs-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Adding the class "abcjs-large" will make the control easier on a touch device. */
.abcjs-large .abcjs-inline-audio {
  height: 52px;
}
.abcjs-large .abcjs-btn {
  width: 56px;
  height: 52px;
  font-size: 28px;
  padding: 6px 8px;
}
.abcjs-large .abcjs-midi-progress-background {
  height: 20px;
  border: 4px solid #cccccc;
}
.abcjs-large .abcjs-midi-progress-indicator {
  height: 28px;
  top: -8px;
  width: 40px;
}
.abcjs-large .abcjs-midi-clock {
  font-size: 32px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: -1px;
}
.abcjs-large .abcjs-midi-tempo {
  font-size: 20px;
  width: 50px;
}
.abcjs-large .abcjs-tempo-wrapper {
  font-size: 20px;
}
/* purgecss end ignore */
</style>
