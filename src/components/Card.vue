<template>
  <div>
    <g-link :to="page.node.path">
      <div class="px-4 py-2 relative">
        <div class="absolute inset-0 p-1 text-base text-gray-500 z-0">
          #{{ page.node.tuneId }}
        </div>
        <div class="font-bold text-lg sm:text-xl text-center z-10">
          {{ page.node.title }}
        </div>
      </div>
    </g-link>
    <div class="card-clickables bg-gray-200">
      <div class="p-2">
        <span
          class="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >
          {{ page.node.rhythm }}
        </span>
        <span
          class="inline-block bg-gray-400 rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2"
        >
          {{ page.node.key }}
        </span>
      </div>
      <span
        class="inline-block rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2"
      >
        <button class="p-2">
          <i class="fas fa-share" aria-hidden="true" />
        </button>
      </span>
      <span
        class="inline-block rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2"
      >
        <button @click="favMe(show)" class="star p-2" v-if="show">
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
        <button @click="favMe(show)" class="star p-2" v-else>
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
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tune-',
  props: {
    page: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      show: false,
      favs: [],
    };
  },
  mounted() {
    // localStorage.clear();
    if (localStorage.favs) {
      // highlight Star if it's already a fav
      this.favs = JSON.parse(localStorage.getItem('favs'));
      if (this.favs.includes(this.page.node.tuneId)) {
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
      var currentFavs = JSON.parse(localStorage.getItem('favs'));
      if (show) {
        currentFavs = currentFavs.filter((t) => {
          return t !== this.page.node.tuneId;
        });
      } else {
        currentFavs.push(this.page.node.tuneId);
      }

      localStorage.setItem('favs', JSON.stringify(currentFavs));
      this.show = !this.show;
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
</style>
