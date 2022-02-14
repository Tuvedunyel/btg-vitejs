<script>
  export default {
    name: "BTG Communication",
    data() {
      return {
        apiUrl: "https://www.btg-communication.fr",
      };
    },
  };
</script>

<template>
  <div v-cloak>
    <div id="nav-router">
      <router-link to="/">Home</router-link>
    </div>
    <!-- <router-view v-slot="{ Component }" :apiUrl="apiUrl">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view> -->
    <transition name="route" mode="out-in">
      <router-view :apiUrl="apiUrl"></router-view>
    </transition>
  </div>
</template>
