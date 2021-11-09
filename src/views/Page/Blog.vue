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
      };
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
    <main id="main" class="site-main">
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

      <!-- <div class="container">
				<div class="content-blog">
					<?php
					/* Start the Loop */
					while ( have_posts() ) : the_post(); ?>
						
						<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
							<section class="entry-header">
								<a href="<?php the_permalink(); ?>"><h2 class="no-point"><?php the_title(); ?></h2></a>
								<h3><?php the_content(); ?></h3>
								<div class="entry-categories">
									<?php the_category(); ?>
								</div>
						
							<section class="entry-content">
								<?php if (has_post_thumbnail()) { ?>
									<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('imgBlog'); ?> </a>
								<?php } ?>
								<div class="exo-light-18"><?php the_field( 'accroche' ); ?></div>
							</section>
						
							<section class="entry-footer">
								<a href="<?php the_permalink(); ?>">Lire la suite</a>
							</section>
						</article>
				</div>
			</div> -->
    </main>
    <!-- <a onclick="toggleContact()" class="classic-button menu-related">
		<p>Nous contacter</p>
		<svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" x="0px" y="0px"><title>Arrows</title><g data-name="Layer 2"><polygon points="44.13 72.13 58 86 94.25 50 57.87 13.13 44 27 57.51 41 6 41 6 59 57.51 59 44.13 72.13"></polygon></g></svg>
	</a>-->
  </div>
</template>
