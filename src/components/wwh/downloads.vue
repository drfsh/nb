<template>
  <div class="main_body">
    <div v-if="data.length!=0 && !loading">
      <div class="mt-3 row pt-1 pb-5">
        <file-download v-for="(v,i) in data" :key="i+'file'" :data="v"></file-download>
      </div>
    </div>
    <div v-else style="margin-top: 70%;">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import FileDownload from "@/components/wwh/fileItems/file-download";
import Loading from "@/components/icon/loading";
export default {
  name: "downloadsD",
  components: {Loading, FileDownload},
  data(){
    return{
      loading:false,
      data:[{name:'name',url:'',type:'image'}],
      code: localStorage.codeDCD,
    }
  },
  methods:{
    getData(){
      let {data} = this.axios.post(window.url+'getFiles',{code:this.code})
      if (data['true']===true){
        this.data = data['data']
      }else {
        alert('error')
      }
    }
  },
  async mounted() {
    await this.getData()
    this.loading = false
  }
}
</script>

<style scoped>

</style>