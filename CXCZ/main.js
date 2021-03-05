import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 服务器地址
Vue.prototype.serverUrl = "http://rap2api.taobao.org/app/mock/258444/cxcz/";
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
