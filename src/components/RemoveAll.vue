<template>
  <button class="btn" @click="removeAll" :disabled="countProudcts===0">
      remove {{countProudcts}} products
  </button>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
name:"RemoveAll",
methods:{
    
    ...mapActions(['remove_all']),
    removeAll:function(){
        this.remove_all()
        
    }
},
computed:{
...mapGetters(['countProudcts']),

}

}
</script>

<style>

</style>