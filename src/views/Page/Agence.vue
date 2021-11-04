<template>
  <h1 v-html="data.title"></h1>
</template>

<script>
export default {
  name: "Agence",
  props: ["data"],
};
</script>
