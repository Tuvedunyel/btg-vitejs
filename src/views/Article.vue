<script>
  export default {
    name: "Article",
    props: {
      posts: {
        type: Array,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      apiUrl: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        Article: {},
        loading: true,
      };
    },
    mounted() {
      this.getArticle();
    },
    methods: {
      getArticle() {
        this.posts.forEach(post => {
          if (post.title === this.title) {
            this.Article = post;
          }
        });
        this.loading = false;
      },
    },
  };
</script>

<template>
  <h1>Blog</h1>
</template>
