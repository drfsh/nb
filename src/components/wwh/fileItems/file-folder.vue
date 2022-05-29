<template>
  <div class="col-12 p-0">
      <div class="menu-main-item files" >
        <div @click="open()">
          <span class="d-flex ml-1" style="align-items: center;justify-content: center;box-shadow: 0 2px 13px -8px #0000007d;background: white;border-radius: 22px;padding: 4px;width: 30px;height: 30px;">
            <IconFolder v-if="isFile==false" color="#344354" width="17"></IconFolder>
            <IconFile v-else-if="isFile==true && type!=='image' && type!=='video'" color="#344354" width="17"></IconFile>
            <IconVideo v-else-if="isFile==true && type==='video'" color="#344354" width="17"></IconVideo>
            <IconImg v-else-if="isFile==true && type==='image'" color="#344354" width="17"></IconImg>
          </span>
        </div>
        <div @click="open()" class="name text-l m-0" style="max-width: 80%;padding: 3px 12px;">
          <span>{{name}}</span>          
        </div>
        <span class="bg-icon" style="transform: rotate(90deg);width: 30px;height: 30px;" @click="menu()">
          <IconDats></IconDats>
        </span>
      </div>

  </div>
  <Option v-if="showMenu" :file="isFile" :name="name" :i="i"></Option>
</template>

<script>
import IconDats from '@/components/icon/icon-dats.vue';
import IconFolder from '@/components/icon/icon-folder.vue';
import IconFile from '@/components/icon/icon-file.vue';
import IconVideo from '../../icon/icon-video.vue';
import Option from './option.vue';
import IconImg from '@/components/icon/icon-img.vue';
export default {
    name: "file-folder",
    components: { IconDats, IconFolder, IconFile, IconVideo, IconImg, Option},
    props:{
      name:{default:'file'},
      isFile:{default:false},
      back:{default:false},
      i:{default:-1},
    },
    data(){
      return{
        type:'',
        showMenu:false
      }
    },
    mounted(){
      let name = this.name.split('.')
      let type = name[name.length-1]
      switch(type){
        case "png":
        case "jpg":
        case "jepg":
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
        if (this.back){
          this.$parent.backFolder()
          return
        }
        console.log("open");
        if(this.isFile==false)
          this.$parent.openFile(this.name)
        else{
          this.showMenu = true
        }
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