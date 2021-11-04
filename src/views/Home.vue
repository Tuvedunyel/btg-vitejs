<template>
  <HeaderVue v-if="!loading" :title="data.title" :propsData="data" />
</template>
<script>
import HeaderVue from "../components/Header.vue";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      data: null,
      loading: true,
    };
  },
  components: {
    HeaderVue,
  },
  async mounted() {
    await axios
      .get(
        "https://btg-communication.local/wp-json/better-rest-endpoints/v1/pages?per_page=50"
      )
      .then((response) => {
        response.data.map((res) => {
          if (res.slug === "agence-de-communication-a-tours") {
            this.data = res;
          }
        });
      });
    this.loading = false;
  },
};
</script>
