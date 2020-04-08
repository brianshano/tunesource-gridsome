<template>
<div class="card">
  <article class="media">
    <div class="media-left"><div v-html="this.id" />
      <figure class="icon is-large">
        <i class="fas fa-music" aria-hidden="true"></i>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <b><div v-html="this.title" /></b>
        <div v-html="this.rhythm" />
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="reply">
            <span class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>
  
</template>

<script>
export default {
  metaInfo: {
    title: 'TuneSource',
  },
  name: 'Card',
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
      message: 'Try change me!',
    };
  },
};
</script>

<style>
.card {
  padding: 1rem;
  margin: 1rem;
  width: 20rem;
  /* width: 14rem;
  height: 3rem;*/
}
</style>
