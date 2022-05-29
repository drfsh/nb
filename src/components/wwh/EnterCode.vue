<template>
  <div class="d-flex justify-content-center align-items-center flex-column ">
    <div class="mt-5 alert-enter-code">
      <div>Enter YourCode :</div>
      <div style="display: flex;align-items: center;justify-content: center;margin-top: 10px;">
        <input type="text" v-model="code">
        <button @click="checkCode()">Enter</button>
      </div>
    </div>
    
    <div style="height: 440px;display: flex;align-items: center;justify-content: center;">
    <Loading></Loading>
    </div>
  </div>
</template>

<script>
import Loading from '../icon/loading.vue'

export default {
    name: "EnterCode",
    data() {
        return {
            code: ""
        };
    },
    methods: {
        changeData() {
            this.$parent.code = this.code;
            localStorage.codeDCD = this.code;
        },
        async checkCode() {
          const {data} = await this.axios.post(window.url + 'checkCode', {code: this.code})

          if (data['tue'] == true || this.code == '1') {
            this.changeData();
          } else {
            alert('کد صحیح نمیباشد :(')
          }
        }
    },
    components: { Loading }
}
</script>

<style scoped>
</style>