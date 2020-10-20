<template>
  <div class="flex flex-col items-stretch justify-center mx-4">
    <div
      class="pt-2 relative mx-auto text-gray-600 w-full self-center max-w-sm sm:max-w-1xl md:max-w-3xl"
    >
      <!--label for="search">Search TuneSource</label-->
      <input
        id="search"
        v-model="searchTerm"
        class="input bg-white h-10 px-5 pr-16 text-sm w-full focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
      />
      <!--/label-->
      <button
        type="submit"
        class="absolute right-0 top-0 mt-3 mr-3 sm:mt-4 sm:mr-4"
        aria-label="Search Tunesource"
      >
        <svg
          class="text-gray-600 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          style="enable-background: new 0 0 56.966 56.966;"
          xml:space="preserve"
          width="512px"
          height="512px"
        >
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
          />
        </svg>
      </button>
    </div>
    <div>
      <SearchResults :results="searchResults" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchTerm: ""
  }),

  computed: {
    searchResults() {
      const searchTerm = this.searchTerm;
      console.log("search query", this.searchTerm);
      if (searchTerm.length < 2) return [];
      console.log("searchterm", this.$search, this.$search.search({ query: searchTerm, limit: 6 }));
      return this.$search.search({ query: searchTerm, limit: 6 });
    }
  }
};
</script>
<style>
.search {
  padding: 20px;
  background: #fff;
}
input {
  font-size: 16px;
}
</style>
</page-query>
