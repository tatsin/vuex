<template>
 
     <form @submit.prevent="addNewTodo"> 
        <div class="input-field col s12">
                <i class="material-icons prefix">account_circle</i>
                <input id="todo" type="text" v-model.trim="inputAddNewTodo" ref="inputAddNewTodo" autocomplete="off">
                <label for="todo">add new todo </label>
        </div>
    </form>
 
</template>

<script>
import {mapActions} from 'vuex'
export default {
name:'addTodo',
data(){
    return{
        inputAddNewTodo:''
    }
},
methods:{
    ...mapActions(['addTodo']),
    addNewTodo:function(){
        this.addTodo(this.inputAddNewTodo)
        console.log(this.inputAddNewTodo)
        this.inputAddNewTodo=''
    }
},

}
</script>

<style>

</style>