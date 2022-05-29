<template>
  <div class="slider-menu" :class="{show:showSlide}">
    <slider-item name="فایل های دریافت شده" icon="dl" :route="{name:'downloads',data:''}"></slider-item>
    <slider-item name="خروج از دستگاه" icon="drfsh" @click="closeDevice()"></slider-item>
  </div>
  <div style="width: 100%;height: 100%;position: fixed;z-index: 100;top: 0" @click="$parent.showMenu()" v-if="showSlide"></div>
</template>

<script>
import SliderItem from "@/components/header/slider/slider-item";

export default {
  name: "menu-hack",
  components: { SliderItem},
  data() {
    return {
      showSlide: false
    }
  },
  methods:{
    closeDevice(){
      localStorage.codeDCD = ''
      window.location.reload()
    }
  },
  props: ['show'],
  watch: {
    show(v) {
      let vm = this
      setTimeout(function () {
        vm.showSlide = v
      }, 10)
    }
  }
}
</script>

<style scoped>

</style>