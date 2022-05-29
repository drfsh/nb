<template>
  <div class="col-12 p-0">
      <div class="menu-main-item files" >
        <a :href="data.url">
          <div>
          <span class="d-flex ml-1" style="align-items: center;justify-content: center;box-shadow: 0 2px 13px -8px #0000007d;background: white;border-radius: 22px;padding: 4px;width: 30px;height: 30px;">
            <IconFile v-if="data.type!=='image' && data.type!=='video'" color="#344354" width="17"></IconFile>
            <IconVideo v-else-if="data.type==='video'" color="#344354" width="17"></IconVideo>
            <IconImg v-else-if="data.type==='image'" color="#344354" width="17"></IconImg>
          </span>
          </div>
        </a>
        <a :href="data.url" style="max-width: 80%;">
          <div class="name text-l m-0" style="padding: 3px 12px;">
            <span>{{data.name}}</span>
          </div>
        </a>
        <span class="bg-icon" style="transform: rotate(90deg);width: 30px;height: 30px;" @click="menu()">
          <IconDats></IconDats>
        </span>
      </div>

  </div>

</template>

<script>
import IconDats from '@/components/icon/icon-dats.vue';
import IconFile from '@/components/icon/icon-file.vue';
import IconVideo from '../../icon/icon-video.vue';
import IconImg from '@/components/icon/icon-img.vue';
export default {
    name: "file-download",
    components: { IconDats, IconFile, IconVideo, IconImg},
    props:{
      data:{default:{}},
    },
    data(){
      return{
        type:'',
        showMenu:false,
      }
    },
    mounted(){
      let type = name[name.length-1]
      switch(type){
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
          this.type = "image"
          break
        case "mp4":
        case "mkv":
          this.type = "video"
          break
        default : 
          this.type = "file"
          break
      }

    },
    methods:{
      open(){
        console.log("open");
      },
      menu(){
        console.log("menu");
        this.showMenu = !this.showMenu
      }
    }
}
</script>

<style scoped>

</style>