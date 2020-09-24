import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos.js'


Vue.use(Vuex)

export default  new Vuex.Store({


    strict:true,   
    modules:{
        todos
    },
    //state : SIMPLE DATA 
    state: {
            name:'yassine',
            age:16,
            products:[
                {
                    id : 1,
                    name : "Nike",
                    price : 130,
                },
                {
                    id : 2,
                    name : "Reebok",
                    price : 80
                },
                {
                    id : 3,
                    name : "Adidas",
                    price : 60
                },
                {
                    id : 4,
                    name : "Puma",
                    price : 80
                },
                {
                    id : 5,
                    name : "filas",
                    price : 20
                },

            ],
            ct:4,
            listPosts:[

            ],
            
          },// end state 

    //getters to acces data 

    getters:{


        getAge : state => {
            return state.age * 2
        },

        countProudcts : function(state){
            return state.products.length
        },
        listProducts: function(state){
            return state.products
        }
      


    },// end getters

    mutations:{

        ADD_PRODUCT: (state, product) => {
            state.products.push(
              product
            )
        },

        REMOVE_ALL:function(state){
            state.products = []
        },
          /*  REMOVE_PRODUCT: (state, product)=>{
            state.products.splice(product,1)
            
        }, */
        REMOVE_PRODUCT: (state, product) => {
            state.products = state.products.filter(item => {
               return item.id !== product.id
            
            } )
            
        },

    },

    actions:{

        remove_product:function({commit} , product){
            commit('REMOVE_PRODUCT' , product);
            console.log('55r5e')
        },
        add_product:function(context,product){
            context.commit('ADD_PRODUCT' , product);
        },
        remove_all:function(context){
            context.commit('REMOVE_ALL')
        }


        
    },


    data(){
        return{
            ct:4
        }
    }
  

 

})


