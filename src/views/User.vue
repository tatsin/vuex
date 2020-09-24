<template>
   <div class="container">
  
    <ListUser/>
  </div>
</template>



<script>
import ListUser from '../components/ListUser'

export default {
    name : 'User',
    components: { 
         ListUser 
        }
}
</script>