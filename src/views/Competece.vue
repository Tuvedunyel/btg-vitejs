<script>
  import axios from "axios";
  import HeaderVue from "../layouts/Header.vue";
  import FooterVue from "../layouts/Footer.vue";
  export default {
    name: "Competence",
    props: {
      apiUrl: {
        type: String,
        default: "https://btg-communication.test",
      },
      link: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        data: {},
        loading: true,
      };
    },
    components: {
      HeaderVue,
      FooterVue,
    },
    mounted() {
      if (localStorage.getItem("data")) {
        let pages = JSON.parse(localStorage.getItem("data"));
        pages.map(page => {
          if (page.slug === this.link) {
            this.data = page;
          }
        });
      } else {
        axios
          .get(
            `${this.apiUrl}/wp-json/better-rest-endpoints/v1/pages?per_page=50`
          )
          .then(response => {
            response.data.map(res => {
              if (res.slug === this.link) {
                this.data = res;
              }
            });
          });
      }
      this.loading = false;
    },
  };
</script>
<template>
  <HeaderVue v-if="!loading" :propsData="data" :apiUrl="apiUrl" />
  <div v-if="!loading">
    <section id="single-main">
      <div class="container">
        <h2 class="big-title">{{ data.acf.title_h2 }}</h2>
        <h3><span v-html="data.content"></span></h3>
        <div class="exerpt exo-light-18">{{ data.acf.accroche }}</div>
        <img src="../static/icons/vague-degrade.svg" alt="" class="vague" />

        <div class="elems-container">
          <div
            v-for="(content, index) in data.acf.content"
            :key="index"
            class="container-loop"
          >
            <div
              v-if="content.texte"
              class="exo-light-21"
              v-html="content.texte"
            ></div>
            <img
              v-if="content.image"
              :src="content.image.url"
              :alt="content.image.alt"
              :title="content.image.title"
              class="elem"
            />
            <div v-if="content.video" class="elem videoContainer">
              <div class="videoWrapper">
                <iframe
                  width="560"
                  height="315"
                  :src="content.video"
                  :title="data.title"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div class="socials">
          <a href="https://www.facebook.com" target="_blank"
            ><img
              src="../static/icons/facebook-degrade.svg"
              alt="logo facebook"
          /></a>
          <a href="https://www.twitter.com" target="_blank"
            ><img src="../static/icons/twitter-degrade.svg" alt="logo twitter"
          /></a>
        </div>
        <!-- <?php // 2- Appel de la fonction paginate_links
                        global $wp_query;

                        $big = 999999999; 

                        echo paginate_links( array( // Plus d'info sur les arguments possibles  : https://codex.wordpress.org/Function_Reference/paginate_links
                            'base' =>
        str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
        'format' => '?paged=%#%', 'current' => max( 1, get_query_var('paged') ),
        'total' => $wp_query->max_num_pages ) ); ?> -->
        <p class="plus menu-font">Nos autres domaines d'expertise</p>
        <hr />
        <!-- <ul class="other-kills">
                <li><a href="<?php echo get_permalink(937); ?>"><img src="../static/icons/strategie-kills.svg" alt=""></a><p><?php echo get_the_title(937);?></p></li>
                <li><a href="<?php echo get_permalink(932); ?>"><img src="../static/icons/filter-identite.svg" alt=""></a><p><?php echo get_the_title(932);?></p></li>
                <li><a href="<?php echo get_permalink(930); ?>"><img src="../static/icons/filter-graphisme.svg" alt=""></a><p><?php echo get_the_title(930);?></p></li>
                <li><a href="<?php echo get_permalink(928); ?>"><img src="../static/icons/filter-edition.svg" alt=""></a><p><?php echo get_the_title(928);?></p></li>
                <li><a href="<?php echo get_permalink(934); ?>"><img src="../static/icons/filter-web.svg" alt=""></a><p><?php echo get_the_title(934);?></p></li>
                <li><a href="<?php echo get_permalink(939); ?>"><img src="../static/icons/filter-motion.svg" alt=""></a><p><?php echo get_the_title(939);?></p></li>
            </ul> -->
      </div>
    </section>
  </div>
  <FooterVue v-if="!loading" :apiUrl="apiUrl" />
</template>
