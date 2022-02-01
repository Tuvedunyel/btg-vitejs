<script>
  export default {
    name: "BTG Communication",
    data() {
      return {
        apiUrl: "https://btg-dev.com/btg-test",
      };
    },
  };
</script>

<template>
  <div v-cloak>
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <transition name="route" mode="out-in">
      <router-view :apiUrl="apiUrl"></router-view>
    </transition>
  </div>
</template>
