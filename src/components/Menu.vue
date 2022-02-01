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
                v-for="link in menu"
                :key="link.url"
                :class="link.slug === '#' && 'accordeon'"
                class="menu-item"
              >
                <a
                  v-if="link.slug === '#'"
                  @click="toggleSubMenu"
                  href="#"
                  v-html="link.title"
                  :class="subMenuBoolean && 'active-sub-menu'"
                >
                </a>
                <router-link
                  v-else-if="link.title === 'Accueil'"
                  to="/"
                  v-html="link.title"
                ></router-link>
                <router-link
                  v-else-if="link.menu_item_parent === '0'"
                  :to="{ name: 'Page', params: { link: link.slug } }"
                  v-html="link.title"
                ></router-link>
                <span v-if="link.slug === '#'">
                  <ul v-if="subMenuBoolean" class="sub-menu">
                    <li
                      v-for="(item, key) in subMenu"
                      :key="key"
                      class="menu-item menu-item-type-post_type menu-item-object-page"
                    >
                      <router-link
                        :to="{
                          name: 'Competence',
                          params: {
                            link: item.slug,
                            apiUrl: 'https://www.btg-dev.com/btg-test',
                          },
                        }"
                      >
                        {{ item.title }}
                      </router-link>
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
        <a :href="data.url_linkedin_rs" target="_blank"
          ><span class="screen-reader-text">linkedin</span
          ><img
            src="./../static/icons/linkedin-degrade.svg"
            alt="Logo linkedin"
        /></a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Menu",
    props: ["data", "menu", "subMenu"],
    data() {
      return {
        subMenuBoolean: false,
      };
    },
    methods: {
      toggleSubMenu() {
        this.subMenuBoolean = !this.subMenuBoolean;
      },
    },
  };
</script>
