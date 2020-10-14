import Vue from 'vue'
import DigitalClock from "vue-digital-clock";
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

Vue.use(DigitalClock)

window.Swal = Swal;
window.Toast = Toast;

Vue.component('Forecast', require('./components/Forecast.vue').default);
Vue.component('FrontPage', require('./components/FrontPage.vue').default);
Vue.component('citiesList', require('./components/citiesList.vue').default);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
