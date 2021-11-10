<template>
  <header
    v-if="!loading"
    :id="propsData.slug === 'agence-de-communication-a-tours' && 'acc-header'"
    class="menu-font"
  >
    <div v-if="!loading" class="top">
      <router-link to="/" class="logo" title="BTG Communication"
        ><img
          src="./../static/icons/logo-btg.svg"
          alt="BTG Communication, agence de communication "
      /></router-link>
      <div v-if="data" class="accroche">
        {{ data.baseline_identite }}
      </div>
      <div
        id="contact-icon-flippable"
        class="contact flip-container"
        @click="toggleContact()"
      >
        <div class="flip-card">
          <div class="front face">
            <img src="./../static/icons/contact.svg" alt="Contactez nous" />
          </div>
          <div class="back face">
            <img
              src="./../static/icons/close-contact.svg"
              alt="Fermer la fenêtre de contact"
            />
          </div>
        </div>
      </div>
      <div
        id="menu-icon-flippable"
        class="menu flip-container"
        @click="toggleMenu()"
      >
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
    <MenuVue :data="data" :menu="menu" :subMenu="subMenu" />
    <ContactVue :data="data" />
    <BannerFrontVue
      v-if="propsData.slug === 'agence-de-communication-a-tours'"
      :title="$props.propsData.title"
      :mainMenu="subMenu"
    />
    <BannerVue v-else :data="propsData" :template="template" />
    <div
      v-if="propsData.slug === 'agence-de-communication-a-tours'"
      class="bot"
    >
      <h1>{{ propsData.title }}</h1>
    </div>
  </header>
</template>
<script>
  import axios from "axios";
  import MenuVue from "./../components/Menu.vue";
  import ContactVue from "./../components/Contact.vue";
  import BannerFrontVue from "./../components/BannerFront.vue";
  import BannerVue from "../components/Banner.vue";
  export default {
    name: "Headers",
    props: {
      propsData: {
        type: Object,
        required: true,
      },
      apiUrl: {
        type: String,
        required: true,
        default: "https://btg-communication.test",
      },
    },
    components: {
      MenuVue,
      ContactVue,
      BannerFrontVue,
      BannerVue,
    },
    data() {
      return {
        data: null,
        loading: true,
        menu: null,
        subMenu: [],
        template: null,
      };
    },
    async mounted() {
      await axios
        .get(`${this.apiUrl}/wp-json/better-rest-endpoints/v1/options/acf`)
        .then(response => (this.data = response.data));

      await axios
        .get(`${this.apiUrl}/wp-json/better-rest-endpoints/v1/menus/principal`)
        .then(response => {
          this.menu = response.data;
          response.data.map(res => {
            if (res.menu_item_parent !== "0") {
              return this.subMenu.push(res);
            }
            this.subMenu.sort();
            this.subMenu = [...new Set(this.subMenu)];
          });
        });
      this.loading = false;
      this.template = this.propsData.template;
      const body = document.body;

      if (body.classList.contains("noscroll")) {
        body.classList.remove("noscroll");
      }
    },
    methods: {
      toggleContact() {
        const contactOverlay = document.getElementById("overlay-contact");
        const contactButton = document.getElementById("contact-icon-flippable");
        const menuOverlay = document.getElementById("overlay-menu");
        const menuButton = document.getElementById("menu-icon-flippable");
        const monbody = document.body;

        contactButton.classList.toggle("active");
        contactOverlay.classList.toggle("active");
        monbody.classList.toggle("noscroll");
        menuOverlay.classList.remove("active");
        menuButton.classList.remove("active");
      },
      toggleMenu() {
        const contactOverlay = document.getElementById("overlay-contact");
        const contactButton = document.getElementById("contact-icon-flippable");
        const menuOverlay = document.getElementById("overlay-menu");
        const menuButton = document.getElementById("menu-icon-flippable");
        const monbody = document.body;

        menuButton.classList.toggle("active");
        menuOverlay.classList.toggle("active");
        monbody.classList.toggle("noscroll");
        contactOverlay.classList.remove("active");
        contactButton.classList.remove("active");
      },
    },
  };
</script>
