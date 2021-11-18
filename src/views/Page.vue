<template>
  <div v-if="!loading">
    <HeaderVue v-if="!loading" :propsData="data" :apiUrl="apiUrl" />
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
    <BlogVue
      v-else-if="data.template === 'page'"
      :loading="loading"
      :data="data"
      :apiUrl="apiUrl"
    />
    <FooterVue v-if="!loading" :apiUrl="apiUrl" />
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
  import BlogVue from "./Page/Blog.vue";
  export default {
    name: "Page",
    props: {
      link: {
        type: String,
        default: "",
      },
      apiUrl: {
        type: String,
        default: "https://www.btg-communication.test",
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
      BlogVue,
      RealVue,
      ClientVue,
      FooterVue,
    },
    async mounted() {
      if (localStorage.getItem("data")) {
        let pages = JSON.parse(localStorage.getItem("data"));
        pages.map(page => {
          if (page.slug === this.link) {
            this.data = page;
          }
        });
      } else {
        await axios
          .get(
            `${this.apiUrl}/wp-json/better-rest-endpoints/v1/pages?per_page=50`
          )
          .then(response => {
            localStorage.setItem("data", JSON.stringify(response.data));
            response.data.map(res => {
              if (res.slug === this.link) {
                this.data = res;
              }
            });
          });
      }
      this.loading = false;
    },
  };
</script>
