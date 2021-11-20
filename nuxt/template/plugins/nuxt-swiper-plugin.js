/* import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import VueQriously from 'vue-qriously'
import ElementUI from 'element-ui' //element-uiçš„å…¨éƒ¨ç»„ä»¶
import 'element-ui/lib/theme-chalk/index.css'//element-uiçš„css
Vue.use(ElementUI) //ä½¿ç”¨elementUI
Vue.use(VueQriously)
Vue.use(VueAwesomeSwiper)
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 import Vue from 'vue'
 import App from './App'
 import router from './router'
 import ElementUI from 'element-ui'
 import 'element-ui/lib/theme-chalk/index.css'
 
 Vue.config.productionTip = false
 
 Vue.use(ElementUI)
 /* eslint-disable no-new */
 new Vue({
   el: '#app',
   router,
   components: { App},
   template: '<App/>'
 })