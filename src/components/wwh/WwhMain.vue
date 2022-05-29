<template>
  <div class="main_body">
    <EnterCode v-if="code===''"></EnterCode>
    <div v-else>
      <div class="mt-3 row">
        <ItemFiles></ItemFiles>
        <ItemContacts></ItemContacts>
        <ItemInfo></ItemInfo>
        <ItemMessages></ItemMessages>
      </div>
    </div>
  </div>
</template>

<script>
import EnterCode from "@/components/wwh/EnterCode";
import ItemFiles from "./items/item-files.vue";
import ItemContacts from "./items/item-contacts.vue";
import ItemInfo from "./items/item-info.vue";
import ItemMessages from "./items/item-messages.vue";
export default {
  name: "WwhMain",
  components: { EnterCode, ItemFiles, ItemContacts, ItemInfo, ItemMessages },

  data(){
    return{
      code:'',
    }
  },
  methods:{

  },
  mounted() {
      window.title = "Device"
    if(localStorage.codeDCD!=undefined){
      this.code = localStorage.codeDCD
    }
  },
  watch:{
   
  },
  unmounted(){
    
  }
}
</script>

<style scoped>

</style>