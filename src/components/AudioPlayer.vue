<template>
  <div class="audioplayer">
    <div id="audio">Audio Player here</div>
  </div>
</template>

<script>
// import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-audio.css';
import 'abcjs/abcjs-midi.css';
// import abcjs from 'abcjs';

export default {
  name: 'Audio',
  props: {
    id: [String, Number],
    title: [String],
    shlug: [String],
    rhythm: [String],
    // tuneId: [String],
    // rhythm: [String]
  },
  data() {
    return {
      synthControl: null,
      ytid: '',
    };
  },

  mounted: function () {
    // importing kills the build so use require for now...
    const abcjs = require('abcjs');
    console.log('In TuneLayout');
    console.log('abcjs', abcjs);
    console.log('data', this.$data.ytid);
    this.$data.ytid =
      'https://www.youtube.com/embed/' + this.$page.googleSheet.url;
    const abcTune =
      this.$page.googleSheet.abcheader + ' ' + this.$page.googleSheet.abc;
    // const title = this.$page.googleSheet.title;
    console.log(`!!abcTune:` + abcTune);
    var cursorControl = {};
    var abcOptions = { add_classes: true, responsive: 'resize' };
    var audioParams = { chordsOff: true };
    // window.addEventListener('load', function () {
    //   //your script
    //   console.log('event listener');
    // });
    this.$nextTick(function () {
      if (abcjs.synth.supportsAudio()) {
        var synthControl = new abcjs.synth.SynthController();
        // Code that will run only after the
        // entire view has been rendered
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
    });
  },
  metaInfo: {
    title: 'TuneSource',
  },
};
</script>

<style></style>
