<template>
  <h1>{{ link }}</h1>
</template>
<script>
import axios from "axios";
export default {
  name: "Page",
  props: ["link"],
  data() {
    return {
      data: null,
    };
  },
};
</script>
