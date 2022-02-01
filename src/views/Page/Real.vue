<template>
  <section v-if="!loading && fetchData" id="reals">
    <div class="container">
      <p class="exo-light-18 intro"></p>
      <div class="filters">
        <div class="filter-item active" @click="searchTerm = ''">
          <div class="icon">
            <img
              src="./../../static/icons/filter-tous.svg"
              alt="icone tous"
              class="black"
            />
            <img
              src="./../../static/icons/filter-tous-degrade.svg"
              alt="icone tous dégradé"
              class="gradient"
            />
          </div>
          <img src="./../../static/icons/vague(1).svg" alt="" class="vague" />
        </div>

        <div
          v-for="(name, index) in sortedTerm"
          :key="index"
          class="filter-item"
          @click="searchTerm = name"
        >
          <div class="icon">
            <img
              :src="renderLogo(name).src"
              :alt="renderLogo(name).alt"
              class="black"
            />

            <img
              :src="renderDegrade(name).src"
              :alt="renderDegrade(name).alt"
              class="gradient"
            />
          </div>
          <p>{{ name }}</p>
        </div>
      </div>
      <div id="real-list">
        <router-link
          v-for="(real, index) in filteredRealTerm"
          :key="index"
          :to="{
            name: 'Realisation',
            params: {
              real: JSON.stringify(real),
              realisations: JSON.stringify(data),
              apiUrl,
            },
          }"
          class="real-item no-transition"
        >
          <img :src="real.media.medium_large" :alt="real.title" />
          <div class="desc">
            <div class="overlay"></div>
            <h2 class="no-point" v-html="real.title"></h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.9 429.5">
              <path
                d="M186 0L0 107.4v214.7l186 107.4 186-107.4V107.4L186 0zm174.9 315.7l-175 101-175-101v-202l175-101 175 101v202z"
              />
              <path
                d="M169.3 134.7v63.6h-61.2v32.3h61.2v64.2h23.3v-64.2h61.2v-32.3h-61.2v-63.6z"
              />
            </svg>
            <p v-html="real.excerpt"></p>
          </div>
        </router-link>
      </div>

      <div
        v-for="(real, index) in data"
        :key="index"
        class="intro exo-light-18"
      >
        {{ real.acf.txt_realisation }}
      </div>

      <a class="classic-button menu-related" @click="toggleContact()">
        <p>Nous contacter</p>
        <svg
          class="arrow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          x="0px"
          y="0px"
        >
          <title>Arrows</title>
          <g data-name="Layer 2">
            <polygon
              points="44.13 72.13 58 86 94.25 50 57.87 13.13 44 27 57.51 41 6 41 6 59 57.51 59 44.13 72.13"
            ></polygon>
          </g>
        </svg>
      </a>
    </div>
  </section>
</template>
<script>
  import axios from "axios";
  import identite from "../../static/icons/filter-identite.svg";
  import graphisme from "../../static/icons/filter-graphisme.svg";
  import web from "../../static/icons/filter-web.svg";
  import edition from "../../static/icons/filter-edition.svg";
  import video from "../../static/icons/filter-motion.svg";
  import identiteDegrade from "../../static/icons/filter-identite-degrade.svg";
  import graphismeDegrade from "../../static/icons/filter-graphisme-degrade.svg";
  import webDegrade from "../../static/icons/filter-web-degrade.svg";
  import editionDegrade from "../../static/icons/filter-edition-degrade.svg";
  import videoDegrade from "../../static/icons/filter-motion-degrade.svg";
  export default {
    name: "Real",
    props: {
      propsData: {
        type: Object,
        default: JSON.parse(localStorage.getItem("data")),
      },
      loading: {
        type: Boolean,
      },
      apiUrl: {
        type: String,
        default: "https://www.btg-dev.com/btg-test",
        required: true,
      },
    },
    data() {
      return {
        data: null,
        sortedTerm: [],
        fetchData: false,
        searchTerm: "",
      };
    },
    computed: {
      filteredRealTerm() {
        return this.data.filter(real => {
          for (let value of real.terms) {
            return value.name
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase());
          }
        });
      },
    },
    async mounted() {
      if (localStorage.getItem("realisations")) {
        this.data = JSON.parse(localStorage.getItem("realisations"));
        this.data.map(res => {
          res.terms.map(term => {
            this.sortedTerm.push(term.name);
          });
        });
      } else {
        await axios
          .get(`${this.apiUrl}/wp-json/better-rest-endpoints/v1/realisations`)
          .then(response => {
            this.data = response.data;
            localStorage.setItem("realisations", JSON.stringify(response.data));
            response.data.map(res => {
              res.terms.map(term => {
                this.sortedTerm.push(term.name);
              });
            });
          });
      }
      this.sortedTerm = [...new Set(this.sortedTerm)];
      this.fetchData = true;
      this.getUpdatedRealisations();
    },
    methods: {
      async getUpdatedRealisations() {
        await axios
          .get(`${this.apiUrl}/wp-json/better-rest-endpoints/v1/realisations`)
          .then(response => {
            if (localStorage.getItem("realisations") !== response.data) {
              this.data = response.data;
              localStorage.setItem(
                "realisations",
                JSON.stringify(response.data)
              );
              response.data.map(res => {
                res.terms.map(term => {
                  this.sortedTerm.push(term.name);
                });
              });
            }
          });
        this.sortedTerm = [...new Set(this.sortedTerm)];
      },
      renderLogo(name) {
        switch (name) {
          case "Identité":
            return { src: identite, alt: "Identité" };
          case "Graphisme":
            return { src: graphisme, alt: "Graphisme" };
          case "Web":
            return { src: web, alt: "Web" };
          case "Édition":
            return { src: edition, alt: "Édition" };
          case "Vidéo":
            return { src: video, alt: "Motion" };
        }
      },

      renderDegrade(name) {
        switch (name) {
          case "Identité":
            return { src: identiteDegrade, alt: "Identité" };
          case "Graphisme":
            return { src: graphismeDegrade, alt: "Graphisme" };
          case "Web":
            return { src: webDegrade, alt: "Web" };
          case "Édition":
            return { src: editionDegrade, alt: "Édition" };
          case "Vidéo":
            return { src: videoDegrade, alt: "Motion" };
        }
      },
      toggleContact() {
        this.$parent.$refs.Header.toggleContact();
      },
    },
  };
</script>
