<template>
  <div class="col-12 p-0">
      <div class="menu-main-item files" >
        <div @click="open()" class="name m-0" style="padding: 3px 12px;">
          <div>number : {{name}}</div>          
          <div>text : {{text}}</div>      
        </div>
      </div>

  </div>
  <Option v-if="showMenu" :file="isFile" :name="name" ></Option>
</template>

<script>
import Option from './option.vue';
export default {
    name: "item-message",
    components: {  Option},
    props:{
      name:{default:'file'},
      text:{default:'wellcome to telegram \n code : 505486'},
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