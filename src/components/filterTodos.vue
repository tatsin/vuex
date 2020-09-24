<template>
  <div class="row s6">
      <select v-model="choice" @change="filterTodosComp">
          <option value="" disabled selected>nombre to display</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
      </select>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
export default {
name:'filterTodos',
data(){
    return{
        choice:''
    }
},
methods:{
    ...mapActions(['filterTodos']),
    // optionSelected:function(){
    //     console.log(this.choice*2)
    // },
    filterTodosComp:function(){

        this.filterTodos(this.choice)
    }
},
created(){  
        this.$nextTick(() => {
           M.AutoInit();
          
    }); 
    }
}
</script>

<style>

</style>