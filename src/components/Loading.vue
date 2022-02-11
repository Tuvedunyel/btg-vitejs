<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
    name: "Loading",
    data() {
      return {};
    },
  };
</script>

<template>
  <header id="acc-header" class="menu-font header-load">
    <div v-if="!loading" class="top">
      <a href="#" class="logo" title="BTG Communication"
        ><img
          src="./../static/icons/logo-btg.svg"
          alt="BTG Communication, agence de communication "
      /></a>
      <div class="accroche">- LE BUREAU TRÈS GRAPHIQUE -</div>
      <div id="menu-icon-flippable" class="menu flip-container">
        <p>menu</p>
        <div class="flip-card">
          <div class="front face">
            <img src="./../static/icons/menu.svg" alt="Menu" />
          </div>
          <div class="back face">
            <img src="./../static/icons/close-menu.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
      <div class="elem-center loader">
        <div class="logo pusle">
          <img
            src="./../static/icons/logo-btg-encadre.svg"
            alt="BTG Communication, agence basée à Tours"
          />
        </div>
      </div>
    </div>
  </header>
</template>
