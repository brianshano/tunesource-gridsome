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
      <div class="tune-list">
        <div
          v-for="tune in results"
          :key="tune.id"
          class="w-full max-w-xs min-w-10 rounded overflow-hidden shadow-lg bg-gray-400 m-2 sm:m-4 slide-in-fwd-center"
        >
          <g-link :to="tune.path">
            <div class="px-2 py-1 sm:px-4">
              <div class="font-bold text-sm sm:text-md md:text-lg text-center">
                {{ tune.title }}
              </div>
            </div>
          </g-link>
          <div class="card-clickables p-1 sm:px-4 sm:py-3 bg-gray-200">
            <div>
              <span
                class="inline-block bg-gray-400 rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2 p-2"
              >
                {{ tune.rhythm }}
              </span>
              <span
                class="inline-block bg-gray-400 rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2 p-2"
              >
                {{ tune.key }}
              </span>
            </div>
            <div class="flex flex-row">
              <span
                class="inline-block rounded-full text-xl font-semibold text-gray-700 mr-2 flex items-center p-2 hover:bg-gray-300"
              >
                <i
                  class="fas fa-share text-xl hover:text-gray-800"
                  aria-hidden="true"
                />
              </span>
              <span
                class="inline-block rounded-full text-xl font-semibold text-gray-700 mr-2 flex items-center p-2 hover:bg-gray-300"
              >
                <i
                  class="fas fa-heart text-xl hover:text-gray-800"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
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
