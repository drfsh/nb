<template>
  <div class="slider-menu" :class="{show:showSlide}">
    <slider-item name="pixely" info="New" icon="pixely" :route="{name:'pixely',data:[]}"></slider-item>
    <!--    <slider-item :list="[{name: '1',info:'(۱۷ الی ۵۹)' ,route: {name: 'info', data: []}},{name: '۲', route: {name: '', data: []}}]"></slider-item>-->
    <slider-item name="صفحات برگزیده" icon="box"></slider-item>
    <slider-item-change-theme></slider-item-change-theme>
    <slider-item name="درباره" icon="drfsh"></slider-item>
  </div>
  <div style="width: 100%;height: 100%;position: fixed;z-index: 100;top: 0" @click="$parent.showMenu()" v-if="showSlide"></div>
</template>

<script>
import SliderItemChangeTheme from "@/components/header/slider/main/slider-item-change-theme";
import SliderItem from "@/components/header/slider/slider-item";

export default {
  name: "slider-menu",
  components: { SliderItem, SliderItemChangeTheme},
  data() {
    return {
      showSlide: false
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