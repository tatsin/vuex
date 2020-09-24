<template>
  <div class="container">
      
      <div class="row">
          <div class="col xs8">
               <div class="input-field col ">
                 <i class="material-icons prefix">loop</i>
                <input id="search" type="text" v-model="searchInputValue" autocomplete="off" @keyup.enter="search()">
                <label for="search"></label>
              </div>

            {{msg}}
              <div class="divider">
                 
                 
              </div>
                <ul class="collapsible">
                    <li  v-for="(value , index ) in resultPeople" :key="index"  :id="extractID(value.url)" :class="'cssdynamic'+extractID(value.url)">

                            <div class="collapsible-header"><i class="material-icons">person</i>{{index}}::{{value.name}} {{value.url}}</div>
                            <div class="collapsible-body">
                                <ul>
                                    <li>
                                       <router-link :to="'people/'+ extractID(value.url)" >{{value.name}}</router-link>
                                       
                                       <button class="btn right" @click="gotoPage(value.url)"> {{value.name}}</button>
                                    </li>

                                </ul>
                               
                            </div>
                               
                    </li>
                </ul>


                <div class="divider"></div>

                 totale page : {{pagination.totalPage}}<br>
                 previous:{{pagination.previous}}<br>
                 next:{{pagination.next}}
                <br><br>
                <div class="groupe-btn">   
                        <button class="btn"  :disabled="pagination.previous===null"      @click="getUserBTN(1)">  <span>first</span></button>

                        <button class="btn"  :disabled="pagination.previous===null"      @click="getPage(pagination.previous)">  <span>&#8592;</span></button>
                        
                        <div class="" >
                            <button class="btn btn-small" 
                             @click="getUserBTN(index+1)" 
                             v-for="(nbpage, index) in pagination.totalPage" 
                            :key="index"
                            :disabled="index + 1 === pagination.currentPage"> p:{{index+1}}
                            </button>
                                
                        </div>
                        
                        <button class="btn"  :disabled="pagination.next===null"          @click="getPage(pagination.next)">  <span>&#8594;</span></button>

                        <button class="btn"  :disabled="pagination.next===null"          @click="getUserBTN(pagination.totalPage)">  <span>last</span></button>
                 </div>
                <div class="divider"></div>
                <br><br>
              
          </div>
      </div>
  </div>
</template>

<script>



export default {

name : 'search',

data(){

    return {

            url:'https://swapi.dev/api/people/',
            searchInputValue: '',
            msg :'',
            resultPeople : [],
            idPeople:null,
            pagination   : {
                page     : 1,
                limit    : 5,
                totalPage:null,
                count    : '',
                next     : '',
                previous : '',
                currentPage:''
            
            }
         }

},
methods:{
    
        search(){

            axios
            .get(this.url, {
                 params: {
                 search: this.searchInputValue,
                }
            })

            .then( (response) => {

            //    console.log(response.data.count)

                this.resultPeople = response.data.results
                
            //    console.log('search :',response.data.results)
                  
                        if(response.data.count===0){
                            this.msg="sorry dude not found"
                        }else if(response.data.count > 1) {
                            console.log(this.resultPeople)
                            this.resultPeople.map((res, i) => {
                                console.log(res.name  + 'ttthihihi' + i);
                                this.msg="you mean: " + res.name
                            })
                            for(let i = 0; i < this.resultPeople.count; i++){
                               // this.msg="you mean: " + this.resultPeople[i].name
                                console.log('hhhh:',this.resultPeople[i].name)
                            }
                     
                            
                        } 

            })
            .catch(err=>console.log(err))

         

        },    
        getData(){
            
            axios
            .get(this.url + '?page='+this.pagination.page+'&limit=3')

            .then( (data) => {

                this.resultPeople        = data.data.results
            
                this.pagination.count    = data.data.count

                this.pagination.next     = data.data.next

                this.pagination.previous = data.data.previous

               

            

                
           // console.log('inside axios ::total'+ this.pagination.count, 'nbpeople'+ this.resultPeople.length  )
            this.pagination.totalPage = Math.ceil(this.pagination.count / this.resultPeople.length)
           // console.log('id::::: ', this.resultPeople)
            
                //console.log(data.data)
            })
            .catch(err=>console.log(err))
            this.pagination.currentPage = this.pagination.page;

            
        },

        getUserBTN(val){

           
    
            axios
            .get(this.url + '?page='+val)

            .then( (data) => {

                this.resultPeople        = data.data.results
            
                this.pagination.count    = data.data.count

                this.pagination.next     = data.data.next

                this.pagination.previous = data.data.previous

                
                //console.log(data.data)
            }).catch(err=>console.log(err))

             this.pagination.currentPage = val;
           
        },

        getPage(val){

             
                
              
               let x = val
               let a = x.split("/").splice(-1)[0]
               console.log(a.split("").splice(-1)[0])
               this.pagination.currentPage = parseInt(a.split("").splice(-1)[0])
               console.log( this.pagination.currentPage)

            axios
            //.get('`${val}`')
            .get(val)

            .then( (data) => {

                this.resultPeople        = data.data.results
            
                this.pagination.count    = data.data.count

                this.pagination.next     = data.data.next

                this.pagination.previous = data.data.previous

                

                //console.log(data.data)
            }).catch(err=>console.log(err))

            
         
        },

        extractID(val){

            //   console.log(val) 
               
               let a = val.split("/").splice(5)[0]
              // console.log('aa: ',a)
               return  a
              // console.log('idpeople : ',this.idPeople)
           
        },
        gotoPage(val){

            const userId = this.extractID(val);

            // router.push('people/'+userId)
            this.$router.push({ path: `/people/${userId}` })

        }


},




created(){


this.$nextTick(() => {
M.AutoInit();
          
    });

this.getData();
},
watch: {
    searchInputValue(newKeyword,oldKeyword) {
        //console.log(`New keyword is ${newKeyword}`);
        //console.log(`Old keyword is ${oldKeyword}`)
        this.search();
    },

    idPeople(){
        this.extractID();
    }
}
}
</script>

<style lang="scss">

.groupe-btn{

    margin-top: 5rem;
    display: flex;

}

</style>