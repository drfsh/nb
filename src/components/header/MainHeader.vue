<template>
  <header class="header">
    <div class="header__body">
      <transition :name="titleAnimatoinName" mode="out-in">
        <span key="title1" v-if="!isMenuShowing" class="header_title">نهج البلاغه</span>
        <span key="title2"  v-else class="header_title">فهرست</span>
      </transition>
      <span class="menu" @click="showMenu()">
           <menu-hamberger style="position:absolute;" :class="{'rotate-90':iconS[1],'opacity-02':iconS[1],}" v-if="iconS[0]"></menu-hamberger>
           <icon-times style="position:absolute;" :class="{'rotate-135':iconC[1],'opacity-02':iconC[1],'rotate-45':!iconC[1]}" v-if="iconC[0]"></icon-times>
      </span>
    </div>
  </header>
  <slider-menu :show="isMenuShowing"></slider-menu>
</template>

<script>
import MenuHamberger from "@/components/icon/menu-hamberger";
import IconTimes from "@/components/icon/icon-times";
import SliderMenu from "@/components/header/slider/slider-menu";
export default {
  name: "MainHeader",
  components: {SliderMenu, IconTimes, MenuHamberger},
  data(){
    return{
      isMenuShowing: false,
      iconS:[true,false],
      iconC: [false,true],
      titleAnimatoinName:'fade',
    }
  },
  methods:{
    showMenu(){
      let vm = this
      let body = document.getElementsByTagName('body')[0]
      if (!this.isMenuShowing){
        body.className = 'show_slide'
        this.isMenuShowing = true
        this.iconS[1] = true
        this.iconC[0] = true
        setTimeout(function () {
          vm.iconC[1] = false
        },10)
        setTimeout(function () {
          vm.iconS[0] = false
        },210)
      }else {
        body.className = ''
        this.isMenuShowing = false
        this.iconC[1] = true
        this.iconS[0] = true
        setTimeout(function () {
          vm.iconS[1] = false
        },10)
        setTimeout(function () {
          vm.iconC[0] = false
        },210)
      }
    }
  },
  watch:{
    isMenuShowing(v){
      if (v)
      this.titleAnimatoinName = 'trans'
      else
        this.titleAnimatoinName = 'trans-back'
    }
  }
}
</script>

<style scoped>

</style>