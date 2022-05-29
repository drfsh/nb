<template>
  <div class="col-6 p-0">
    <router-link :to="{name:'messages'}">
      <div class="menu-main-item">
        <span class="name">messages</span>
        <span class="title">SMS</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "item-messages"
}
</script>

<style scoped>

</style>