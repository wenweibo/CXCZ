<template>
	<view class="content">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			
		},
		onShow() {
			var userToken = uni.getStorageSync("userToken");
			console.log(userToken);
			if(userToken != null && userToken !="" && userToken != undefined){
				// 如果有用户信息
				uni.request({
					url:getApp().globalData.serverUrl + "app/login.action",
					method:"POST",
					data:userToken,
					success: res => {
						if(res.statusCode == 200){
							if(res.data.head.ret.retCode == "000000"){
								// 登录成功
								var userinfo = res.data.body;
								console.log(userinfo);
								uni.setStorageSync("userinfo",userinfo);
								// 将用户信息存储到缓存中
								uni.setStorageSync("userToken",userToken)
								if(userinfo.showSchedule){
									// 如果需要显示班次，则跳转到班次选择页面
									uni.redirectTo({
										url:"../shiftSelect/shiftSelect"
									})
								}else{
									// 否则，跳转到主页
									uni.redirectTo({
										url:"../main/main"
									})
								}
							}else{
								// 跳转到登录页
								uni.redirectTo({
									url:"../login/login"
								})
							}
						}
					},
					fail: () => {
						uni.redirectTo({
							url:"../login/login"
						})
					}
				})
			}else{
				// 跳转到登录页
				uni.redirectTo({
					url:"../login/login"
				})
			}
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		height: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: $end_blue;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
