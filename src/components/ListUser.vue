<template>
  <div>
          <div class="row">
             <div class="col xs12 sm6">
                <button class="btn right" 
                @click="orderbyNameup()" :disabled="comparison === 1"
                
                > asc</button>
                 <button class="btn right" 
                @click="orderbyNamedown()" :disabled="comparison === -1"
                
                >dsc</button>

                <button class="btn" @click="order()">
                    
                    
                    <i v-if="comparison === -1" class="material-icons" >file_upload</i>
                    <i v-else class="material-icons">file_download</i>
                </button>
             </div>
         </div>
         {{urlPram._page}} out of {{totalPage}} ordered {{comparison}}

        <div class="input-field col ">
             <i class="material-icons prefix">loop</i>
             <input  id="find" type="text" v-model.trim="inputsearchvalueuser" autocomplete="off" @keyup="find2($event)">
            <label for="find">Search a username</label>
        </div>
        <button class="btn" @click="find2()"> find</button>
        <ul class="collection ">
           <transition-group mode="out-in" 
           enter-active-class="animate__animated animate__fadeIn " 
           leave-active-class="animate__animated animate__fadeOutLeft ">
            <li class="collection-item avatar" v-for="(user, indexUser) in users"  :key="indexUser" >
                    <i class="material-icons circle green">person</i>
                <div class="left">
                    <ul>
                        
                        <li>
                        id:{{user.id}}
                        </li>
                         <li>
                        name: {{user.name}}
                        </li>
                        <li>
                        username: {{user.username}}
                        </li>
                        <li>
                        email: {{user.email}}
                        </li>
                        <li>
                        phone: {{user.phone}}
                        </li>
                         <li>
                        faved: {{user.favered}}
                        </li>
                    </ul>
                </div>
                <div class="d-inline-block right">
                    <a href="#!" @click="faveThisUser(user.id)" >
                        <i class="material-icons" :class="[user.favered ?'green-text':'grey-text']" >grade</i>
                        
                    </a>
                    <a href="#!" @click="removeThisUser(user.id)" >
                        <i class="material-icons grey-text">delete</i>
                    </a>
                </div>
            </li>
           </transition-group>
        </ul>
        

        
       <div v-if="urlPram._page <= totalPage ">
            <button class="btn" 
            @click="previous()" 
            :disabled="urlPram._page <= 1"
        
            >previous</button>

            <button class="btn right" 
            @click="next()"
            :disabled="totalPage <= urlPram._page"
            >next</button>

            <div class="divider"></div>
            <br><br>

            <div v-for="(btn, index) in totalPage" :key="index" >
                <button class="btn left" @click="getUserBTN(index+1)" :disabled="urlPram._page === index+1"> page:{{index+1}}</button>
            </div>
        </div>

        <br><br><br>
        <div class="hide">
            <div class="input-field col ">
                <i class="material-icons prefix">loop</i>
                <input  id="search" type="text" v-model.trim="inputsearchvalue" autocomplete="off">
                <label for="search">Search</label>
            </div>
            <ul class="collection ">
                <li class="collection-item " v-for="(newuser, indexUser) in usersfindnewtable"  :key="indexUser" >
                    {{newuser.username}}
                </li>
            </ul>
        </div>   
      

  
  
  
  
  
  
  </div>
</template>

<script>


//users?_start=0&_limit=1

