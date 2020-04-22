<template>
  <div>
    <section class="tune-title py-4">
      <h2 class="text-lg sm:text-xl lg:text-2xl">{{ this.tune.title }}</h2>
      <div class="text-sm sm:text-base lg:text-lg">
        {{
          $page.googleSheet.rhythm.charAt(0).toUpperCase() +
            $page.googleSheet.rhythm.slice(1)
        }}
        in
        {{ $page.googleSheet.key }}
      </div>
    </section>
    <section>
      <container>
        <div v-html="$page.googleSheet.shlug" />
      </container>
    </section>

    <section class="section-audio py-6 px-4">
      <container id="audio" class="audio">
        <div>player controls</div>
        <div>play pauyse</div>
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
    <section>
      <container class="suggestions p-2 m-2 py-8 text-xs">
        <div>
          <div>Suggestions:</div>
          <div>
            {{ extractedSuggestions }}
            <div
              class="tune-card"
              v-for="(tuneid, i) in extractedSuggestions"
              :key="`${i}-${tuneid}`"
            >
              <TuneLinker :tuneid="tuneid" />
              <!-- <tuneid: {{ tuneid }}> -->
            </div>
          </div>
        </div>
      </container>
    </section>
    <!--section class="bg-gray-600 py-8">
      <container class="suggestions p-2 m-2">
        <TuneHeader v-bind:header="$page.googleSheet.abcheader" />
      </container>
    </section-->
  </div>
</template>

<script defer>
// import abcjs from 'abcjs';
import '../abcjs-audio.css';
import TuneHeader from '~/components/TuneHeader';
import TuneLinker from '~/components/TuneLinker.vue';

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
    extractedSuggestions: function() {
      const hashtag = this.tune.abcheader
        .split(' ')
        .filter((v) => v.startsWith('#'));
      if (typeof hashtag !== 'undefined') {
        console.log(
          'Hi. hastga defined.',
          hashtag.map((t) => t.replace(/\D/g, ''))
        );
        return hashtag.map((t) => t.replace(/\D/g, ''));
        // .split(/\n/)
        // .filter((v) => v.startsWith('#'))
      } else {
        return 'none';
      }
    },
  },
  mounted: function() {
    const abcjs = require('abcjs');
    const abcTune = this.tune.abcheader + ' ' + this.tune.abc;
    // given that there are two elements in the DOM with the IDs "paper" and "audio"
    const cursorControl = {}; // see section on CursorControl
    // var abcTune = "X:1\n etc...";
    const abcOptions = { add_classes: true, responsive: 'resize' };
    const audioParams = { chordsOff: true };

    if (abcjs.synth.supportsAudio()) {
      console.log('in supportsAudio');
      const synthControl = new abcjs.synth.SynthController();
      synthControl.load('#audio', cursorControl, {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true,
      });

      const visualObj = abcjs.renderAbc('paper', abcTune, abcOptions);
      const createSynth = new abcjs.synth.CreateSynth();
      createSynth
        .init({ visualObj: visualObj[0] })
        .then(function() {
          synthControl
            .setTune(visualObj[0], false, audioParams)
            .then(function() {
              console.log('Audio successfully loaded.');
            })
            .catch(function(error) {
              console.warn('Audio problem:', error);
            });
        })
        .catch(function(error) {
          console.warn('Audio problem:', error);
        });
    } else {
      document.querySelector('#audio').innerHTML =
        'Audio is not supported in this browser.';
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
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.09) 0%,
    rgba(92, 121, 151, 1) 77%
  );
}
.tune-title > h2 {
  /* font-size: 1.4rem; */
  font-weight: bold;
  font-family: 'Encode Sans Expanded', sans-serif;
}
.footer {
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #444;
  color: #f5f5f5;
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
</style>
