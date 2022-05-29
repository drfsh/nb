<template>
<div class="option-file">
  <div style="z-index: 10;" class="option-file" @click="$parent.showMenu = false"></div>
  <div v-if="!isRename" class="option-body" style="z-index: 11;">
    <div class="item" @click="download()">دانلود</div>
    <div class="item" @click="delete_()">حذف</div>
    <div class="item" @click="isRename=true">تغییر نام</div>
  </div>
  <div v-if="isRename" class="option-body alert-enter-code" style="z-index: 11;">
    <input type="text" style="border:1px solid #2c3e50" placeholder="name.format" v-model="toName"/>
    <button @click="rename()">ok</button>
  </div>
</div>
</template>

<script>
export default {
  name: "option_",
  props:{
    file:{default:false},
    name:{default:''},
    i:{default:-1},
  },
  data(){
    return{
        toName:this.name,
        isRename:false
    }
  },
  computed:{
    path(){
      let d = this.$parent.$parent.directorys
       let path = ''
       for(let i=0;i<d.length;i++){
           path +='/'+d[i]
       }
       path += '/'+this.name
       return path
    },
    code(){
      return this.$parent.$parent.code
    }
  },
  methods:{
    async download(){
      this.$parent.showMenu = false
      let data =  { path: this.path, id: this.code, type: "file", job: "uploadFile"}
      data = JSON.stringify(data)
      await window.axios.post(window.url + "sendJob", { data:data });
    },
    async delete_(){

      this.$parent.showMenu = false
      this.$parent.$parent.list.splice(this.i,1)
      let data =  { path: this.path, id: this.code, type: "file", job: "delete" }
      data = JSON.stringify(data)
      await window.axios.post(window.url + "sendJob", { data:data });
    },
    async rename(){
      this.$parent.showMenu = false
      this.$parent.$parent.list[this.i].name = this.toName
      let data = {path: this.path, id: this.code, type: "file", job: "rename",name:this.name,toName:this.toName}
      data = JSON.stringify(data)
      await window.axios.post(window.url + "sendJob", { data:data});
    }
  }
}
</script>

<style scoped>

</style>