<template>
  <section v-if="!loading" class="membre" id="romain">
    <div class="container">
      <h2 class="reversed flipped no-transition">{{ data.acf.nom_1 }}</h2>
      <img :src="data.acf.image_romain.url" :alt="data.acf.image_romain.alt" />
      <div class="desc">
        <h3>{{ data.acf.poste_romain }}</h3>
        <div class="exo-light-16" v-html="data.acf.descriptif_romain"></div>
      </div>
    </div>
  </section>

  <section v-if="!loading" class="membre" id="gael">
    <div class="container">
      <h2 class="reversed flipped no-transition">{{ data.acf.nom_2 }}</h2>
      <img
        :src="data.acf.image_gael.url"
        :alt="data.acf.image_gael.alt"
        :title="data.acf.image_gael.title"
      />
      <div class="desc">
        <h3>{{ data.acf.poste_gael }}</h3>
        <div class="exo-light-16" v-html="data.acf.descriptif_gael"></div>
      </div>
    </div>
  </section>

  <section v-if="!loading" class="membre" id="guillaume">
    <div class="container">
      <h2 class="reversed flipped no-transition">{{ data.acf.nom_3 }}</h2>
      <img
        :src="data.acf.image_guillaume.url"
        :alt="data.acf.image_guillaume.alt"
        :title="data.acf.image_guillaume.title"
      />
      <div class="desc">
        <h3>{{ data.acf.poste_guillaume }}</h3>
        <div class="exo-light-16" v-html="data.acf.descriptif_guillaume"></div>
      </div>
    </div>
  </section>

  <section v-if="!loading" class="membre" id="oceane">
    <div class="container">
      <h2 class="reversed flipped no-transition">{{ data.acf.nom_4 }}</h2>
      <img
        :src="data.acf.image_oceane.url"
        :alt="data.acf.image_oceane.alt"
        :title="data.acf.image_oceane.title"
      />
      <div class="desc">
        <h3>{{ data.acf.poste_oceane }}</h3>
        <div class="exo-light-16" v-html="data.acf.descriptif_oceane"></div>
      </div>
    </div>
  </section>

  <section id="lien">
    <router-link
      :to="{
        name: 'Page',
        params: { link: 'les-projets-de-l-agence', apiUrl },
      }"
      class="classic-button"
    >
      <p>Nos réalisations</p>
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
  </section>
</template>
<script>
  export default {
    name: "Equipe",
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      loading: {
        type: Boolean,
        default: false,
      },
      apiUrl: {
        type: String,
        default: "https://www.btg-dev.com/btg-test",
      },
    },
  };
</script>
