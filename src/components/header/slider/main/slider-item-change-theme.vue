<template>
  <section>
    <div @click="clickItem()" class="btn item">
      <div class="name__icon">
        <span>
          <icon-brush color="rgb(41, 45, 50)"></icon-brush>
        </span>
        <span class="name">نمای ظاهری</span>
      </div>
      <span>
        <icon-chevron-left :class="{'rotate--90':showItems}" color="#2c3e50"></icon-chevron-left>
      </span>
    </div>
    <div class="list-items" :style="showingAnimate()">
      <div v-for="(v,i) in listTheme" :key="i" class="item btn" @click="select_theme(v)">
        <div class="name__icon">

          <span v-if="v.data==='light'" style="width: 15px;height: 15px;background: #1e486d;border-radius: 50px;border: 7px solid #ffffff;"></span>
          <span v-if="v.data==='dark'" style="width: 15px;height: 15px;background: #1e486d;border-radius: 50px;border: 7px solid #2c3e50;"></span>

          <span class="name">{{ v.name }}</span>
        </div>
        <span v-if="v.selected">
          <icon-check></icon-check>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import IconChevronLeft from "@/components/icon/icon-chevron-left";
import IconBrush from "@/components/icon/icon-brush";
import IconCheck from "@/components/icon/icon-check";

export default {
  name: "slider-item-change-theme",
  components: {IconCheck, IconBrush, IconChevronLeft, },
  data() {
    return {
      showItems: false,
      listTheme:[{name:'روشن',data:'light',selected:true},{name:'تاریک',data:'dark',selected:false}]
    }
  },
  methods: {
    clickItem() {
        this.showItems = !this.showItems
    },
    select_theme(v) {
      let body = document.getElementsByTagName('body')[0]
      console.log(v)
      this.listTheme.forEach(function (value) {
        value.selected = value.data === v.data;
      })
      if (v.data=='dark'){
        body.classList.add('dark_mod')
        localStorage.theme = "dark_mod"
      }else {
        body.classList.remove('dark_mod')
        localStorage.theme = "light_mod"
      }
    },
    showingAnimate() {
      let size;
      if (this.showItems) {
        size = 60 * this.listTheme.length
      } else
        size = 0;
      return "height:" + size + "px;"
    }
  }
}
</script>

<style scoped>

</style>