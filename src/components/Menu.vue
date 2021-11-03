<template>
  <div id="overlay-menu">
    <div class="content">
      <div class="list-nav">
        <div class="vague">
          <img src="./../static/icons/wave-yellow.gif" alt="" />
        </div>
        <nav>
          <div class="menu-principal-container">
            <ul v-if="menu" id="menu-principal" class="menu-font">
              <li
                v-for="(link, index) in menu"
                :key="index"
                :class="link.slug === '#' && 'accordeon'"
                class="menu-item"
              >
                <a
                  v-if="link.slug === '#'"
                  @click="toggleSubMenu"
                  href="#"
                  v-html="link.title"
                >
                </a>
                <a
                  v-else-if="link.menu_item_parent === '0'"
                  href="#"
                  v-html="link.title"
                ></a>
                <span v-if="link.slug === '#'">
                  <ul v-if="subMenuBoolean" class="sub-menu">
                    <li
                      v-for="(item, key) in subMenu"
                      :key="key"
                      class="
                        menu-item
                        menu-item-type-post_type
                        menu-item-object-page
                      "
                    >
                      <a href="#">{{ item.title }}</a>
                    </li>
                  </ul>
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="logo-list">
        <a href="mailto:contact@btg-communication.fr"
          ><span class="screen-reader-text">Contact</span
          ><img src="./../static/icons/contact-degrade.svg" alt="Une enveloppe"
        /></a>
        <a :href="data.url_facebook_rs" target="_blank"
          ><span class="screen-reader-text">Facebook</span
          ><img
            src="./../static/icons/facebook-degrade.svg"
            alt="Logo Facebook"
        /></a>
        <a :href="data.url_twitter_rs" target="_blank"
          ><span class="screen-reader-text">Twitter</span
          ><img src="./../static/icons/twitter-degrade.svg" alt="Logo Twitter"
        /></a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Menu",
  props: ["data"],
  data() {
    return {
      menu: null,
      subMenuBoolean: false,
      subMenu: [],
    };
  },
  mounted() {
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
  },
  methods: {
    toggleSubMenu() {
      this.subMenuBoolean = !this.subMenuBoolean;
    },
  },
};
</script>
