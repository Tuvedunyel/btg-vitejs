<template>
  <LoadingVue v-if="loading" :loading="loading" />
  <HeaderVue
    ref="Header"
    :propsData="data"
    :apiUrl="apiUrl"
    :pageLoading="loading"
    v-if="!propsLoading"
  />
  <div class="loading-wrapper" :class="{ loadingPage: loading }">
    <div v-if="!loading">
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
    </div>
    <FooterVue v-if="!loading" :apiUrl="apiUrl" />
  </div>
</template>
<script>
  import axios from "axios";
  import LoadingVue from "../components/Loading.vue";
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
    watch: {
      $route(to, from) {
        if (to.params.link !== undefined) {
          this.loading = true;
          this.slug = to.params.link;
          this.fetchData();
        }
      },
    },
    data() {
      return {
        data: null,
        loading: true,
        slug: "",
        metaDescription: "",
        propsLoading: true,
      };
    },
    components: {
      HeaderVue,
      EquipeVue,
      AgenceVue,
      LoadingVue,
      BlogVue,
      RealVue,
      ClientVue,
      FooterVue,
    },
    mounted() {
      if (this.link !== "") {
        this.slug = this.link;
      }
      this.fetchData();
      this.getMetaDescription();
    },
    methods: {
      async fetchData() {
        if (localStorage.getItem("data")) {
          let pages = JSON.parse(localStorage.getItem("data"));
          await pages.map(page => {
            if (page.slug === this.slug) {
              this.data = page;
            }
          });
          this.propsLoading = false;
        } else {
          await axios
            .get(
              `${this.apiUrl}/wp-json/better-rest-endpoints/v1/pages?per_page=50`
            )
            .then(response => {
              localStorage.setItem("data", JSON.stringify(response.data));
              response.data.map(res => {
                if (res.slug === this.slug) {
                  this.data = res;
                }
              });
            });
          this.propsLoading = false;
        }
        setTimeout(() => {
          this.loading = false;
        }, 800);
      },
      async getMetaDescription() {
        await axios
          .get(`${this.apiUrl}/wp-json/wp/v2/pages?per_page=50`)
          .then(response => {
            response.data.map(res => {
              if (res.slug === this.slug) {
                this.metaDescription = res.yoast_head_json.description;
              }
            });
          });
        document
          .querySelector("meta[name=description]")
          .setAttribute("content", this.metaDescription);
      },
    },
  };
</script>
