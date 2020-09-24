<template>
  <div class="container">
      <div class="">
        <div class="left-align">

        <h3>{{ title | to-uppercase  }}</h3>

        <p>{{ description | truncate }}</p>
 


            
        <router-link to="/user">user </router-link>
        

      </div>
        <div class="right-align">
            <div class="switch">
                <label>
                Off
                <input  type="checkbox"  @click="disabled = !disabled"  >
                <span class="lever"></span>
                On
                </label>
            </div>
        </div>


      </div>
   
    
    <div class="row">
        <form class="col s12 "  ref="myForm"  :class="[disabled ? 'border_gray' : 'border_green']" autocomplete="off">
        <div class="row">
            <div class="input-field col s12">
            <i class="material-icons prefix">account_circle</i>
            <input id="name" type="text"    v-model="formData.name" :disabled="disabled">
            <label for="name">your name: {{formData.name}}</label>
            </div>
            <div class="input-field  col s12">


            <input id="age" type="number" v-model.number="formData.age" :disabled="disabled">
            <label for="age">Age</label>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s12 password-container">
            
            <i class="material-icons prefix" v-if="showPassword" @click="showPassword=!showPassword">visibility_off</i>
            <i class="material-icons prefix" v-else @click="showPassword=!showPassword">visibility</i>
            <input id="password" :type="showPassword ? 'password' : 'text' " v-model="formData.password" :disabled="disabled">
            <label for="password">Password</label>
            </div>

            <div class="input-field col s12 password-container">
            
            <i class="material-icons prefix" v-if="showPassword" @click="showPassword=!showPassword">visibility_off</i>
            <i class="material-icons prefix" v-else @click="showPassword=!showPassword">visibility</i>
            <input id="passwordconfirm" :type="showPassword ? 'password' : 'text' " v-model="formData.passwordConfirm" :disabled="disabled">
            <label for="passwordconfirm">Password Confirm</label>
            </div>
        </div>
        <div class="row">
            <p>
                <label>
                <input type="checkbox" name="fonction" value="worker" v-model="formData.fonction" :disabled="disabled"/>
                <span>worker</span>
                </label>
            </p>
            <p>
                <label>
                <input type="checkbox" name="fonction" value="student" v-model="formData.fonction" :disabled="disabled" />
                <span>student</span>
                </label>
            </p>
             <p>
                <label>
                <input type="checkbox" name="fonction" value="singer" v-model="formData.fonction" :disabled="disabled"/>
                <span>singer</span>
                </label>
            </p>
             <p>
                <label>
                <input type="checkbox" name="fonction" value="sailor" v-model="formData.fonction" :disabled="disabled"/>
                <span>sailor</span>
                </label>
            </p>


        </div>
        <div class="row">
            <label>
            
                <input name="color" class="with-gap" type="radio" value="red" v-model="formData.color" :disabled="disabled"/>
                <span>Red</span>
                
            </label>
            <label>
                
                <input name="color" class="with-gap" type="radio"  value="green" v-model="formData.color" :disabled="disabled"/>
                <span>green</span>
            </label>
        

        </div>
        <div class="row">
            
                <select  id="food" v-model="formData.food" >
                    <option value="" disabled selected>pick a food</option>
                    <option value="pizza">pizza</option>
                    <option value="misto">misto</option>
                    <option value="ma9rouna">ma9rouna</option>
                </select>
                
        </div>

    
        <div class="row">
            <div class="col s12">

            <div class="input-field ">
                <input id="email_inline" type="email" v-model="formData.email" :disabled="disabled" >
                <label for="email_inline">Email</label>
                <!-- <span class="helper-text" data-error="wrong" data-success="right">exemple@domaine.com</span> -->
            </div>
            </div>
        </div>
 
        </form>
   
    </div>
    <div class="divider"></div>
    <div class="col">
    
        <div>
            <button class="btn left"  @click.prevent="sendForm" :disabled="disabled" 
>send</button>
        
            <button class="btn right waves-effect waves-light modal-trigger" data-target="validateModalReset" :disabled="disabled">reset</button>

           
        </div>
        
    </div>
    
    <br><br><br>
    <div class="row">
        <div class="col s12 error" v-if="msgError.length">
            <ul>
                <li v-for="(error, index ) in msgError" :key="index">
                        {{index}}::{{error}}
                </li>
            </ul>
        </div>
    </div>
    <div v-if="valid" class="col s12">

        <ul class="collapsible">
            <li>
            <div class="collapsible-header"><i class="material-icons">filter_drama</i>format json from vue</div>
            <div class="collapsible-body"><span>{{formData}}</span></div>
            </li>
             <li>
            <div class="collapsible-header"><i class="material-icons">filter_drama</i>format json from localstorage</div>
            <div class="collapsible-body"><span>{{recupData}}</span></div>
            </li>
            <li>
            <div class="collapsible-header"><i class="material-icons">filter_drama</i>preview data from object with props</div>
            <div class="collapsible-body">
                <span>
                    <ul>
                        <li v-for="(val, propsee) in formData" :key="propsee">
                           {{propsee}} :: {{val}}
                        </li>
                    </ul>
                </span>
            </div>
                
                
            </li>
         
         
        </ul>

    </div>


    

    
    <!-- Modal Structure -->
    <div id="validateModalReset" class="modal bottom-sheet" ref="validateModalReset">
        <div class="modal-footer">
        <button class="btn left"  @click="resetForm()">you're sur to clear storage</button>
        <button class="btn right modal-close"  >cancel opned modal</button>
        </div>
    </div>

  </div>

  
