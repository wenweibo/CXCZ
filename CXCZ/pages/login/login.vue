<template>
	<view class="main-content">
		<form @submit="login">
			<view class="content">
				<view class="top-content">
					<image class="top-img" src="../../static/icons/login_bg.png" mode=""></image>
				</view>

				<view class="input-content">
					<input name="username" class="input-wapper" type="text" placeholder="请输入用户名" />
					<input name="password" class="input-wapper" type="text" placeholder="请输入密码" password="true" />
				</view>
				<view class="input-content btn-wapper">
					<button class="btn" type="primary" form-type="submit">登&#8195;录</button>
					<text class="text">江西省高速公路投资集团有限责任公司&#8195; &#8195; 版权所有</text>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			login(e){
				var username = e.detail.value.username;
				var password = e.detail.value.password;
				if(username == "" || password == ""){
					uni.showToast({
						duration:2000,
						title:"请输入用户名或密码",
						mask:true,
						icon:"none"
					})
					return;
				}
				uni.showLoading({
					mask:true,
					title:"正在登录..."
				})
				var userToken = {
						"username":username,
						"password":password
					};
				uni.request({
					url:this.serverUrl + "app/login.action",
					method:"POST",
					data:userToken,
					success: res => {
						debugger;
						console.log(res);
						if(res.statusCode == 200){
							if(res.data.head.ret.retCode == "000000"){
								// 登录成功
								var userinfo = res.data.body;
								uni.setStorageSync("userinfo",userinfo);
								// 将用户信息存储到缓存中u
								uni.setStorageSync("userToken",userToken);
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
								uni.showToast({
									duration:2000,
									title:res.errMsg,
									mask:true,
									icon:"none"
								})
							}
						}
					},
					fail: () => {
						uni.showToast({
							duration:2000,
							title:"登录失败",
							mask:true,
							icon:"none"
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.main-content{
		height: 100%;
	}
	.content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.top-content {
		/* display: flex;
		flex-direction: column;
		flex-wrap: nowrap; */

	}

	.top-img {
		width: 100%;
	}

	.input-content {
		display: flex;
		flex-direction: column;
		padding: $uni-img-size-big;
	}

	.input-wapper {
		display: flex;
		flex-direction: row;
		border: solid 1px $uni-border-color;
		border-radius: $uni-spacing-col-lg;
		padding: $uni-spacing-row-sm;
		margin-top: $uni-img-size-sm;
		align-items: center;
	}

	.btn-wapper {
		height: 100%;
		align-items: center;
		justify-content: flex-end;
	}

	.btn {
		width: 100%;
	}

	.text {
		font-size: $uni-font-size-sm;
		color: $uni-text-color-placeholder;
		margin-top: $uni-spacing-col-lg;
	}
</style>
