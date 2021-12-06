<template>
  <HeaderVue v-if="!loading" ref="Header" :propsData="data" :apiUrl="apiUrl" />
  <section v-if="!loading" id="acc-projet">
    <div class="container">
      <h2 class="reversed flipped no-transition">Projets</h2>
      <div class="glide no-transition">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li
              v-for="(slide, index) in data.acf.slide.slice(
                this.sliceA,
                this.sliceB
              )"
              :key="index"
              class="glide__slide"
            >
              <img :src="slide.image.url" :alt="slide.image.alt" />
            </li>
          </ul>
        </div>
        <div class="controls" data-glide-el="controls">
          <button
            @click="handleSlideArrow('previous')"
            class="prev"
            data-glide-dir="<"
          >
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
          </button>
          <div
            v-for="bullet in bulletSlider"
            :key="bullet"
            class="glide__bullets"
            data-glide-el="controls[nav]"
          >
            <button
              @click="handleSlideClick(bullet)"
              class="glide__bullet"
              data-glide-dir="="
            ></button>
          </div>
          <button
            @click="handleSlideArrow('next')"
            class="next"
            data-glide-dir=">"
          >
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
          </button>
        </div>
      </div>
      <div class="desc">
        <p class="exo-light-21" v-html="data.acf.texte_photo"></p>
        <router-link
          :to="{
            name: 'Page',
            params: { link: 'les-projets-de-l-agence', apiUrl },
          }"
          class="resp classic-button"
        >
          <p>Les réalisations de l'agence</p>
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
        </router-link>
      </div>
      <div class="button">
        <router-link
          :to="{
            name: 'Page',
            params: { link: 'les-projets-de-l-agence', apiUrl },
          }"
          class="resp classic-button"
        >
          <p>Les réalisations de l'agence</p>
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
        </router-link>
      </div>
    </div>
  </section>

  <section v-if="!loading" id="acc-activite">
    <div class="container">
      <div class="desc">
        <h2>Ce que l'on fait</h2>
        <p class="exo-light-21" v-html="data.acf.texte_competences"></p>
        <router-link
          :to="{
            name: 'Page',
            params: { link: 'agence-de-communication-et-savoir-faire', apiUrl },
          }"
          class="classic-button"
        >
          <p>L'agence et savoir-faire</p>
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
        </router-link>
      </div>
    </div>
    <div class="cards-container">
      <div class="flipped vague no-transition">
        <img src="./../static/icons/wave-yellow.gif" alt="Vague jaune" />
      </div>
      <div
        v-for="(poleCompetence, index) in data.acf.poles_de_competences"
        :key="index"
        class="card"
      >
        <router-link
          :to="{
            name: 'Competence',
            params: { link: subMenu[index].slug, apiUrl },
          }"
        >
          <img
            :src="poleCompetence.icone.url"
            :alt="poleCompetence.icone.alt"
          />
          <h3>{{ poleCompetence.titre }}</h3>
          <p class="exo-light-16" v-html="poleCompetence.descriptif"></p>
        </router-link>
      </div>
    </div>
  </section>

  <section v-if="!loading" id="acc-clients">
    <div class="container fixed">
      <h2 class="reversed flipped no-transition">Clients</h2>
      <div class="pourquoi-pas">
        <div class="vague">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 32">
            <path
              d="M156.7 32c-9.5 0-14.2-7.7-18.2-14.5-4.4-7.1-7.4-11.5-13.2-11.5-5.7 0-8.8 4.4-13.1 11.5C108.1 24.3 103.5 32 94 32s-14.2-7.7-18.2-14.5C71.4 10.4 68.4 6 62.7 6c-5.7 0-8.8 4.4-13.1 11.5C45.5 24.3 40.9 32 31.3 32s-14.2-7.7-18.2-14.5C8.8 10.4 5.7 6 0 6V0c9.5 0 14.2 7.7 18.2 14.5C22.6 21.6 25.6 26 31.3 26c5.7 0 8.8-4.4 13.1-11.5C48.5 7.7 53.1 0 62.7 0c9.5 0 14.2 7.7 18.2 14.5C85.2 21.6 88.3 26 94 26s8.8-4.4 13.1-11.5C111.2 7.7 115.8 0 125.3 0s14.2 7.7 18.2 14.5c4.3 7.2 7.4 11.5 13.1 11.5s8.8-4.4 13.1-11.5C173.8 7.7 178.5 0 188 0v6c-5.7 0-8.8 4.4-13.1 11.5-4.1 6.8-8.7 14.5-18.2 14.5z"
            />
          </svg>
        </div>
        <p>Pourquoi pas vous ?</p>
      </div>
      <div class="clients-list">
        <div class="grille"></div>
        <a
          v-for="(client, index) in clientShow"
          :key="index"
          :href="client.acf.url"
          class="client"
          :title="client.title"
        >
          <span class="screen-reader-text">{{ client.title }}</span>
          <img :src="client.media.thumbnail" :alt="client.title" />
        </a>
      </div>
      <router-link
        :to="{ name: 'Page', params: { link: 'experience-clients', apiUrl } }"
        class="classic-button"
      >
        <p>Références</p>
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
      </router-link>
    </div>
  </section>
  <section v-if="!loading" id="acc-philosophie">
    <div class="container">
      <div class="desc">
        <h2>Philosophie</h2>
        <div class="exo-light-21" v-html="data.acf.texte_philosophie"></div>
        <div class="flipped vague no-transition">
          <img src="./../static/icons/wave-yellow.gif" alt="" />
        </div>
      </div>
    </div>
    <div class="cards-container">
      <img :src="data.acf.image_philosophie" alt="Notre philosophie" />
    </div>
  </section>
  <section v-if="!loading" id="acc-methodologie">
    <div class="blue-background"></div>
    <div class="container">
      <h2>Méthodologie</h2>
      <div class="desc">
        <div class="exo-light-21" v-html="data.acf.texte_methodologie"></div>
      </div>
      <a @click="toggleContact()" class="classic-button menu-related">
        <p>Contactez-nous</p>
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
  <FooterVue v-if="!loading" :apiUrl="apiUrl" />
