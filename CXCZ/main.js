import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 服务器地址
// Vue.prototype.serverUrl = "http://rap2api.taobao.org/app/mock/258444/cxcz/";
App.mpType = 'app';
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
	...App
})
app.$mount()
