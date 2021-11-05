<template>
  <div v-if="!loading">
    <HeaderVue v-if="!loading" :propsData="data" />
    <EquipeVue
      v-if="data.template === 'page-equipe'"
      :data="data"
      :loading="loading"
      :apiUrl="apiUrl"
    />
    <AgenceVue
      v-else-if="data.template === 'page-agence'"
      :data="data"
      :loading="loading"
      :apiUrl="apiUrl"
    />
    <RealVue
      v-else-if="data.template === 'page-real'"
      :propsData="data"
      :loading="loading"
      :apiUrl="apiUrl"
    />
    <ClientVue
      v-else-if="data.template === 'page-client'"
      :loading="loading"
      :clients="data"
      :apiUrl="apiUrl"
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
  import ClientVue from "./Page/Client.vue";
  import FooterVue from "../layouts/Footer.vue";
  export default {
    name: "Page",
    props: {
      link: {
        type: String,
        default: "",
      },
      apiUrl: {
        type: String,
        default: "https://www.btg-communication.local",
      },
    },
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
      ClientVue,
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
