<template>
  <div  class="container">
      
      <filter-todos/>
      <add-todo />
      <ul class="collapsible">
        <li v-for="todo in allTodos" :key="todo.id">
            <div class="collapsible-header" > 
                <i class="material-icons" :class="{'star_completed':todo.completed}"
                @click.stop="updateCompleted(todo)" 
               
                >
                star</i>
                 {{todo.id}}:: {{todo.title | shortText}}
                  <!-- <button class="remove btn" @click="remove_item(index)" >remove</button> -->
                  <button class="remove btn" @click.stop="removeTodo(todo.id)" >remove</button>
            </div>
            <div class="collapsible-body">
                <p v-green>completed::{{todo.completed}}</p>
                <p @dblclick="updateCompleted(todo)" class="text textedit_on" :class="{'textedit_of':todo.completed}">{{todo.title}}</p>
                
            </div>
        </li>
    </ul>

  </div>
</template>

<script>

import filterTodos from '../components/filterTodos.vue'
import addTodo from '../components/addTodo.vue'
import {  mapGetters, mapActions } from 'vuex'


export default {

directives:{
   green:function(el){
       el.style.color="green"
   } 
},    
filters: {
    shortText:function(text){
        return text.substring(0,5)+'...'
    }
},
name:"vuexaxios",
components:{
     'filter-todos' : filterTodos,
     'add-todo' : addTodo
},
data(){
    return{
       
    }
},


methods:{
...mapActions(['fetchTodos','completedTodo','deleteTodo']),

updateCompleted: function(todo){

    const updatedtodo = {
        completed : !todo.completed,
       // title: todo.title,
        id: todo.id
    }
    this.completedTodo(updatedtodo)
  
},
removeTodo:function(id){

this.deleteTodo(id)


},

test:function(){
console.log('hhhhhh')
}

},
computed:{
...mapGetters(['allTodos'])

},

created(){
    
    this.fetchTodos()

  
    this.$nextTick(() => {
    M.AutoInit();
        
    });
    //console.log(this.allTodos)

},

}
</script>

<style lang="scss" >

.collapsible{
    .remove{
    margin-left: auto;
    }
   
}
.star_completed{
    color :lightgray
}
.text{user-select: none; cursor: text;}
.textedit_on{ font-weight: bold;}
.textedit_of{ font-weight:normal; text-decoration: line-through;}
</style>