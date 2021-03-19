<template>
	<view class="content">
		<failPage v-if="shiftList.length == 0" msg="加载班次列表失败" @tap="reload"></failPage>
		<view v-else class="content">
			<radio-group class="radio-group" @change="shiftChange">
				<label v-for="shift in shiftList">
					<shift-radio :scheduleObj="shift"></shift-radio>
				</label>
			</radio-group>
			<com-button type="info" @click="submitShift">班次选择</com-button>
		</view>

	</view>

</template>

<script>
	import shiftRadio from "../../components/shiftRadio.vue"
	import failPage from "../../components/failPage.vue"
	export default {
		data() {
			return {
				shiftList: [],
				selectId: ""
			}
		},
		onLoad() {
			this.reload();
		},
		methods: {
			// 班次选择监听
			shiftChange(e) {
				this.selectId = e.detail.value;
			},
			// 提交班次
			submitShift() {
				if (this.selectId == "") {
					uni.showToast({
						duration: 2000,
						title: "请选择一个班次",
						mask: true,
						icon: "none"
					})
					return;
				}
				var userinfo = uni.getStorageSync("userinfo");
				if (userinfo != null && userinfo != "" && userinfo != undefined) {
					uni.showLoading({
						mask: true,
						title: "正在提交..."
					})
					uni.request({
						url: getApp().globalData.serverUrl + "cxcz/scheduleSelect/save.action",
						method: "POST",
						data: {
							"head": {},
							"body": {
								"scheduleId": this.selectId,
								"userId": userinfo.userId,
								"creatorId": userinfo.userId,
								"updatorId": userinfo.userId
							}
						},
						success: (res) => {
							console.log(res);
							if (res.statusCode == 200) {
								if (res.data.head.ret.retCode == "000000") {
									// 班次提交成功：关闭班次选择页面，并跳转到主页
									uni.redirectTo({
										url:"../main/main"
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
								title: "班次提交失败",
								mask: true,
								icon: "none"
							})
						},
						complete: () => {
							uni.hideLoading();
						}
					})
				}

			},
			reload() {
				uni.showLoading({
					mask: true,
					title: "正在加载..."
				})
				// 加载班次
				uni.request({
					url: getApp().globalData.serverUrl + "cxcz/schedule/list.action",
					method: "POST",
					data: {},
					success: res => {
						
						if (res.statusCode == 200) {
							if (res.data.head.ret.retCode == "000000") {
								this.shiftList = res.data.body;
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
							title: "班次加载失败",
							mask: true,
							icon: "none"
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			}
		},
		components: {
			shiftRadio,
			failPage
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: $uni-spacing-row-base;
		height: 95%;
	}

	.radio-group {
		background-color: #FFFFFF;
		border: solid 1px #FFFFFF;
		border-radius: $uni-spacing-col-lg;
	}
</style>
