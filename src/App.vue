<script>
  export default {
    name: "BTG Communication",
    data() {
      return {
        apiUrl: "https://btg-communication.local",
      };
    },
  };
</script>

<template>
  <div v-cloak>
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view :apiUrl="apiUrl"></router-view>
  </div>
</template>
