<template>
  <div>
    <g-link :to="tune.path">
      <div class="px-4 py-2 relative">
        <div class="absolute inset-0 p-1 text-base text-gray-500 z-0">
          #{{ tune.tuneId }}
        </div>
        <div class="font-bold text-lg sm:text-xl text-center z-10">
          {{ tune.title }}
        </div>
        <div
          v-if="tune.title2"
          class="font-bold text-xs sm:text-sm text-center z-10 text-gray-600"
        >
          {{ tune.title2 }}
        </div>
      </div>
    </g-link>
    <div class="card-clickables bg-gray-200">
      <div class="p-2 self-center">
        <g-link :to="`rhythm/${tune.rhythm}`">
          <span
            class="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >{{ tune.rhythm }}</span
          >
        </g-link>
        <g-link :to="`musicKey/${tune.musicKey}`">
          <span
            class="inline-block bg-gray-400 rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2"
            >{{ tune.musicKey }}</span
          >
        </g-link>
      </div>
      <span
        class="inline-block rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2 share-dialog self-center"
      >
        <button @click="shareMe()" class="share p-2" aria-label="Share Tune">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-share-2"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </span>
      <span
        class="inline-block rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2 self-center"
      >
        <button
          @click="favMe(show)"
          class="star p-4"
          v-if="show"
          aria-label="Favourite Tune1"
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
            />
          </svg>
        </button>
        <button
          @click="favMe(show)"
          class="star p-4"
          v-else
          aria-label="Favourite Tune"
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
            />
          </svg>
        </button>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tune-',
  props: {
    tune: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      show: false,
      favs: [],
      showShareModal: false,
      subtitle: false,
    };
  },
  mounted() {
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
  },
  methods: {
    favMe(show) {
      console.log('toggle Fav', show);
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

    shareMe() {
      const data = {
        title: this.tune.title,
        text: this.tune.title,
        url: this.tune.path,
      };
      if (navigator.share) {
        navigator
          .share(data)
          .then((succ) => {
            if (succ) {
              // this.onSuccess(succ);
            }
          })
          .catch((err) => {
            if (onError) {
              console.log('error!', err);

              // this.onError(err);
            }
          });
      } else {
        console.log('error, no share api here');
        if (this.onError) {
          console.log('error!', err);
          // this.onError('method not supported');
        }
      }
    },
  },
};
</script>
<style>
.star svg {
  fill: #ccc;
}
.star svg.fav {
  fill: #ff8d44;
}

.card-clickables {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
