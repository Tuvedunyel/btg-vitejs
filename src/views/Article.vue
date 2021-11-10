<script>
  export default {
    name: "Article",
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<template>
  <h1 v-html="article.title"></h1>
</template>
