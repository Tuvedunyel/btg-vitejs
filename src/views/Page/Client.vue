<template>
  <section v-if="!loading" id="clients">
    <h2 class="no-point">Ils ont fait l’expérience :</h2>
    <div class="clients-list">
      <div
        v-for="(client, index) in clients.acf.client"
        :key="index"
        class="client"
        :data-video-ID="client.id_video !== '' && client.id_video"
        :data-name="client.nom"
        :data-job="client.job"
        :data-society="client.societe"
      >
        <div v-if="client.portrait && client.id_video == ''" class="photo">
          <img
            :src="client.portrait.url"
            :alt="client.portrait.alt"
            :title="client.portrait.title"
          />
        </div>
        <div v-else @click="toggleClient(client)" class="photo video">
          <img
            :src="client.portrait.url"
            :alt="client.portrait.alt"
            :title="client.portrait.title"
          />
        </div>
        <h3>
          {{ client.nom }}<span>{{ client.job }}</span
          >{{ client.societe }}
        </h3>

        <img
          class="vague"
          src="./../../static/icons/wave-radiant.gif"
          alt="Vague en dégradé au couleur du logo de BTG"
        />
        <div class="desc exo-light-16">
          <p>{{ client.descriptif }}</p>
          <br v-if="client.id_video !== ''" /><br
            v-if="client.id_video !== ''"
          />
          <strong v-if="client.id_video !== ''">En vidéo</strong>
        </div>
      </div>
      <VideoClientVue v-if="showClient" :video="video" />
    </div>
    <router-link
      :to="{
        name: 'Page',
        params: { link: 'les-projets-de-l-agence', apiUrl },
      }"
      class="classic-button"
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
  </section>
  <section v-if="!loading" id="partners">
    <h2 class="no-point">Ils nous font confiance :</h2>
    <div v-if="clients !== null" class="partners-list">
      <div v-for="(client, index) in trustClient" :key="index" class="partner">
        <img :src="client.media.thumbnail" :alt="client.title" />
      </div>
    </div>
    <h2 class="no-point">Et vous ?</h2>
    <button class="menu-related" @click="toggleContact()">
      <img src="./../../static/icons/contact-degrade.svg" alt="envellope" />
    </button>
  </section>
</template>
<script>
  import axios from "axios";
  import VideoClientVue from "./../../components/VideoClient.vue";
  export default {
    name: "Client",
    props: {
      clients: {
        type: Object,
        default: () => ({}),
      },
      loading: {
        type: Boolean,
      },
      apiUrl: {
        type: String,
        default: "https://btg-communication.test",
      },
    },
    components: {
      VideoClientVue,
    },
    data() {
      return {
        trustClient: null,
        showClient: false,
        video: null,
      };
    },
    async mounted() {
      if (localStorage.getItem("client")) {
        this.trustClient = JSON.parse(localStorage.getItem("client"));
      } else {
        axios
          .get(`${this.apiUrl}/wp-json/better-rest-endpoints/v1/client`)
          .then(response => {
            localStorage.setItem("client", JSON.stringify(response.data));
            this.trustClient = response.data;
          });
      }
    },
    methods: {
      toggleClient(video) {
        this.video = video;
        this.showClient = !this.showClient;
      },
      toggleContact() {
        this.$parent.$refs.Header.toggleContact();
      },
    },
  };
</script>
