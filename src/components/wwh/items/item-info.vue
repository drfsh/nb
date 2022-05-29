<template>
  <div class="col-6 p-0">
    <router-link :to="{name:'system'}">
      <div class="menu-main-item">
        <span class="name">System</span>
        <span class="title">System Info</span>
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