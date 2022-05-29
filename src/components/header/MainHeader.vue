<template>
  <header class="header">
    <div class="header__body">
      <span class="menu" style="left: 14px;right: unset">
        <icon-drfsh color="#292D32" style="position:absolute;" v-if="routeName=='main'"></icon-drfsh>
        <IconChevronLeft v-else @click="back()"></IconChevronLeft>
      </span>
      <!-- <transition :name="titleAnimatoinName" mode="out-in">
        <span key="title1" v-if="!isMenuShowing" class="header_title">DRFSH</span>
        <span key="title2" v-else class="header_title">List Menu</span>
      </transition> -->
        <span key="title1" class="header_title">{{title}}</span>
      <span class="menu" @click="showMenu()">
           <menu-hamberger style="position:absolute;" :class="{'rotate-90':iconS[1],'opacity-02':iconS[1],}"
                           v-if="iconS[0]"></menu-hamberger>
           <icon-times style="position:absolute;"
                       :class="{'rotate-135':iconC[1],'opacity-02':iconC[1],'rotate-45':!iconC[1]}"
                       v-if="iconC[0]"></icon-times>
      </span>
    </div>
  </header>
  <slider-menu :show="isMenuShowing" v-if="routeName=='main' || routeName=='info'"></slider-menu>
  <HackMenu v-else-if="routeName=='dcc' || routeName=='fileManager'" :show="isMenuShowing"></HackMenu>
</template>

<script>
import MenuHamberger from "@/components/icon/menu-hamberger";
import IconTimes from "@/components/icon/icon-times";
import SliderMenu from "@/components/header/slider/main/slider-menu-main";
import HackMenu from "@/components/header/slider/hack/menu-hack";

import IconDrfsh from "@/components/icon/icon-drfsh";
import IconChevronLeft from "../icon/icon-chevron-left.vue";

export default {
  name: "MainHeader",
  components: { IconDrfsh, SliderMenu, IconTimes, MenuHamberger, IconChevronLeft ,HackMenu},
  computed:{
    routeName(){
      return this.$route.name
    },
    title(){
      return "DRFSH"
    }
  },
  data() {
    return {
      isMenuShowing: false,
      iconS: [true, false],
      iconC: [false, true],
      titleAnimatoinName: 'fade',
    }
  },
  methods: {
    back(){
      history.back()
    },
    showMenu() {
      let vm = this
      let body = document.getElementsByTagName('body')[0]
      let slide = document.getElementsByClassName('slider-menu')[0]
      if (!this.isMenuShowing) {
        slide.style.display = 'unset'
        body.classList.add('show_slide')
        this.isMenuShowing = true
        this.iconS[1] = true
        this.iconC[0] = true
        setTimeout(function () {
          vm.iconC[1] = false
        }, 10)
        setTimeout(function () {
          vm.iconS[0] = false
        }, 210)
      } else {
        body.classList.remove('show_slide')
        this.isMenuShowing = false
        this.iconC[1] = true
        this.iconS[0] = true
        setTimeout(function () {
          vm.iconS[1] = false
        }, 10)
        setTimeout(function () {
          vm.iconC[0] = false
          slide.style.display = 'none'
        }, 210)
      }
    }
  },
  watch: {
    isMenuShowing(v) {
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