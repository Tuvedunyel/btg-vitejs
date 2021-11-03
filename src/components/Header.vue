<template>
  <header v-if="!loading" id="acc-header" class="menu-font">
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
    <BannerVue :title="$props.title" :mainMenu="subMenu" />
  </header>
</template>
<script>
import axios from "axios";
import MenuVue from "./Menu.vue";
import ContactVue from "./Contact.vue";
import BannerVue from "./Banner.vue";
export default {
  name: "Headers",
  props: ["title"],
  components: {
    MenuVue,
    ContactVue,
    BannerVue,
  },
  data() {
    return {
      data: null,
      loading: true,
      menu: null,
      subMenu: [],
    };
  },
  async mounted() {
    await axios
      .get(
        "http://btg-communication.local/wp-json/better-rest-endpoints/v1/options/acf"
      )
      .then((response) => (this.data = response.data));

    axios
      .get(
        "https://btg-communication.local/wp-json/better-rest-endpoints/v1/menus/principal"
      )
      .then((response) => {
        this.menu = response.data;
        response.data.map((res) => {
          if (res.menu_item_parent !== "0") {
            return this.subMenu.push(res);
          }
          this.subMenu.sort();
          this.subMenu = [...new Set(this.subMenu)];
        });
      });
    this.loading = false;
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
