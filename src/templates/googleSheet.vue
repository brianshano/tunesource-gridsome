<template>
  <TuneLayout>
    
      <h3 v-if="$page.googleSheet.title">{{ $page.googleSheet.title }}</h3>
      <div>Slug: {{ $page.googleSheet.shlug }}</div>
      <div>Rhythm: {{ $page.googleSheet.rhythm }}</div>
      <div>Tune ID: {{ $page.googleSheet.tuneId }}</div>
      <div class="notation">
      <div id="paper"></div>
      </div>
      <div id="audio"></div>
    
    <ClientOnly>
    <p>this is client only</p>
    </ClientOnly>
  </TuneLayout>
</template>


<script>
// import abcjs from 'abcjs';
import 'abcjs/abcjs-audio.css';
// import ('abcjs');
export default {
  mounted: function() {
        const abcjs = require('abcjs');
    console.log('In TuneLayout');
      // const abcTune = this.$page.googleSheet.abc;
      console.log('abcjs', abcjs)

    // console.log('abcTune', abcTune)
      const abcTune = this.$page.googleSheet.abcheader+' '+this.$page.googleSheet.abc;
      console.log(`!!abcTune:` + abcTune);
    // console.log('mounted', this.$path)
    // console.log(`!!abcTuneHeader:` + this.$page.googleSheet.abcheader);
    // abcjs.renderAbc('paper', abcTune, {});
    var cursorControl = { };
    var abcOptions = { add_classes: true, responsive: "resize", };
    var audioParams = { chordsOff: true };
    if (abcjs.synth.supportsAudio()) {
      var synthControl = new abcjs.synth.SynthController();
      synthControl.load("#audio", 
            cursorControl, 
            {
                displayLoop: true, 
                displayRestart: true, 
                displayPlay: true, 
                displayProgress: true, 
                displayWarp: true
            }
        );

	    var visualObj = abcjs.renderAbc("paper", 
        abcTune, abcOptions);
	    var createSynth = new abcjs.synth.CreateSynth();
	    createSynth.init({ visualObj: visualObj[0] }).then(function () {
		    synthControl.setTune(visualObj[0], false, audioParams).then(function () {
			  console.log("Audio successfully loaded.")
        }).catch(function (error) {
        console.warn("Audio problem:", error);
        });
      }).catch(function (error) {
      console.warn("Audio problem:", error);
	  });
    } else {
	    document.querySelector("#audio").innerHTML = 
        "Audio is not supported in this browser.";
	  }
  },
  
  name: 'hello',
  data() {
			return {
				synthControl: null,
			};
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
  }
}
</page-query>

<style>
#audio {
  padding: 2rem 1rem;
  width: 100%;
  background-color: #424242;
}
.notation {
   border: 1px solid brown;
  background-color: white;
}
</style>