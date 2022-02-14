<script>
  export default {
    name: "BannerRealisation",
    props: {
      data: {
        type: Object,
        default: {},
      },
      apiUrl: {
        type: String,
        default: "https://www.btg-dev.com/btg-test",
      },
    },
  };
</script>

<template>
  <div id="single-banner" class="banner">
    <router-link
      :to="{
        name: 'Page',
        params: { apiUrl, link: 'les-projets-de-l-agence' },
      }"
      class="back"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1276.9 768">
        <path
          id="hexa"
          d="M948.6 761.8L620.4 572.3v-379L948.6 3.7l328.3 189.5v379L948.6 761.8zM637.2 562.6l311.5 179.8 311.5-179.8V202.9L948.6 23.1 637.2 202.9v359.7z"
        ></path>
        <path
          id="arrow"
          d="M562.1 239l-88.3-88.3L242.9 380l231.7 234.8 88.3-88.4-86-89.1h328V322.7h-328l85.2-83.7z"
          fill="#e3775b"
        ></path>
      </svg>
      <div id="retour-project">Retour aux projets</div>
    </router-link>
    <div class="main-img">
      <noscript
        ><img
          :src="data.acf.poster_single.url"
          :alt="data.acf.poster_single.alt" /></noscript
      ><img
        class="lazyloaded"
        :src="data.acf.poster_single.url"
        :data-src="data.acf.poster_single.url"
        :alt="data.acf.poster_single.alt"
      />
    </div>
  </div>
</template>
