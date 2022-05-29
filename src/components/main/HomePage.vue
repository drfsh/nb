<template>
  <section class="main_body row">
    <item-hack></item-hack>
    <item-pixely></item-pixely>
    <item-info></item-info>
    <img style="width: 100%;" src="../../assets/image/po1.jpg" alt=""/>

  </section>
</template>

<script>
import ItemPixely from "@/components/main/item-pixely";
import ItemInfo from "@/components/main/item-info";
import ItemHack from "@/components/main/item-hack";

export default {
  name: "home_page",
  components: { ItemHack, ItemInfo, ItemPixely },
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
