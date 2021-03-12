<script>
	export default {
		globalData:{
			serverUrl:'http://rap2api.taobao.org/app/mock/258444/cxcz/'
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	/*每个页面公共css */
	// html,body{
	// 	height: 100%;
	// 	background-color: #f7f7f7;
	// }
	
	page {
	    background-color: #F4F5F6;
	    height: 100%;
	    font-size: 28rpx;
	    line-height: 1.8;
	}
	.page{
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
	
	 /* #endif*/
</style>
