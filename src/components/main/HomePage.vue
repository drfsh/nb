<template>
  <MainHeader></MainHeader>
  <section class="main_body">
    <div class="list_menu">
      <div class="btn item shadow">
        <img src="../../assets/image/1.jpg">
        <span>خطبه ها</span>
      </div>

      <div class="btn item">
        <img src="../../assets/image/8.jpg">
        <span>آیات</span>
      </div>

    </div>
  </section>
</template>

<script>
import MainHeader from "@/components/header/MainHeader";

export default {
  name: "home_page",
  components: {MainHeader},
  mounted() {
    function createRipple(event) {
      const button = event.currentTarget;

      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
      circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
      circle.classList.add("ripple");

      const ripple = button.getElementsByClassName("ripple")[0];

      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);
    }
    const buttons = document.getElementsByClassName("btn");
    for (const button of buttons) {
      button.addEventListener("click", createRipple);
    }
  }
}
</script>

<style scoped>

</style>