<template>
    <div class="row">
        <div class="input-field col m6">
            
            <select v-model="choice" @change="optionSelected">
                <option value="" disabled selected>Choose your role</option>
                <option value="simpleUser">simple user</option>
                <option value="superUser">super user</option>
                <option value="admin">admin</option>
            </select>
            
            
        </div>
        <div class="col m3">
            <div class="right">{{choice}}</div>
        </div>
    </div>

 
</template>

<script>


export default {
name:'DropDown',
data(){
    return{
        choice:null
    }
},
methods:{
    optionSelected(){
        this.$emit('update:option', this.choice)
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