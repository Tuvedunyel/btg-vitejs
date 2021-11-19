<script>
  import axios from "axios";
  import HeaderVue from "../layouts/Header.vue";
  import FooterVue from "../layouts/Footer.vue";
  import Strategie from "../static/icons/strategie-kills.svg";
  import Identite from "../static/icons/filter-identite.svg";
  import Graphisme from "../static/icons/filter-graphisme.svg";
  import Edition from "../static/icons/filter-edition.svg";
  import Web from "../static/icons/filter-web.svg";
  import Motion from "../static/icons/filter-motion.svg";
  export default {
    name: "Competence",
    props: {
      apiUrl: {
        type: String,
        default: "https://btg-communication.test",
      },
      link: {
        type: String,
        default: "",
      },
    },
    watch: {
      $route(to, from) {
        console.log(to);
        console.log(to.params.link);
        if (to.params.link !== undefined) {
          this.slug = to.params.link;
          this.otherDomain = [];
          this.fetchData();
        }
      },
    },
    data() {
      return {
        data: {},
        slug: "",
        otherDomain: [],
        loading: true,
      };
    },
    components: {
      HeaderVue,
      FooterVue,
    },
    mounted() {
      if (this.link !== "") {
        this.slug = this.link;
      }
      this.fetchData();
    },
    methods: {
      getDomainImage(data) {
        switch (data.slug) {
          case "strategie-definir-un-plan-de-communication-et-preparer-ses-actions":
            return Strategie;
          case "identite-visuelle-logotype-univers-de-marque-et-charte-graphique":
            return Identite;
          case "graphisme-des-visuels-sur-mesure":
            return Graphisme;
          case "edition-design-de-documents-longs":
            return Edition;
          case "creation-de-site-internet-vitrine-marchand":
            return Web;
          case "motion-design-video":
            return Motion;
          default:
            return "";
        }
      },
      async fetchData() {
        if (localStorage.getItem("data")) {
          let pages = JSON.parse(localStorage.getItem("data"));
          pages.map(page => {
            if (page.slug === this.slug) {
              this.data = page;
            }
            if (page.template === "page-competence") {
              this.otherDomain.push(page);
            }
          });
          this.otherDomain = [...new Set(this.otherDomain)];
          this.loading = false;
        } else {
          await axios
            .get(
              `${this.apiUrl}/wp-json/better-rest-endpoints/v1/pages?per_page=50`
            )
            .then(response => {
              response.data.map(res => {
                if (res.slug === this.slug) {
                  this.data = res;
                }
                if (page.template === "page-competence") {
                  this.otherDomain.push(page);
                }
              });
            });
          this.otherDomain = [...new Set(this.otherDomain)];
          this.loading = false;
        }
      },
    },
  };
</script>
<template>
  <HeaderVue v-if="!loading" :propsData="data" :apiUrl="apiUrl" />
  <div v-if="!loading">
    <section id="single-main">
      <div class="container">
        <h2 class="big-title">{{ data.acf.title_h2 }}</h2>
        <h3><span v-html="data.content"></span></h3>
        <div class="exerpt exo-light-18">{{ data.acf.accroche }}</div>
        <img src="../static/icons/vague-degrade.svg" alt="" class="vague" />

        <div class="elems-container">
          <div
            v-for="(content, index) in data.acf.content"
            :key="index"
            class="container-loop"
          >
            <div
              v-if="content.texte"
              class="exo-light-21"
              v-html="content.texte"
            ></div>
            <img
              v-if="content.image"
              :src="content.image.url"
              :alt="content.image.alt"
              :title="content.image.title"
              class="elem"
            />
            <div v-if="content.video" class="elem videoContainer">
              <div class="videoWrapper">
                <iframe
                  width="560"
                  height="315"
                  :src="content.video"
                  :title="data.title"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div class="socials">
          <a href="https://www.facebook.com" target="_blank"
            ><img
              src="../static/icons/facebook-degrade.svg"
              alt="logo facebook"
          /></a>
          <a href="https://www.twitter.com" target="_blank"
            ><img src="../static/icons/twitter-degrade.svg" alt="logo twitter"
          /></a>
        </div>
        <p class="plus menu-font">Nos autres domaines d'expertise</p>
        <hr />
        <ul class="other-kills">
          <li v-for="(domain, index) in otherDomain" :key="index">
            <router-link
              :to="{
                name: 'Competence',
                params: {
                  link: domain.slug,
                  apiUrl,
                },
              }"
            >
              <img :src="getDomainImage(domain)" :alt="domain.title" />
            </router-link>
            <p v-html="domain.title"></p>
          </li>
        </ul>
      </div>
    </section>
  </div>
  <FooterVue v-if="!loading" :apiUrl="apiUrl" />
</template>
