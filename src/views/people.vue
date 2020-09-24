<template>
    <article class="container">
        <h1>name: {{resultPeopleFiche.name}}</h1>
        <div v-for="(value, index) in resultPeopleFiche" :key="index">
            {{index}}::{{value}}
        </div>
    </article>
</template>

<script>
export default {

data(){
    return{
       url:'https://swapi.dev/api/people/',
       id:this.$route.params.id,
       resultPeopleFiche:{}
    }
},
methods:{
     getData(){
            
            axios
            .get(this.url+this.id)

            .then( (response) => {

                this.resultPeopleFiche   = response.data
                console.log(this.resultPeopleFiche)
            })
            .catch(err=>console.log(err))

        },
},
mounted(){
    console.log(this.$route.params.id)
},

created(){
this.getData()
}
}
</script>

<style>

</style>