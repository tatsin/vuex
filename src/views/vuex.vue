<template>
  <div class="container">
      <different-comp />
      <remove-all />
      

      <button class="btn">triDSC</button>
      <button class="btn">triASC</button>
<hr>
    <ul class="collapsible">
        <li v-for="(product, index) in listProducts" :key="index">
            <div class="collapsible-header"><i class="material-icons">person</i>
                 {{product.id}}:: {{product.name}}
                  <!-- <button class="remove btn" @click="remove_item(index)" >remove</button> -->
                  <button class="remove btn" @click="remove_item(product)" >remove</button>
            </div>
            <div class="collapsible-body">
                {{product.name}}<br>
                {{product.price}}
            </div>
        </li>
    </ul>
  
    
   
  </div>
</template>

<script>
import RemoveAll from '../components/RemoveAll.vue'


import testdifferentcompvuex from './testdifferentcompvuex.vue'
import { mapMutations, mapActions,mapState, mapGetters } from 'vuex'


export default {

name:"vuex",

components:{
   'different-comp' : testdifferentcompvuex,
   'remove-all': RemoveAll,
  
},
data(){
    return{
   
    }

},

methods:{

...mapActions(['remove_product']),

remove_item: function (product)  {
   // console.log(this.listProducts.id)
     this.remove_product(product);
    
}

 
},

mounted(){

         
        this.$nextTick(() => {
        M.AutoInit();
                
        });
        console.log(this.listProducts)

},

computed:{
//    return this.$store.state.products
 ...mapGetters(['listProducts']),
 ...mapState(['age'])
 },




      

} // end export default
</script>

<style lang="scss" >

.collapsible{
    .remove{
    margin-left: auto;
    }
   
}

</style>