<template>
  <section>
    <div @click="clickItem()" class="btn item">
      <div class="name__icon">
        <span>
          <icon-box v-if="icon=='box'" color="white"></icon-box>
          <icon-book-with-bookmark v-if="icon=='bookmark'" color="white"></icon-book-with-bookmark>
        </span>
        <span class="name">{{ name }}</span>
      </div>
      <span v-if="list.length>0">
        <icon-chevron-left :class="{'rotate--90':showItems}" color="white"></icon-chevron-left>
      </span>
      <span v-else style="white-space: nowrap;">
        {{info}}
      </span>
    </div>
    <div class="list-items" :style="showingAnimate()">
      <div v-for="(v,i) in list" :key="i" class="item btn"  @click="openPage(v)">
        <div class="name__icon">
          <span>
            <icon-book-with-bookmark color="white"></icon-book-with-bookmark>
          </span>
          <span class="name">{{ v.name }}</span>
        </div>
        <span style="white-space: nowrap;">
          {{v.info}}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import IconBookWithBookmark from "@/components/icon/icon-book-with-bookmark";
import IconChevronLeft from "@/components/icon/icon-chevron-left";
import IconBox from "@/components/icon/icon-box";

export default {
  name: "slider-item",
  components: {IconBox, IconChevronLeft, IconBookWithBookmark},
  data() {
    return {
      showItems: false,
    }
  },
  props: {
    name: {default: 'ایتم'},
    icon: {default: 'box'},
    info: {default: ''},
    route: {default: {name: '', data: []}},
    list: {default: []},
  },
  methods: {
    clickItem() {
      if (this.list.length != 0) {
        this.showItems = !this.showItems
      } else {
        this.$router.push({name: this.route.name})
      }
    },
    openPage(v) {
        this.$router.push({name: v.route.name})
    },
    showingAnimate() {
      let size;
      if (this.showItems) {
        size = 60 * this.list.length
      } else
        size = 0;
      return "height:" + size + "px;"
    }
  }
}
</script>

<style scoped>

</style>