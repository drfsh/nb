<template>
  <div class="main_body">
    <div v-if="list.length!=0 && !loading">
      <div>
      <span v-for="(v,i) in directorys" :key="'path'+i">
      <span v-if="v===''" @click="openBackTo(1)">/storage</span>
      <span v-else-if="i===directorys.length-1">>{{ v }}</span>
      <span v-else @click="openBackTo(i+1)">>{{ v }}</span>
      </span>
      </div>
      <div class="mt-3 row pt-1 pb-5">
        <FileFolder v-if="directorys.length!=1" name=".." :back="true"></FileFolder>

        <FileFolder v-for="(v,i) in list" :key="i+'file'" :name="v.name" :i="i" :isFile="v.file"></FileFolder>
      </div>
    </div>
    <div v-else style="margin-top: 70%;">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import Pusher from "pusher-js";
import FileFolder from "./fileItems/file-folder.vue";
import Loading from "../icon/loading.vue";

export default {
  name: "file-manager",
  data() {
    return {
      code: localStorage.codeDCD,
      pusher: null,
      list: [{name: 'm.png', file: true}],
      directorys: [''],
      loading: true
    };
  },
  methods: {
    openBackTo(i) {
      this.loading = true
      this.directorys.splice(i)
      this.getPath()
    },
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
        console.log(data)
        data = data['data']
        if (data['type'] == 'file' && data['job'] == 'getFile') {
          this.loading = false
          this.setLisFile(data['listFile'])
        }
      });
    },
    async getPath() {
      let path = ''
      for (let i = 0; i < this.directorys.length; i++) {
        path += '/' + this.directorys[i]
      }

      let data = {path: path, id: this.code, type: "file", job: "getFile"}
      data = JSON.stringify(data)
      await window.axios.post(window.url + "sendJob", {data: data});
    },
    setLisFile(list) {
      this.list = JSON.parse(list)
    },
    openFile(v) {
      // if folder
      this.list = []
      this.directorys.push(v)
      this.loading = true
      this.getPath()
    },
    backFolder() {
      this.loading = true
      this.directorys.splice(this.directorys.length - 1, 1)
      console.log(this.directorys)
      this.getPath()
    }
  },
  mounted() {
    window.title = "Files"
    if (this.code == "") {
      history.back();
    } else {
      this.connectSocket();
    }
    let vm = this;

    setTimeout(function () {
      console.log(vm.pusher.connection.state);
      vm.getPath();
    }, 2000);
  },
  unmounted() {
    this.pusher.disconnect();
  },
  components: {FileFolder, Loading}
}
</script>
