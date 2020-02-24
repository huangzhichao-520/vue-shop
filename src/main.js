import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.config.productionTip = false
axios.defaults.withCredentials = true 
axios.defaults.crossDomain = true;
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://192.168.14.7:3000"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Button,Card,Checkbox, CheckboxGroup,Stepper,SubmitBar} from 'vant';
Vue.use(ElementUI)
Vue.use(Button);
Vue.use(Card);
Vue.use(SubmitBar);
Vue.use(Stepper);
Vue.use(Checkbox).use(CheckboxGroup);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
