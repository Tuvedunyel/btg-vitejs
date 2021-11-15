<script>
  import axios from "axios";
  export default {
    name: "Article",
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        article: {},
      };
    },
    // mounted () {
    //   axios.get(`/api/articles/${this.articleId}`)
    //     .then(response => {
    //       this.article = response.data;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
  };
</script>

<template>
  <h1>Blog</h1>
</template>
