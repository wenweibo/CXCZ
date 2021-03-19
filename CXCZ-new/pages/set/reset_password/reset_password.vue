<template>
	<view class="main-content">
		<form @submit="resetPassword">
			<view class="content">
				<view class="input-content">
					<input name="oldPassword" class="input-wapper" type="text" placeholder="请输入旧密码" password="true" />
					<input name="newPassword" class="input-wapper" type="text" placeholder="请输入新密码" password="true" />
					<input name="confirmPassword" class="input-wapper" type="text" placeholder="确认密码" password="true" />
				</view>
				<com-button type="info" formType="submit">修&#8195;改</com-button>
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
			resetPassword(e) {
				var oldPassword = e.detail.value.oldPassword;
				var newPassword = e.detail.value.newPassword;
				var confirmPassword = e.detail.value.confirmPassword;
				
				if(oldPassword==""){
					uni.showToast({
						duration:2000,
						title:"请输入旧密码",
						mask:true,
						icon:"none"
					})
					return;
				}
				if(newPassword == ""){
					uni.showToast({
						duration:2000,
						title:"请输入新密码",
						mask:true,
						icon:"none"
					})
					return;
				}
				
				if(oldPassword == newPassword){
					uni.showToast({
						duration:2000,
						title:"新旧密码相同，无需修改",
						mask:true,
						icon:"none"
					})
					return;
				}
				
				if(newPassword != confirmPassword){
					uni.showToast({
						duration:2000,
						title:"两次密码输入不一致",
						mask:true,
						icon:"none"
					})
					return;
				}
				
				console.log(oldPassword+"---"+newPassword+"----"+confirmPassword)
				
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
	.main-content {
		height: 100%;
	}

	.content {
		padding: $uni-spacing-row-lg;
		height: 95%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.input-content {
		display: flex;
		flex-direction: column;
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
</style>
