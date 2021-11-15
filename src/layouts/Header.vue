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
    <BannerVue
      v-else-if="type === 'page'"
      :data="propsData"
      :template="template"
    />
    <div v-if="type === 'blog'" id="single-banner" class="banner">
      <router-link
        :to="{
          name: 'Page',
          params: { apiUrl: apiUrl, link: 'blog-et-actu-de-lagence' },
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
        <div id="retour-project">Retour aux actualités</div>
      </router-link>
    </div>
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
      type: {
        type: String,
        default: "page",
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
