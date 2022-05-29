<template>
  <MainHeader v-if="showHeader"></MainHeader>
  <transition name="route" mode="out-in">
    <router-view v-slot="{Component}">
      <component :is="Component" :key="$route.name"></component>
    </router-view>
  </transition>

</template>

<script>
import MainHeader from './components/header/MainHeader.vue'

export default {
    name: "App",
    data() {
        return {
            showHeader: this.$route.name !== "piexy"
        };
    },
    mounted() {
        let body = document.getElementsByTagName("body")[0];
        if (localStorage.theme)
            body.classList.add(localStorage.theme);
    },
    watch: {
        async $route(to) {
            if (to.name === "pixely") {
                this.showHeader = false;
            }
            else {
                this.showHeader = true;
            }
        },
    },
    components: { MainHeader }
}
</script>

<style>
</style>
