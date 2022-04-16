<template>
<div class="slider-menu" :class="{show:showSlide}">
    <slider-item name="مقدمه کتاب" info="(۱۷ الی ۵۹)"></slider-item>
    <slider-item :list="[{name: '1',info:'(۱۷ الی ۵۹)' ,route: {name: 'info', data: []}},{name: '۲', route: {name: '', data: []}}]"></slider-item>
</div>
</template>

<script>
import SliderItem from "@/components/header/slider/slider-item";
export default {
  name: "slider-menu",
  components: {SliderItem},
  data(){
    return{
      showSlide:false
    }
  },
  props:['show'],
  watch:{
    show(v){
      let vm = this
      setTimeout(function (){
        vm.showSlide = v
      },10)
    }
  }
}
</script>

<style scoped>

</style>