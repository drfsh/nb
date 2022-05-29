<template>
  <div class="col-6 p-0">
    <router-link :to="{name:'fileManager'}">
      <div class="menu-main-item">
        <span class="name">Files</span>
        <span class="title">Controll file</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "item-files"
}
</script>

<style scoped>

</style>