<template>
  <div class="container">
      <h3>name from store :: {{namefromstore}}</h3>
        <div class="row">
            <div class="col s12">
                <form  autocomplete="off" @submit.prevent>

                <div class="input-field ">
                    <input id="inputMail"
                    ref="inputMail"
                    type="email" 
                    v-model="email" 
                    :input="validEmail(email)"
                    :class="[valideexpression ? 'valid': 'invalid']"
                
                        
                    
                    />
                    <label for="email_inline" >Email</label>
                
                </div>
                
                <div class="input-field ">
                    <input id="nameID"
                    type="text" 
                    v-model.trim="name"
                    :input="isEmpty(name)"
                    :class="[isempty ? 'valid': 'invalid']"
                
                    />
                
                <span class="helper"> <label for="nameID" >name must be >{{name.length}} and contains 'please'</label></span>
                </div>

                <div class="input-field ">
                    <input id="age"
                    ref="inputage"
                    type="number" 
                    v-model.number="age" 
                    v-bind:class="{valid:validAge}"
                    v-bind:style="{borderLeft:'1px solid red'}"
                    v-bind:input="age.value==2 ? validAge=true : validAge=false"
                  
                
                        
                    
                    />
                    <label for="email_inline" >age</label>
                
                </div>
            </form>
                
             <button class="btn"  @click="console()" :class="[ !valideexpression || !isempty ? 'disabled':'' ]" >
                 validate mail</button>
                 <br>
            
            </div>
        </div>

  </div>
</template>

<script>


export default {


mounted() {
    
this.$nextTick(() => {
    M.AutoInit();
    M.toast({html: 'alright !'})
})
},
  name: 'Home',
  data(){
      return{
          age:'',
          email:'',
          valideexpression:'',
          name:'',
          isempty:'',
          validAge:''
          
      }
  },
  methods:{

    validEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     let vv = re.test(email);
    if(vv){
        this.valideexpression =true
        /* this.$refs.inputMail.classList.add('valid')
        this.$refs.inputMail.classList.remove('invalid') */
    }else{
       /*  this.$refs.inputMail.classList.add('invalid')
        this.$refs.inputMail.classList.remove('valid') */
        this.valideexpression =false
    }

  },
  isEmpty(val){
      if(val.length > 15 && val.includes("please")){
        this.isempty=true
      }else{
        this.isempty=false
          
      }
  }

  }, // end methods
  computed:{

      

      namefromstore(){
          return this.$store.state.name
      }
  }

  
 
}

</script>
