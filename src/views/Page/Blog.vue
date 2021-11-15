<script>
  import axios from "axios";
  export default {
    name: "Blog",
    props: {
      loading: {
        type: Boolean,
        default: true,
      },
      data: {
        type: Object,
        default: {},
      },
      apiUrl: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        posts: [],
        categories: ["Tous les articles"],
        loadingPosts: true,
        searchCategory: "Tous les articles",
        searchBar: "",
      };
    },
    computed: {
      filteredPosts() {
        // if searchBar not empty filter posts by searchBar else filter posts by searchCategory
        if (this.searchBar) {
          return this.posts.filter(post => {
            return (
              post.title.toLowerCase().includes(this.searchBar.toLowerCase()) ||
              post.content.toLowerCase().includes(this.searchBar.toLowerCase())
            );
          });
        } else {
          if (this.searchCategory === "Tous les articles") {
            return this.posts;
          } else {
            return this.posts.filter(post => {
              return post.category_names.includes(this.searchCategory);
            });
          }
        }
      },
    },
    methods: {
      currentPosts(category) {
        if (category === this.searchCategory) {
          return "current-menu-item";
        }
      },
    },
    async mounted() {
      await axios
        .get(
          this.apiUrl + "/wp-json/better-rest-endpoints/v1/posts?per_page=50"
        )
        .then(response => {
          this.posts = response.data;
          response.data.map(post => {
            post.category_names.map(category => {
              this.categories.push(category);
            });
          });
          this.categories = [...new Set(this.categories)];
        });
      this.loadingPosts = false;
    },
  };
</script>

<template>
  <div v-if="!loading" id="primary" class="content-area">
    <main id="main" class="site-main blog">
      <header class="page-header">
        <div class="container">
          <ul id="menu-blog-actualites" class="menu">
            <li
              v-for="(category, index) in categories"
              :key="index"
              class="menu-item menu-item-type-custom-menu-item-object-custom"
              :class="currentPosts(category)"
            >
              <a @click="searchCategory = category" href="#">{{ category }}</a>
            </li>
          </ul>
        </div>
        <div class="search-bar widget_search">
          <form role="search" method="get" class="search-form" action="">
            <label>
              <span class="screen-reader-text">Rechercher un article</span>
              <input
                type="search"
                class="search-field"
                placeholder="Rechercher ..."
                name="searchBar"
                v-model="searchBar"
                title="Rechercher"
                autocomplete="off"
              />
            </label>
          </form>
        </div>
        <!-- <div class="resp-nav">
					<div class="openlist">Type d'article</div>
					<?php 
						wp_nav_menu(
							array(
								'theme_location' => 'menu-categories',
								'container' => 'div',
								'container_class' => 'container resp-nav-menu'
							)
						)
					?>
				</div>

				<?php dynamic_sidebar( 'searchbar' ); ?> -->
      </header>
      <div class="container">
        <div class="content-blog">
          <article
            v-for="(post, index) in filteredPosts"
            :key="index"
            :id="'post-' + post.id"
            class="
              post-1458 post
              type-post
              status-publish
              format-standard
              has-post-thumbnail
              hentry
              category-communication category-agence
            "
          >
            <section class="entry-header">
              <router-link
                :to="{
                  name: 'Article',
                  params: { article: post },
                }"
                ><h2 class="no-point" v-html="post.title"></h2
              ></router-link>
              <h3 v-html="post.content"></h3>
              <div class="entry-categories">
                <ul class="post-categories">
                  <li
                    v-for="(postCategory, index) in post.category_names"
                    :key="index"
                  >
                    <a href="#">{{ postCategory }}</a>
                  </li>
                </ul>
              </div>
            </section>
            <section class="entry-content">
              <a v-if="post.media.thumbnail" href="#"
                ><img :src="post.media.imgBlog" :alt="post.title"
              /></a>
              <div class="exho-light-18" v-html="post.acf.accroche"></div>
            </section>
            <section class="entry-footer">
              <router-link
                :to="{
                  name: 'Article',
                  params: { article: JSON.stringify(post) },
                }"
                >Lire la suite</router-link
              >
            </section>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>
