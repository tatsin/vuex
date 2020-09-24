<template>
  <div>
      <h3>nb products:::{{countProudcts}}</h3>
       
      <hr>
      <div class="input-field ">
        <input id="inputProduct" type="text" :class="input_product?'valid':'invalid'" 
          @keydown.enter="add_new_product" 
          v-model.trim="input_product">
          <label for="inputProduct">add new product</label>
          <br>
          {{msg}}
        </div>
       
  </div>
</template>

<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'

// import { mapState } from 'vuex'
// import { mapMutations } from 'vuex'
export default {
name:'testdifferentcompvuex',

data(){
    return{
        input_product:'',
        msg:''
    }
},
computed:{
    
    ...mapGetters(['countProudcts'])
    
},
methods:{
    ...mapActions(['add_product']),
       add_new_product: function(){

           if(this.input_product!==''){
                const new_product = {
                name:this.input_product,
                id:this.countProudcts+1,
               // price:40
            }    
            this.add_product(new_product)
            this.input_product = ''
            this.msg=''

           }else{
               this.msg="verify empty input"
           }
       

    },
   
},


}
</script>

