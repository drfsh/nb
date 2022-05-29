<template>
  <div class="col-7 p-0">
    <router-link :to="{name:'pixely'}">
      <div  class="menu-main-item">
        <span class="name">Pixely</span>
        <span class="title">The world of pixels</span>
        <span class="info">A 100 X 100 pixel screen that anyone can change without any restrictions and see all the changes in an instant.</span>
        <span class="pixel" style="top: 11px;right: 13px;"></span>
        <span class="pixel" style="top: 26px;right: 13px;background: burlywood;"></span>
        <span class="pixel" style="top: 26px;right: 28px;background: darkgray;"></span>
        <span class="pixel" style="top: 41px;right: 28px;background: cornflowerblue;"></span>
        <span class="pixel" style="top: 26px;right: 43px;background: darksalmon;"></span>

        <span class="pixel" style="top: 11px;right: 58px;background: lightblue;"></span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "item-pixely"
}
</script>

<style scoped>

</style>