<template>
  <div v-if="!loading">
    <section id="agency">
      <div class="bg-img">
        <img
          :src="data.acf.image_de_fond.url"
          :alt="data.acf.image_de_fond.alt"
          :titre="data.acf.image_de_fond.title"
        />
      </div>
      <div class="left">
        <h2 class="reversed flipped no-transition">L'agence</h2>
        <div class="exo-light-21" v-html="data.acf.texte_agence"></div>
      </div>
      <div class="right">
        <div class="desc-container">
          <div class="desc">
            <img
              src="./../../static/icons/wave-radiant.gif"
              alt="Vague en dégradé animée"
            />
            <div v-html="data.acf.texte_accompagnement"></div>
            <img
              src="./../../static/icons/wave-radiant.gif"
              alt="Vague en dégradé animée"
            />
          </div>
        </div>
        <router-link
          :to="{
            name: 'Page',
            params: { link: 'l-equipe-de-communication', apiUrl },
          }"
          class="classic-button"
        >
          <p>L’équipe à votre écoute</p>
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
    <section id="skills">
      <h2>Notre savoir-faire</h2>
      <div
        class="exo-light-18 sous-titre"
        v-html="data.acf.texte_accroche"
      ></div>
      <div class="skills-list">
        <div
          v-for="(competence, index) in data.acf.competences"
          :key="index"
          class="skill"
        >
          <img
            :src="competence.icone.url"
            :alt="competence.icone.alt"
            :title="competence.icone.title"
          />
          <div class="desc">
            <h3>{{ competence.titre }}</h3>
            <div class="exo-light-16">{{ competence.texte }}</div>
            <div class="exo-light-14">
              <span class="red">Exemple : </span>
              <strong>{{ competence.exemple }}</strong>
            </div>
            <router-link
              :to="{
                name: 'Competence',
                params: { link: subMenu[index].slug, apiUrl },
              }"
            >
              En savoir plus
            </router-link>
          </div>
        </div>
      </div>
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
  </div>
</template>

<script>
  export default {
    name: "Agence",
    props: {
      data: {
        type: Object,
        required: true,
      },
      loading: {
        type: Boolean,
        required: true,
      },
      apiUrl: {
        type: String,
        default: "https://btg-dev.com/btg-test",
      },
    },
    data() {
      return {
        subMenu: null,
      };
    },
    created() {
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
  };
</script>
