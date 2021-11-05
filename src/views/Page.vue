<template>
  <div v-if="!loading">
    <HeaderVue v-if="!loading" :propsData="data" />
    <EquipeVue
      v-if="data.template === 'page-equipe'"
      :data="data"
      :loading="loading"
    />
    <AgenceVue
      v-else-if="data.template === 'page-agence'"
      :data="data"
      :loading="loading"
    />
    <RealVue
      v-else-if="data.template === 'page-real'"
      :propsData="data"
      :loading="loading"
    />
    <FooterVue v-if="!loading" />
  </div>
</template>
<script>
  import axios from "axios";
  import HeaderVue from "../layouts/Header.vue";
  import EquipeVue from "./Page/Equipe.vue";
  import AgenceVue from "./Page/Agence.vue";
  import RealVue from "./Page/Real.vue";
  import FooterVue from "../layouts/Footer.vue";
  export default {
    name: "Page",
    props: ["link"],
    data() {
      return {
        data: null,
        loading: true,
      };
    },
    components: {
      HeaderVue,
      EquipeVue,
      AgenceVue,
      RealVue,
      FooterVue,
    },
    async mounted() {
      await axios
        .get(
          "https://btg-communication.local/wp-json/better-rest-endpoints/v1/pages?per_page=50"
        )
        .then(response => {
          response.data.map(res => {
            if (res.slug === this.link) {
              this.data = res;
            }
          });
        });
      this.loading = false;
    },
  };
</script>
