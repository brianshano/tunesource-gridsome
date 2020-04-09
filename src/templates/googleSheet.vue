<template>
  <TuneLayout>
      <h1 class="tune-info tune-title" v-if="$page.googleSheet.title">{{ $page.googleSheet.title }}</h1>
      <div class="tune-subline"><div class="tune-info tune-rhythm">{{ $page.googleSheet.rhythm }}</div>
      <div class="tune-info tune-id">Tune ID: {{ $page.googleSheet.tuneId }}</div></div>
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
import 'abcjs/abcjs-audio.css';
export default {
  mounted: function() {
        const abcjs = require('abcjs');
    console.log('In TuneLayout');
      console.log('abcjs', abcjs)

      const abcTune = this.$page.googleSheet.abcheader+' '+this.$page.googleSheet.abc;
      // const title = this.$page.googleSheet.title;
      console.log(`!!abcTune:` + abcTune);
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
          content: rhythm
        },
        {
          property: 'og:description',
          content: rhythm
        },
        {
          property: 'og:image',
          content: '.src/assets/static/src/assets/celtic-knot-tri-circles.png'
        },
        {
          property: 'og:url',
          content: 'http://tunesource.net'+path
        },
        {
          property: 'og:site_name',
          content: 'http://tunesource.net'
        },
        {
          property: 'og:type',
          content: 'website'
        },
       
        // twitter card
        {
          name: 'twitter:card',
          content: '.src/assets/static/src/assets/celtic-knot-tri-circles.png'
            ? 'summary_large_image'
            : 'summary'
        },
        {
          name: 'twitter:creator',
          content: 'brianshano'
        },
      ];
    console.log('METAtitle', title)
    console.log('METAmeta', meta)
    return {
      title:title ? title : "TuneSource",
      meta

    }
  },

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

</style>