<template>
  <div>

      
       <nav>
        <div class="nav-wrapper">
        
        <ul id="nav-mobile" class="right hide-on-small-and-down">
            <li><router-link to="/" >Home</router-link> </li>
            <li><router-link to="/form">form </router-link> </li>
            <li><router-link to="/user">user </router-link></li>
            <li><router-link to="/todo">toddo </router-link></li>
            <li><router-link to="/search">search </router-link></li>
            <li><router-link to="/vuex">vuex </router-link></li>
            <li><router-link to="/vuexaxios">vuex axios </router-link></li>
            
            <li>    
                <i class="material-icons prefix" v-if="night" @click="night=!night">brightness_4</i>
                <i class="material-icons prefix" v-else @click="night=!night">brightness_5</i>
            </li>    
        </ul>

        </div>
    </nav>

    <main :class="{'bg_night':night}">
        <transition name="fade" mode="out-in"> 
             <router-view />
        </transition>
    </main>
  </div>
</template>

<script>




export default {

  name: 'App',

  components: {
    
  },

  data: () => ({
    night:false
  }),

  watch:{
     night:function(){
          localStorage.setItem("nightkeystorage", JSON.stringify(this.night))
          //console.log({night:this.night})
     }
  },
  created(){
      this.night = JSON.parse(localStorage.getItem("nightkeystorage"))

  }

   
}
</script>

<style lang="scss">

.fade-enter, .fade-leave-to{
/* animation:fadeIn 10s ease-in */
opacity: 0;
transform:translateX(2em);
}
.fade-enter-active, .fade-leave-active{

transition: all .5s ease;
}



nav{
    .material-icons{
        cursor: pointer;
    }
}

main{
    &.bg_night{
        background: #000;
        color: #fff;

        form{
            color:#fff ;
            input{
                color:#fff
            }
        }
    }
}
    nav{
        display: flex;
        justify-content:space-evenly;
    }
</style>
