<template>
  <div class="card">{{ parsedHeader }}</div>
</template>

<script>
export default {
  metaInfo: {
    // title: 'TuneSource',
  },
  name: 'Card',
  props: {
    header: [String],
  },
  data() {
    return {
      // message: header,
    };
  },
  mounted() {
    // console.log('mounted', this.props.header);
  },
  computed: {
    parsedHeader: function () {
      const splitter = this.header.toLowerCase().split(/\r\n|\r|\n/);
      const newLines = splitter.map((line) => {
        return ` ${line.substring(2)}`;
      });
      return newLines.toString();
    },
  },
};
</script>

<style>
.card {
}
</style>