export default {

name : 'ListUser',

data(){
    return { 
        inputsearchvalueuser:'',
        inputsearchvalue:'',
        ascdsc:false,
        faveredColor:{
            'green-text': true,
            'grey-text' : false
        },

        favered : false,
        toggle  : [],
        users   : [],
        users2  : [],
        nbuser  : 1,
        url     : 'https://jsonplaceholder.typicode.com/users',
        url2    : 'https://jsonplaceholder.typicode.com/users?_page=1&_limit=',
        urlPram:{
            _page: 1,
            _limit: 3,
           // currentPage:'',
            username: null,
           
        },
        pagination:{
            next:'',
            prev:''
        },
        totalPage:'',
        comparison:1,
        username:''
     
        
    }
},
methods:{


   // order name
     compare(a, b) {
            const A = a.username.toUpperCase();
            const B = b.username.toUpperCase();

            let comparison 
            if (A > B) {
                comparison = 1;
            } else if (A < B) {
                comparison = -1;
            }
             return this.comparison = comparison;
             //console.log(comparison)
            
            },
            compareModerne(){
       
            }, 

    //filter function
        orderbyNameup(){

            this.users.sort(this.compare) 
            console.log(this.comparison)
            this.comparison = 1
           

        },
        orderbyNamedown(){

            this.users.sort(this.compare).reverse()
            console.log(this.comparison)
            this.comparison = -1
            

        },
        order(){
          
            if( this.comparison === -1){
                this.orderbyNameup()
               // this.comparison === 1
            } else {
                this.orderbyNamedown()
               // this.comparison === -1
            }
           
        },



    //fetch function
        getUser(){
            //console.log(this.urlPram._limit)
            axios
                .get(this.url, {params: this.urlPram})
                .then( (response) => {
                   
                    console.log(response.data)
                    this.totalPage = Math.ceil(response.headers["x-total-count"] / this.urlPram._limit) ;      
                    this.users  =  response.data.map( element => 
                        (
                            {...element, favered: ''})
                        )
                        
                    // console.log(this.users )
                })
                .catch( (error) => console.log(error) )
                .finally()
            // this.order();

        },
        removeThisUser(idUser){
            const element = this.users.find( (el) => {
                return el.id === idUser
            })
            const x = this.users.indexOf(element);
            
            this.users.splice(x, 1);
        

            
            
            console.log(element);
            
        },
        faveThisUser(idUser){

            //this.users[value].favered = true;
            console.log(idUser)
                const element = this.users.find( (el) => {
                    return el.id === idUser
                })
                
                const x = this.users.indexOf(element);
                console.log(idUser, 'son index:'+ x)

                this.users[x].favered=!this.users[x].favered

        
        },
        next(){

            ++this.urlPram._page;
            
            this.getUser();
            console.log(this.totalPage)
            
        },
        previous(){

                --this.urlPram._page;
                this.getUser();
                console.log(this.totalPage)
                
        },
        
        getUserBTN(page){
     
            this.urlPram._page = page
            axios
                .get(this.url, {params: this.urlPram})
                .then( (response) => {
                    console.log(this.totalPage)
                    this.users  =  response.data.map( element => 
                        (
                            {...element, favered: ''})
                        )
                    
                })
                .catch( (error) => console.log(error) )
                .finally()

                
                console.log('after axios',this.nbuser)
        },
        find(){
              
             this.users =  this.users.filter( (element) => {
             return element.username.toUpperCase().match(this.inputsearchvalueuser.toUpperCase())


        })
        
         },

         find2(event){
                this.urlPram._page = 1
                console.log(this.users)
             if (this.inputsearchvalueuser === '') {
                 this.urlPram.username = null;
             } else {
                this.urlPram.username = this.inputsearchvalueuser; 
                console.log(this.urlPram.username )
             }
            this.getUser();   
           /* axios
                .get(this.url+'?username='+this.inputsearchvalueuser)
                .then( (response) => {
                    
                    console.log(response.data)
                    this.totalPage = Math.ceil(response.headers["x-total-count"] / this.urlPram._limit) ;      
                    this.users  =  response.data.map( element => 
                        (
                            {...element, favered: ''})
                        )
                        
                    // console.log(this.users )
                })
                .catch( (error) => console.log(error) )
                .finally()
            */
         },

    

   
},
watch:{

},
computed:{

    usersfindnewtable: function(){

            return  this.users2.filter( (element) => {
            return  element.username.toUpperCase().match(this.inputsearchvalue.toUpperCase())
        
        }) 

    },
    
    

 
},
mounted(){

    this.getUser();
    //this.order();
    
    },


created(){

    axios
            .get(this.url)
            .then( (response) => {
                
                
              //  this.totalPage = Math.ceil(response.headers["x-total-count"] / this.urlPram._limit) ;      
                this.users2  =  response.data.map( element => 
                    (
                        {...element, favered: ''})
                    )
                    
                   // console.log(this.users )
            })
            .catch( (error) => console.log(error) )
            .finally()
           // this.order();
}

}


</script>

<style lang="scss">
    .d-inline-block {
        display: inline-block;
    }
    .collection-item {
    display: flow-root;
    }

    input.browser-default{
        color: #000;
        border: none;
        width: 100%;
        display: block;
        padding: 0;
        border-bottom: 1px solid #e2e0e0;
        outline: transparent;
        margin-bottom: 10px;
        transition: 1s all ease-in;
        &:focus, &:focus-within{
            border: none;
            border-bottom:1px solid #000;
        }
        &.valid{
        border-bottom: 1px solid green 
        }
        &.invalid{
        border-bottom: 1px solid red 
        }
    }
</style>