</template>
<script>
  import HeaderVue from "../layouts/Header.vue";
  import FooterVue from "../layouts/Footer.vue";
  import axios from "axios";
  export default {
    name: "Home",
    components: {
      HeaderVue,
      FooterVue,
    },
    props: {
      apiUrl: {
        type: String,
        default: "https://www.btg-communication.test",
      },
    },
    data() {
      return {
        data: {},
        loading: true,
        sliceA: 0,
        sliceB: 1,
        bulletSlider: [],
        client: [],
        currentSlide: 0,
        subMenu: null,
      };
    },
    computed: {
      clientShow() {
        if (this.client) {
          return this.client
            .slice(0, 12)
            .sort((a, b) => Date.parse(b.date_gmt) - Date.parse(a.date_gmt));
        }
        return this.client;
      },
    },
    async mounted() {
      if (localStorage.getItem("data")) {
        let pages = JSON.parse(localStorage.getItem("data"));
        await pages.map(page => {
          if (page.slug === "agence-de-communication-a-tours") {
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
              if (res.slug === "agence-de-communication-a-tours") {
                this.data = res;
              }
            });
          });
      }
      axios
        .get(
          `${this.apiUrl}/wp-json/better-rest-endpoints/v1/pages?per_page=50`
        )
        .then(response => {
          localStorage.setItem("data", JSON.stringify(response.data));
          response.data.map(res => {
            if (res.slug === "agence-de-communication-a-tours") {
              if (localStorage.getItem("data") !== JSON.stringify(res)) {
                this.data = res;
              }
            }
          });
        });
      for (let i = 0; i < this.data.acf.slide.length; i++) {
        this.bulletSlider.push(i);
      }
      if (localStorage.getItem("client")) {
        this.client = JSON.parse(localStorage.getItem("client"));
      } else {
        axios
          .get(
            `${this.apiUrl}/wp-json/better-rest-endpoints/v1/clients?per_page=50`
          )
          .then(response => {
            this.client = response.data;
            localStorage.setItem("client", JSON.stringify(response.data));
          });
      }
      axios
        .get(
          `${this.apiUrl}/wp-json/better-rest-endpoints/v1/client?per_page=50`
        )
        .then(response => {
          if (
            localStorage.getItem("client") !== JSON.stringify(response.data)
          ) {
            localStorage.setItem("client", JSON.stringify(response.data));
            this.client = response.data;
          }
        });
      document.head.innerHTML += `<meta name='description' content='${this.data.title}' />`;
      this.getSubMenu();
      this.loading = false;
    },
    methods: {
      handleSlideClick(slide) {
        if (
          this.currentSlide < slide &&
          this.sliceB < this.bulletSlider.length
        ) {
          this.sliceA = this.sliceA + 1 * (slide - this.currentSlide);
          this.sliceB = this.sliceB + 1 * (slide - this.currentSlide);
          this.currentSlide = slide;
        } else {
          this.sliceA = this.sliceA - 1 * (this.currentSlide - slide);
          this.sliceB = this.sliceB - 1 * (this.currentSlide - slide);
          this.currentSlide = slide;
        }
      },
      handleSlideArrow(directives) {
        if (directives === "previous" && this.sliceA > 0) {
          this.sliceA = this.sliceA - 1;
          this.sliceB = this.sliceB - 1;
          this.currentSlide = this.currentSlide - 1;
        }
        if (directives === "next" && this.sliceB < this.bulletSlider.length) {
          this.sliceA = this.sliceA + 1;
          this.sliceB = this.sliceB + 1;
          this.currentSlide = this.currentSlide + 1;
        }
      },
      getSubMenu() {
        if (localStorage.getItem("subMenu")) {
          this.subMenu = JSON.parse(localStorage.getItem("subMenu"));
        } else {
          axios
            .get(
              `${this.apiUrl}/wp-json/better-rest-endpoints/v1/menus/principal`
            )
            .then(response => {
              localStorage.setItem("menu", JSON.stringify(this.menu));
              response.data.map(res => {
                if (res.menu_item_parent !== "0") {
                  return this.subMenu.push(res);
                }
                this.subMenu.sort();
                this.subMenu = [...new Set(this.subMenu)];
              });
            });
        }
      },
      toggleContact() {
        this.$refs.Header.toggleContact();
      },
    },
  };
</script>
