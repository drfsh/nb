<template>
  <link rel="stylesheet" href="/css/pixely.css">
  <div class="loading">Loading...</div>
  <div id="container">
    <canvas id="canvas"></canvas>
  </div>

  <div class="d-zoom">
    <svg class="mb-5-" id="zoom_in" width="24" height="24" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M8 12H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 16V8" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg class="mb-5-" id="zoom_out" width="24" height="24" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M8 12H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg class="mb-5-" width="24" id="zoom_fix" height="24" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 6L6 18" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 10V6H14" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 14V18H10" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 6L18 18" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 10V6H10" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 14V18H14" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg @click="panelZoom=!panelZoom" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"/>
      <path d="M15 2H17.5C19.99 2 22 4.01 22 6.5V9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"/>
      <path d="M22 16V17.5C22 19.99 19.99 22 17.5 22H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"/>
      <path d="M9 22H6.5C4.01 22 2 19.99 2 17.5V15" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"/>
      <path d="M18 12V10M6 12H12H18H6ZM6 12V10V12ZM6 12V14V12ZM18 12V14V12Z" stroke="#292D32" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 6H14M12 18V6V18ZM12 18H14H12ZM12 18H10H12ZM12 6H10H12Z" stroke="#292D32" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <Transition name="route" move-class="route">
    <div v-show="panelZoom===true" class="d-zoom">
      <svg class="mb-5-" @click="panelZoom=false" width="24" height="24" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15.0013 20.6695C14.8113 20.6695 14.6213 20.5995 14.4713 20.4495L7.95125 13.9295C6.89125 12.8695 6.89125 11.1295 7.95125 10.0695L14.4713 3.54953C14.7613 3.25953 15.2413 3.25953 15.5312 3.54953C15.8212 3.83953 15.8212 4.31953 15.5312 4.60953L9.01125 11.1295C8.53125 11.6095 8.53125 12.3895 9.01125 12.8695L15.5312 19.3895C15.8212 19.6795 15.8212 20.1595 15.5312 20.4495C15.3813 20.5895 15.1912 20.6695 15.0013 20.6695Z"
            fill="white"/>
      </svg>
      <input class="zoom-range" id="zoom" type="range" value="0">
    </div>
  </Transition>


  <div class="dashboard hide">
    <div role="button" class="colors">Color</div>
    <div id="palette"></div>
    <div class="box-alpha">
      <input type="range" value="100" id="range_alpha">
      <span id="alpha">100</span><span>% :alpha</span>
      <span id="color-selected"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PixelWorld",
  data() {
    return {
      panelZoom: false
    }
  },
  mounted() {
    setTimeout(function () {
      const boardController = document.createElement("script");
      boardController.setAttribute(
          "src",
          "/js/boardController.js"
      )
      boardController.async = true
      document.head.appendChild(boardController)
      const pixely = document.createElement("script");
      pixely.setAttribute(
          "src",
          "/js/pixely.js"
      )
      pixely.async = true
      document.head.appendChild(pixely)

    }, 100)

  }
}
</script>


<style scoped></style>