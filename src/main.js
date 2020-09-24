import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
//import axios from './axios'

import 'material-design-icons/iconfont/material-icons.css'
import 'materialize-css/dist/css/materialize.min.css'

import 'materialize-css/dist/js/materialize'

import 'animate.css'

import './assets/main.scss'


Vue.config.productionTip = false

//axios
window.axios = require('axios')
//filters
Vue.filter('to-uppercase', function(value){

    return value.toUpperCase();
});
Vue.filter('truncate', function(value){

    return value.slice(0,50)+'...';
});

new Vue({
  router,
  vuetify,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
