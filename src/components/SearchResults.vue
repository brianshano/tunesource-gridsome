<template>
  <div
    v-if="results.length"
    class="flex justify-center w-full max-w-3xl mx-auto swing-in-top-fwd"
  >
    <div
      class="results-area border-solid border-1 border-gray-500 py-4 w-full align-center max-w-xs sm:max-w-2xl sm:mx-2 md:max-w-3xl"
    >
      <div class="results-title text-white text-center block pt-1 pb-1">
        Search Results
      </div>
      <div class="tune-list flex justify-center flex-wrap">
        <div
          v-for="tune in results"
          :key="tune.tuneId"
          class="w-full max-w-xs min-w-0 rounded overflow-hidden shadow-lg bg-gray-400 m-2 sm:m-4 slide-in-fwd-center"
        >
          <Card :tune="tune" />
          <!--div class="p-2 text-xs text-gray-600">
            {{
              tune.abcheader
                .split(/\r\n|\r|\n/)
                .filter((line, index) => {
                  return index > 0;
                })
                .map((line) => {
                  return `${line.substring(2)},`;
                })
                .join(' ')
            }}
          </div-->
        </div>
      </div>
    </div>
  </div>
  <!--div v-else class="results-title text-white text-center block pt-1 pb-1">
    Search Results will show here
  </div-->
</template>
<script>
import Card from '~/components/Card';

export default {
  name: 'Results',
  props: {
    results: [Array],
    // tuneId: [String],
    // rhythm: [String]
  },
  data() {
    return {
      message: 'Try change me!',
    };
  },
  components: {
    Card,
  },
};
</script>
<style>
.results-area {
  background-color: #ffffff20;
}
.swing-in-top-fwd {
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@keyframes swing-in-top-fwd {
  0% {
    transform: rotateX(-100deg);
    transform-origin: top;
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    transform-origin: top;
    opacity: 1;
  }
}
.slide-in-fwd-center {
  animation: slide-in-fwd-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@keyframes slide-in-fwd-center {
  0% {
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}
.slide-out-bck-center {
  animation: slide-out-bck-center 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
}
@keyframes slide-out-bck-center {
  0% {
    transform: translateZ(0);
    opacity: 1;
  }
  100% {
    transform: translateZ(-1100px);
    opacity: 0;
  }
}
</style>