</template>


<script>

// const modal = document.querySelector('#validateModalReset');
        


export default {
    mounted() {


    },
    created(){  
        this.$nextTick(() => {
           M.AutoInit();
           M.toast({html: 'alright !'})
    }); 
    this.recupData = localStorage.getItem('formulaire');          
    },
    
    data(){
        return{
           title:'lets try some data form',
           description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, cum nihil itaque error consectetur, quasi sit blanditiis dolore autem nam deserunt sunt suscipit. Amet aperiam, nam voluptatum cupiditate quasi veniam repellendus in explicabo excepturi natus possimus hic aliquam eveniet velit nostrum mollitia aut molestias sequi voluptate optio eius error! Ea officiis corrupti qui delectus eveniet esse quidem voluptas! Deleniti pariatur ea ex laboriosam sapiente, fuga perspiciatis, asperiores natus voluptatem hic aliquam saepe minima placeat minus reiciendis totam reprehenderit nobis. Voluptate ipsum ad maiores qui expedita corrupti magni quia numquam quisquam consequuntur amet modi aspernatur vero voluptas, et earum. Delectus pariatur odio eius veritatis deserunt exercitationem nam dolorum neque unde at adipisci quae excepturi laborum a distinctio, ut nemo mollitia est aperiam itaque inventore doloremque reprehenderit? Ab, laboriosam! Ex sint odit quia commodi facilis aperiam dicta eveniet, molestias dolorum? Minus esse necessitatibus quisquam id vitae quo modi consectetur atque doloremque! Hic iure quas, beatae ducimus odit sequi aliquid debitis animi quaerat exercitationem? Totam assumenda obcaecati id rerum libero excepturi aut, dignissimos impedit possimus at quibusdam commodi consequatur tenetur quisquam odit, mollitia esse? Quisquam tenetur iure sint quos autem dicta adipisci expedita, quidem exercitationem fugiat nemo voluptas at debitis. Tempore, veniam praesentium?',
           formData:{
                id:null,
                name:'',
                age:'',
                password:'',
                passwordConfirm:'',
                email:'',
                color:'',
                fonction:[],
                food:[]
           },
           form:'',
           localStorage:'',
           submitted :false,
           onoff:'',
           disabled:true,
           msgError:[],
           valid:true,
           recupData:'',
           showPassword:false
        }
    },

    methods:{

      
        sendForm(){
                this.msgError=[]

                if(this.formData.name === '' || this.formData.name.length  <= 5 ){
                    this.msgError.push(`name width ${this.formData.name.length} charactars must be > 5 `);
                    this.valid = false;
                   // this.formData.name.classList.add('invalid');
                }  if(this.formData.age === '' || this.formData.age.length === 0 ){
                    this.msgError.push('age required must be > 0')  
                    this.valid = false
                }  if(this.formData.password === ''){
                    this.msgError.push('password required') 
                    this.valid = false
                }   if(this.formData.password !== this.formData.passwordConfirm){
                    this.msgError.push('password dont match') 
                    this.valid = false
                }   if(this.formData.email === ''){
                    this.msgError.push('email required') 
                    this.valid = false
                }  if ( !this.validEmail(this.formData.email)){
                    this.msgError.push('check email syntaxe')  
                    this.valid = false
                } else {
                    this.valid = true
                }
         
                if(this.valid){
                    this.formData.id = Date.now(); 
                    let resultForm = JSON.stringify(this.formData)    
                    localStorage.setItem('formulaire', resultForm);
                    console.log({date:this.formData.id})
                    this.$refs['myForm'].reset();
                
                }
            
        

        },
        resetForm(){
            this.$refs['myForm'].reset();
            this.formData.name='';
            localStorage.clear();
            M.Modal.getInstance(this.$refs['validateModalReset']).close();
            this.msgError=[];
            this.recupData
          
        },
         validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
         
            }

    }
}
</script>

<style lang="scss" scoped>



form{

    p  
        {
        display: block;
        margin-right: 15px;
        span{
            padding-left: 25px !important

        }

    }
    &.border_gray{
        border:dashed 1px #F1F1F1;
    }
    &.border_green{
        border:dashed 1px #26a69a;
    }

    .password-container{
        i{
        cursor: pointer;
        }
    }
}
</style>