<script>
  import HeaderVue from "../layouts/Header.vue";
  import FooterVue from "../layouts/Footer.vue";
  export default {
    name: "Article",
    props: {
      propsArticle: {
        type: String,
        required: true,
      },
      apiUrl: {
        type: String,
        default: "https://www.btg-dev.com/btg-test",
      },
    },
    components: {
      HeaderVue,
      FooterVue,
    },
    data() {
      return {
        article: {},
        loading: true,
      };
    },
    mounted() {
      this.article = JSON.parse(this.propsArticle);
      this.loading = false;
    },
    methods: {
      toggleContact() {
        this.$refs.Header.toggleContact();
      },
    },
  };
</script>

<template>
  <div
    v-if="!loading"
    class="post-template-default single single-post postid-1243 single-format-standard cookies-set cookies-accepted"
  >
    <HeaderVue
      :apiUrl="apiUrl"
      ref="Header"
      :propsData="article"
      :pageLoading="loading"
      type="blog"
    />
    <div class="loading-wrapper" :class="{ loadingPage: loading }">
      <div id="primary" class="content-area">
        <main id="main" class="site-main">
          <div class="container">
            <div class="content-blog">
              <article
                :id="'post-' + article.id"
                class="post type-post status-publish format-standard has-post-thumbnail hentry"
                :class="'post-' + article.id"
              >
                <section class="entry-header">
                  <h1 class="no-point" v-html="article.title"></h1>
                  <h2 class="no-after" v-html="article.content"></h2>
                  <div class="entry-categories">
                    <ul>
                      <li
                        v-for="(category, index) in article.category_names"
                        :key="index"
                      >
                        <a href="#">{{ category }}</a>
                      </li>
                    </ul>
                  </div>
                </section>

                <section class="entry-content">
                  <img
                    v-if="article.media"
                    :src="article.media.imgBlog"
                    :alt="article.title"
                  />
                  <div class="exo-light-18" v-html="article.acf.accroche"></div>
                </section>

                <div class="elems-container">
                  <div
                    v-for="(contenu, index) in article.acf.content"
                    :key="index"
                    class="v-for-container"
                  >
                    <h3
                      v-if="contenu.acf_fc_layout === 'titre'"
                      class="articles"
                    >
                      {{ contenu.titre }}
                    </h3>
                    <div
                      v-if="contenu.texte"
                      class="exo-light-18 articles"
                      v-html="contenu.texte"
                    ></div>
                    <img
                      v-if="contenu.image"
                      :src="contenu.image.url"
                      :alt="contenu.image.alt"
                      :title="contenu.image.title"
                      class="elem"
                    />
                    <div
                      v-if="contenu.acf_fc_layout === 'fichierpdf'"
                      class="exo-light-18 articles fichier"
                    >
                      <h3>{{ contenu.titre }}</h3>
                      <a
                        :href="contenu.lien_vers_le_fichier"
                        target="_blank"
                        title="book-btg-web-couv"
                        ><noscript
                          ><img
                            width="1058"
                            height="1497"
                            :src="contenu.fichier.url"
                            class="attachment-pdfRender size-pdfRender"
                            :alt="contenu.fichier.description" /></noscript
                      ></a>
                    </div>
                    <div
                      v-if="contenu.acf_fc_layout === 'video'"
                      class="elem videoContainer"
                    >
                      <div class="videoWrapper">
                        <iframe
                          width="560"
                          height="315"
                          :src="contenu.video.url"
                          :title="contenu.title"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                    <div
                      v-if="contenu.fichier"
                      class="exo-light-18 articles fichier"
                    >
                      <h3>{{ contenu.title }}</h3>
                      <a
                        :href="contenu.lien_vers_le_fichier"
                        _target="blank"
                        :title="contenu.fichier.title"
                        ><img
                          :src="contenu.fichier.url"
                          :alt="contenu.fichier.description"
                      /></a>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </main>
        <a @click="toggleContact()" class="classic-button menu-related">
          <p>Nous contacter</p>
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
        </a>
      </div>
      <FooterVue :apiUrl="apiUrl" />
    </div>
  </div>
</template>
