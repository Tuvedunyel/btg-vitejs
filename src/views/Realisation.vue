<script>
  import HeaderVue from "../layouts/Header.vue";
  export default {
    name: "Realisation",
    props: {
      real: {
        type: String,
        required: true,
      },
      realisations: {
        type: String,
        required: true,
      },
      apiUrl: {
        type: String,
        default: "https://btg-communication.test",
        required: true,
      },
    },
    components: {
      HeaderVue,
    },
    data() {
      return {
        realisation: null,
        objectRealisations: null,
        loading: true,
      };
    },
    computed: {
      filteredObjectRealisations() {
        return (
          this.objectRealisations.filter(real => {
            return real.terms[0].slug.includes(
              this.realisation.terms[0].slug || this.realisation.terms[1].slug
            );
          }) ||
          real.terms[1].slug.includes(
            this.realisation.terms[1].slug || this.realisation.terms[0].slug
          )
        );
      },
    },
    mounted() {
      this.realisation = JSON.parse(this.real);
      this.objectRealisations = JSON.parse(this.realisations);
      this.loading = false;
    },
  };
</script>

<template>
  <HeaderVue
    v-if="!loading"
    :apiUrl="apiUrl"
    :propsData="realisation"
    type="realisation"
  />

  <section v-if="!loading" id="single-main">
    <div class="container">
      <h1>{{ realisation.title }}</h1>
      <h2 class="no-point"><span v-html="realisation.content"></span></h2>
      <div class="exerpt exo-light-18" v-html="realisation.acf.accroche"></div>
      <img src="../static/icons/vague-degrade.svg" alt="" class="vague" />

      <div class="elems-container">
        <div v-for="(contenu, index) in realisation.acf.content" :key="index">
          <div
            v-if="contenu.acf_fc_layout === 'texte'"
            class="exo-light-21"
            v-html="contenu.texte"
          ></div>

          <img
            v-if="contenu.acf_fc_layout === 'image'"
            :src="contenu.image.url"
            :alt="contenu.image.alt"
            class="elem"
          />

          <div
            v-if="contenu.acf_fc_layout === 'video'"
            class="elem videoContainer"
          >
            <div class="videoWrapper">
              <iframe
                width="560"
                height="315"
                :src="contenu.video"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <p v-if="contenu.url_client" class="elem">
            <a :href="contenu.url_client" target="_blank"
              >Site client : {{ contenu.url_client }}</a
            >
          </p>
        </div>
      </div>
      <div class="socials">
        <a href="https://www.twitter.com" target="_blank"
          ><img src="../static/icons/twitter-degrade.svg" alt="logo twitter"
        /></a>
        <a href="https://www.facebook.com" target="_blank"
          ><img src="../static/icons/facebook-degrade.svg" alt="logo facebook"
        /></a>
      </div>

      <a class="classic-button menu-related">
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
      <p class="plus menu-font">Plus de projets de l’agence</p>
      <hr />
      <div class="other-projects">
        <div
          v-for="(project, index) in filteredObjectRealisations"
          :key="index"
        >
          <router-link
            :to="{
              name: 'Realisation',
              params: {
                real: JSON.stringify(project),
                realisations: JSON.stringify(realisations),
                apiUrl,
              },
            }"
            class="real-item no-transition <?php echo $list; ?>"
          >
            <img
              :src="project.media.imgBlog"
              :alt="project.title"
              class="fond"
            />
            <div class="desc">
              <div class="overlay"></div>
              <h3>{{ project.title }}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.9 429.5">
                <path
                  d="M186 0L0 107.4v214.7l186 107.4 186-107.4V107.4L186 0zm174.9 315.7l-175 101-175-101v-202l175-101 175 101v202z"
                />
                <path
                  d="M169.3 134.7v63.6h-61.2v32.3h61.2v64.2h23.3v-64.2h61.2v-32.3h-61.2v-63.6z"
                />
              </svg>
              <p v-html="project.content"></p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
