<template>
  <TuneLayout>
    <h3>{{ $page.googleSheet.title }}</h3>
    <div>Slug: {{ $page.googleSheet.shlug }}</div>
    <div>Rhythm: {{ $page.googleSheet.rhythm }}</div>
    <div>Rhythm: {{ $page.googleSheet.rhythm2 }}</div>
    <div>ID: {{ $page.googleSheet.tuneId }}</div>
    <div id="paper"></div>
    <div id="audio"></div>
  </TuneLayout>
</template>

<page-query>
query Post($path: String!) {
  googleSheet(path: $path){
    shlug
    title
    abc
    abcheader
    rhythm
    rhythm
    tempo
    tuneId
  }
}
</page-query>
<script>
import abcjs from 'abcjs';
import 'abcjs/abcjs-audio.css';

export default {
  mounted: function() {
    const abcTune = this.$page.googleSheet.abcheader+' '+this.$page.googleSheet.abc;
    // const abcTune = this.tune;
    // const abcNo = `X:962 T:Cooley's T:Luttrell's Pass R:reel C:Joe Mills, Galway (1924-1973) D:Dubliners: 25 Years Celebration. D:Noel Hill & Tony Linnane D:Frankie Gavin & Paul Brock: Tribute to Joe Cooley Z:id:hn-reel-48 M:C| K:Edor EBBA B2EB|~B2AB dBAG|(3FED AD BDAD|FDFA dAFD| EBBA B2EB|~B2AB defg|afef dBAF|1 DEFD E2ED:|2 DEFD E2gf|| |:eB~B2 eBgB|eB~B2 gedB|A2FA DAFA|~A2FA defg| eB~B2 eBgB|eB~B2 defg|afef dBAF|1 DEFD E2gf:|2 DEFD E2ED||`;
    // const abcTest = "X:962 T:Cooley\'s T:Luttrell\'s Pass R:reel C:Joe Mills, Galway (1924-1973) D:Dubliners: 25 Years Celebration. D:Noel Hill & Tony Linnane D:Frankie Gavin & Paul Brock: Tribute to Joe Cooley Z:id:hn-reel-48 M:C| K:Edor EBBA B2EB|~B2AB dBAG|(3FED AD BDAD|FDFA dAFD| EBBA B2EB|~B2AB defg|afef dBAF|1 DEFD E2ED:|2 DEFD E2gf|| |:eB~B2 eBgB|eB~B2 gedB|A2FA DAFA|~A2FA defg| eB~B2 eBgB|eB~B2 defg|afef dBAF|1 DEFD E2gf:|2 DEFD E2ED||";
    console.log(`!!abcTune:` + abcTune);
    console.log(`!!abcTuneHeader:` + this.$page.googleSheet.abcheader);
    // console.log(`abcTest:` + abcTest);

    // abcjs.renderAbc('paper', abcTune, {});
    // abcjs.renderAbc("paper", abcTune, { add_classes: true, clickListener: this.listener });
    // var synth = new abcjs.synth.CreateSynth();
    // var myContext = new AudioContext();
    // var visualObj = abcjs.renderAbc('paper', abcTune, {});
    // synth.init({
    //     audioContext: myContext,
    //     visualObj: visualObj,
    //     millisecondsPerMeasure: 400
    // });
    var cursorControl = { };
    var abcOptions = { add_classes: true };
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
  methods: {
    getAbc(id) {
      console.log('IN HERE', id);
    },
  },
  name: 'hello',
  data() {
    return {
      tune: this.$page.googleSheet.abc,
//       tune: `X:87
// T:Highlandman, The
// R:highland
// H:Belongs to the \"Highlander Kissed His Granny\" family.
// H:Other related tunes are \"The Gravel Walks\" reel#60
// H:\"The Jolly Seven\" reel#559, \"John Stenson's\" reel#392
// D:Altan: Horse with a Heart
// Z:id:hn-hf-10
// M:C|
// K:Amix
// A2 (3AAA cdec|ABce dBGB|A2 (3AAA cdeg|afge dBGB:|
// |:=cg~g2 afge|=cege dBGB|=cg~g2 afgb|afge dBGB:|`,
      // tune: `X:962 T:Cooley's T:Luttrell's Pass R:reel C:Joe Mills, Galway (1924-1973) D:Dubliners: 25 Years Celebration. D:Noel Hill & Tony Linnane D:Frankie Gavin & Paul Brock: Tribute to Joe Cooley Z:id:hn-reel-48 M:C| K:Edor EBBA B2EB|~B2AB dBAG|(3FED AD BDAD|FDFA dAFD| EBBA B2EB|~B2AB defg|afef dBAF|1 DEFD E2ED:|2 DEFD E2gf|| |:eB~B2 eBgB|eB~B2 gedB|A2FA DAFA|~A2FA defg| eB~B2 eBgB|eB~B2 defg|afef dBAF|1 DEFD E2gf:|2 DEFD E2ED||`,

    };
  },
};
</script>
