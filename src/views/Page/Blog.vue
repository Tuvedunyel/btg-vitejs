<script>
  import axios from "axios";
  export default {
    name: "Blog",
    props: {
      loading: {
        type: Boolean,
        default: true,
      },
      data: {
        type: Array,
        default: () => [],
      },
      apiUrl: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        posts: [],
      };
    },
    async mounted() {
      await axios
        .get(
          this.apiUrl + "/wp-json/better-rest-endpoints/v1/posts?per_page=50"
        )
        .then(response => {
          this.posts = response.data;
        });
    },
  };
</script>

<template>
  <h1>Blog</h1>
</template>
