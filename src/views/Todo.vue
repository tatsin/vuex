<template>
  <div class="container">
       

     <p v-text="content"></p>
        <ul class="collection">
            <transition-group 
                enter-active-class="animate__animated animate__fadeIn" 
                leave-active-class="animate__animated animate__fadeOutLeft"
            >
                <li class="collection-item avatar " v-for="(person, index) in persons" v-bind:key="index">
                        <i class="material-icons circle green">person</i>
                        <div class="left">
                                <ul>
                                    <li >
                                    id:{{person.id}}
                                    </li>
                                    <li>
                                    {{person}}
                                    </li>
                                    <li>
                                        {{person.age}}
                                    </li>
                                    <li>
                                        {{person.role}}
                                    </li>
                                </ul>
                        </div>
                            <div class="d-inline-block right">
                                <a href="#!" @click="toggle = !toggle" title="star">
                                    <i class="material-icons" :class="[toggle?'green-text':'grey-text']">grade</i>
                                </a>
                                <a href="#!" @click="removeThisUser(index)" title="delete">
                                    <i class="material-icons grey-text">delete</i>
                                </a>
                            </div>
                </li>

            </transition-group>
        
        
        </ul>
     <input type="text" v-model.trim="form.inputUserName"    class="browser-default"  :class="gestionClassStatus" />



     <button class="btn" 
     @click="addUser()" 
     :disabled="form.inputUserName.length < 5 "
     >add user</button>

     <button class="btn right" 
     v-if="persons.length > 1"
     @click="removeUser(person.id)"
     
     >remove last user</button>

    <drop-down  :disabled="!form.inputUserName"  @update:option="DropDownResult" />
     optionSelected from chil with $emmit :: {{optionSelected}}
    
    
     <ul class="collapsible" v-if="xx !== 'error' ">
         
            <div class="progress"  v-if="!loading">
                <div class="indeterminate"></div>
            </div>
        
          
         <li v-else v-for ="(value, props) in xx " :key="props"> 
                <div class="collapsible-header">
                    <i class="material-icons">place</i>{{value.code}}
                    </div>
                <div  class="collapsible-body">
                    <div v-for ="(value2, props2) in value " :key="props2">
                        {{props2}} : {{value2}}
                    </div>
                </div>
        </li> 
     </ul>
     

    
  </div>

</template>

<script>

import DropDown from '../components/childCompononts/DropDown.vue';
//import axios from 'axios';

export default {
name: 'Todo',
components:{
'drop-down' : DropDown
},

data() {
return {
    loading:false,
    xx:'',
    empty: false,
    toggle: true,
    optionSelected:'',
    content:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, obcaecati.',

    persons: [
                {   id:'354654654',
                    name: "yassine",
                    age: 30,
                    role: "admin"
                },
                {   id:'544646',
                    name: 'yassine2',
                    age: 30,
                    role: "admin"
                },
                    {  id:'65464654', 
                    name: 'yassine3',
                    age: 30,
                    role: "simple user"
                },
    ],

    fiche : {
            id:'354654654',
            name: "jhon",
            age: 55,
            role: "superadmin"
    },
    contentObject:'',
    form: {
        inputUserName:''
    },
    
}
    
},
methods: {


    alertt(value){
        return alert(value)
    },
    DropDownResult(value){
        this.optionSelected = value
        console.log({value:value})
        console.log({ optionSelected:this.optionSelected})
        
    },
    addUser() {
        const objForm = {  
                            id   : this.dateeNow , 
                            name : this.form.inputUserName,
                            role : this.optionSelected
                        }

        this.persons.push(objForm);
        this.form.inputUserName = ''; 
        //add object user to local storage
        let adduser = JSON.stringify(this.persons);  
        localStorage.setItem('user', adduser);

        
    },
    removeUser() {
        this.persons.pop(this.form.inputUserName);
        this.form.inputUserName = '';

        
    },
    removeThisUser(indexUser) {
        this.persons.splice(indexUser, 1);
    }

    
},

computed: {
    gestionClassStatus: function(){
         return{
             'invalid' : this.disabled,
             'valid': !this.disabled
         }

    },

    dateeNow: function(){
        return  Date.now();
        //console.log(x)
    }

},
mounted (){

    const vm = this;
    
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(  (response) =>  {

          this.xx = response.data.bpi;

      })
      .catch(error =>{
           console.log(error)
           this.xx ='error';
           console.log('loading false')
      })
      .finally(
          () => {
              console.log('loading true')
              this.loading = true

          })

          
},


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