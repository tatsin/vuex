import Axios from 'axios';



const state = {
    url:'https://jsonplaceholder.typicode.com/todos/',
    todos:[]
};

const getters = {
    allTodos : (state) =>{
        return state.todos
    }
  
};

const mutations = {

    setTodos : (state, todos ) => {  
        return (state.todos = todos)     
    },
    addTodo: (state,todo) => {
        return state.todos.unshift(todo)
    },
    updateTodo: (state,uptadedtodo) => {
       // return state.todos = uptadedtodo
       const index = state.todos.findIndex( todo => {
           return  todo.id === uptadedtodo.id
        })
        if(index !== -1){
            state.todos.splice(index, 1, uptadedtodo)
        }
    },
    mdeletTodo:(state, id ) => {
        
        //   return state.todos = state.todos.filter(
        //      item =>  item.id !== id  )
        const index = state.todos.findIndex(Element => Element.id===id)       
        //console.log(state.todos, 'id: ',id)
        state.todos.splice(index,1)
        console.log(state.todos)
         
    }


};

const actions = {

async deleteTodo( {commit} , id){
    await Axios.delete(`${state.url}${todo.id}`)
    commit('mdeletTodo', id)
    console.log( 'action id: ',id)
},    

async fetchTodos( {commit} ){
    const response = await Axios.get(state.url)
    commit('setTodos', response.data )
},

async filterTodos({commit}, limit){
    const response = await Axios.get(`${state.url}?_page=1&_limit=${limit}`)
    commit('setTodos', response.data )

},

async addTodo({commit}, newTodo){
    const response = await Axios.post(state.url, {

        title : newTodo,
        completed : false,
       

    })
  
    commit('addTodo', response.data, newTodo )

 },
 async completedTodo({ commit }, updatedTodo){
    //console.log('updatedTodo.completed :', updatedTodo.completed, 'updatedTodo.id :', updatedTodo.id)
    const response = await Axios.patch(`${state.url}${updatedTodo.id}` , updatedTodo)
   // console.log('updated response.data: ', response.data)
    commit('updateTodo', response.data  )
 }



};

export default{
   
    /*  
    state:state,
    mutations:mutations,
    getters:getters,
    actions:actions 

    */

     //with es6 if name same as value we can do this way 

     state,
     getters,
     mutations,
     actions

}