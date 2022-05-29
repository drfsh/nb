<template>
  <div class="col-5 p-0">
    <router-link :to="{name:'info'}">
      <div class="menu-main-item">
        <span class="name">Info</span>
        <span class="title">About me</span>
        <span class="pixel" style="width: 10px;height: 10px;top: 36px; right: 13px; background: burlywood;"></span>
        <span class="pixel" style="width: 10px;height: 10px;top: 16px; right: 13px; background: darkgray;"></span>
        <span class="pixel" style="width: 10px;height: 10px;top: 46px; right: 13px; background: cornflowerblue;"></span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "item-info"
}
</script>

<style scoped>

</style>