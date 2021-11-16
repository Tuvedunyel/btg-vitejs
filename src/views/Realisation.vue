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
    mounted() {
      this.realisation = JSON.parse(this.real);
      this.objectRealisations = JSON.parse(this.realisations);
      this.loading = false;
    },
  };
</script>

<template>
  <HeaderVue :apiUrl="apiUrl" :propsData="realisation" type="realisation" />
  <h1 v-if="!loading">Réalisation</h1>
</template>
