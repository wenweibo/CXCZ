import Vue from 'vue'
import App from './App'

import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'
import uLink from '@/components/uLink.vue'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
Vue.prototype.$adpid = "1111111111"

Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)
Vue.component('uLink', uLink)

App.mpType = 'app'
// 功能标签
// 普通车辆
Vue.prototype.PTCL = "PTCL";
// 普通记录
Vue.prototype.PTJL = "PTJL";
// 特殊车辆
Vue.prototype.TSCL = "TSCL";
// 特殊记录
Vue.prototype.TSJL = "TSJL";
// 超限处理
Vue.prototype.CXCL = "CXCL";
// 超限列表
Vue.prototype.CXLB = "CXLB";
// 情报发布
Vue.prototype.LZQBFB = "LZQBFB";
// 高速情报发布（同 情报发布）
Vue.prototype.GSQBFB = "GSQBFB";
// 统计报表
Vue.prototype.TJBB = "TJBB";
// 超限报表（同 统计报表）
Vue.prototype.CXBB = "CXBB";
// 设置
Vue.prototype.SZ = "SZ";
// 高速代办
Vue.prototype.GSDB = "GSDB";
// 高速已上报
Vue.prototype.GSYSB = "GSYSB";
// 路政待办
Vue.prototype.LZDB = "LZDB";
// 路政已处理
Vue.prototype.LZYCL = "LZYCL";
// 功能标签
const app = new Vue({
	store,
	...App
})
app.$mount()
