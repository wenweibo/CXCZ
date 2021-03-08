<template>
	<view class="content">
		<view>
			<view class="top-container">
				<view class="top-bg"></view>
				<view class="top-tag">
					<view class="person-wapper">
						<image class="portrait" src="../../static/logo.png"></image>
						<view class="msg-wapper">
							<view class="name-wapper">
								<text class="name-text">张三</text>
								<text class="text-mind">修改个人信息 ></text>
							</view>
							<view class="station-wapper">
								<image class="icon" src="../../static/icons/station_icon_light.png"></image>
								<text class="station-text">南昌南站</text>
							</view>
							<view class="station-wapper">
								<image class="icon" src="../../static/icons/shift_icon.png"></image>
								<text class="station-text">南昌南站</text>
							</view>
						</view>
					</view>

					<view class="statistic-wapper">
						<view class="statistic-item">
							<text>上次超限车次</text>
							<text class="item-text">1305</text>
						</view>
						<view class="v-line"></view>
						<view class="statistic-item">
							<text>处理中</text>
							<text class="item-text">1305</text>
						</view>
						<view class="v-line"></view>
						<view class="statistic-item">
							<text>待完结</text>
							<text class="item-text">1305</text>
						</view>
					</view>
				</view>

			</view>
			<view class="bot-wapper">
				<uni-list class="list-wapper">
					<uni-list-item title="服务器设置" thumb="../../static/icons/ic_server.png" />
					<navigator url="reset_password/reset_password">
						<uni-list-item title="修改密码" thumb="../../static/icons/ic_repair.png" />
					</navigator>
				</uni-list>

			</view>
		</view>

		<view class="btn-wapper">
			<com-button type="danger" @tap="toggleMessage()">退出登录</com-button>
		</view>
		<!-- 对话框 -->
		<uni-popup ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog :type="msgType" title="通知" :content="message" :before-close="true"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	export default {
		components: {
			uniPopupMessage,
			uniPopupDialog,
			uniPopupShare
		},
		data() {
			return {
				type: 'top',
				msgType: 'success',
				message: '这是一条成功消息提示',
				value: '默认输入的内容'
			}
		},
		methods: {
			toggleMessage() {
				this.msgType = "warn"
				this.message = "确定要退出登录吗"
				this.$refs.popupDialog.open()
			},
			/**
			 * popup 状态发生变化触发
			 * @param {Object} e
			 */
			change(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			},
			/**
			 * 对话框点击确认按钮
			 */
			dialogConfirm(done) {
				// 需要执行 done 才能关闭对话框
				done()
				var userinfo = uni.getStorageSync("userinfo");
				// logout
				uni.showLoading({
					mask: true,
					title: "正在登出..."
				});
				uni.request({
					url: this.serverUrl + "client/logout.action",
					method: "POST",
					data: {
						"head": {},
						"body": {
							"token": userinfo.Token
						}
					},
					success: (res) => {
						console.log(res);
						if (res.statusCode == 200) {
							if (res.data.head.ret.retCode == "000000") {
								// 清理缓存
								uni.clearStorageSync();
								// 关闭当前栈内所有页面，并跳转到登录页
								uni.reLaunch({
									url: "../login/login"
								})
							} else {
								uni.showToast({
									duration: 2000,
									title: res.errMsg,
									mask: true,
									icon: "none"
								})
							}
						}
					},
					fail: () => {
						uni.showToast({
							duration: 2000,
							title: "登出失败",
							mask: true,
							icon: "none"
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},
			/**
			 * 对话框取消按钮
			 */
			dialogClose(done) {
				done()
			}
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.top-container {
		height: 500rpx;
	}

	.top-bg {
		height: 400rpx;
		background-image: linear-gradient(to right, #00dcff, #00aeff);
		border-bottom-left-radius: 35%;
		border-bottom-right-radius: 35%;
	}

	.top-tag {
		height: 350rpx;
		background-color: #FFFFFF;
		border-radius: $uni-spacing-col-lg;
		position: relative;
		top: -380rpx;
		z-index: 2;
		margin: $uni-spacing-row-base;
		display: flex;
		flex-direction: column;
		padding: $uni-spacing-row-lg;
		justify-content: space-between;
	}

	.person-wapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.portrait {
		width: $uni-img-size-main-lg;
		height: $uni-img-size-main-lg;
		border-radius: $uni-border-radius-base;
	}

	.name-text {
		font-size: $uni-font-size-max;
	}

	.msg-wapper {
		// margin-left:$uni-spacing-row-base ;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 70%;
	}

	.name-wapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

	}

	.text-mind {
		font-size: $uni-font-size-sm;
		color: $uni-text-color-placeholder;
	}

	.station-wapper {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.station-text {
		margin-left: $uni-spacing-row-lg;
	}

	.icon {
		width: $uni-img-size-base;
		height: $uni-img-size-base;
	}

	.statistic-wapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.statistic-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 30%;

	}

	.v-line {
		width: 1px;
		height: 60rpx;
		background-color: $uni-border-color;
	}

	.item-text {
		font-size: $uni-font-size-max;
		color: $end_blue;
	}

	.bot-wapper {
		height: 55%;
		display: flex;
		flex-direction: column;
		padding: $uni-spacing-row-base;
		justify-content: space-between;
	}

	.btn-wapper {
		margin:$uni-spacing-row-lg $uni-spacing-row-base ;
	}

	.list-wapper {
		background-color: #FFFFFF;
		border-radius: $uni-spacing-col-lg;
	}


	.list-item {
		align-items: center;
	}

	
</style>
