<template>
  <div class="col-12 p-0">
      <div class="menu-main-item files" >
        <div @click="open()">
          <span class="d-flex ml-1" style="align-items: center;justify-content: center;box-shadow: 0 2px 13px -8px #0000007d;background: white;border-radius: 22px;padding: 4px;width: 30px;height: 30px;">
            <IconFile color="#344354" width="17"></IconFile>
          </span>
        </div>
        <div @click="open()" class="name text-l m-0" style="max-width: 80%;padding: 3px 12px;">
          <div>name : {{name}}</div>          
          <div>number : {{number}}</div>          
        </div>
      </div>

  </div>
  <Option v-if="showMenu" :file="isFile" :name="name" ></Option>
</template>

<script>
import IconFile from '@/components/icon/icon-file.vue';
import Option from './option.vue';
export default {
    name: "item-contact",
    components: { IconFile, Option},
    props:{
      name:{default:'file'},
      number:{default:'0916432474'},
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
        console.log("open");
        if(this.isFile==false)
          this.$parent.openFile(this.name)
        else{
          this.$alert('sadsf')
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