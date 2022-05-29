<template>
  <div class="main_body">
    <div v-if="list.length!=0 && !loading">
      <div class="mt-3 row pt-1 pb-5">
        <ItemMessage v-for="(v,i) in list" :key="i+'file'" :name="v.name" :number="v.file"></ItemMessage>

      </div>
    </div>
    <div v-else style="margin-top: 70%;">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import Pusher from "pusher-js";
import Loading from "../icon/loading.vue";
import ItemMessage from "./fileItems/item-message.vue";

export default {
  name: "messages_",
  data() {
    return {
      code: localStorage.codeDCD,
      pusher: null,
      list: [{name: 'm.png', number: "090000000"}],
      loading: false
    };
  },
  methods: {

    connectSocket() {
      this.pusher = new Pusher("ALacTeLEiNho", {
        forceTLS: true,
        wsHost: "push-teetup.iran.liara.run",
        wsPort: 443,
        disableStats: true,
      });
      console.log(this.code);
      this.pusher.subscribe("wwh-" + this.code + "-2");
      this.pusher.bind("socket", data => {
        if (data['type'] == 'sms' && data['job'] == 'get') {
          this.loading = false
          this.setLisFile(data['list'])
        }
      });
    },
    setLisFile(list) {
      this.list = JSON.parse(list)
    },
    async sendrequest() {
      let data = {id: this.code, type: "sms", job: "get"}
      data = JSON.stringify(data)
      await window.axios.post(window.url + "sendJob", {data: data});
    }
  },
  mounted() {
    window.title = "Messages"
    if (this.code == "") {
      history.back();
    } else {
      this.connectSocket();
    }
    let vm = this;

    setTimeout(function () {
      console.log(vm.pusher.connection.state);
      vm.sendrequest();
    }, 1000);
  },
  unmounted() {
    this.pusher.disconnect();
  },
  components: {Loading, ItemMessage}
}
</script>
