<template>
	<view class="mani-container">
		<failPage v-if="!hasDetails" msg="加载车辆详情失败" @tap="reload"></failPage>
		<!-- 内容 -->
		<scroll-view v-else scroll-y="true">
			<view class="container">
				<!-- 车牌信息 -->
				<view class="block-wapper">
					<view class="plate-bg">
						<text class="plate-text">{{registerObj.carNumber}}</text>
					</view>
				</view>

				<!-- 超限基本信息 -->
				<view class="block-wapper">
					<view class="info-view">
						<myText class="info-text info-title-width" text="站名"></myText><text
							class="info-text info-gray">：{{registerObj.enterStationName}}</text>
					</view>
					<view class="info-view">
						<myText class="info-text info-title-width" text="检查人"></myText><text
							class="info-text info-gray">：{{registerObj.creatorName}}</text>
					</view>
					<view class="info-view">
						<myText class="info-text info-title-width" text="检查人手机"></myText>
						<view class="phone-wapper" @click="makePhoneCall(registerObj.creatorContact)">
							<text class="info-text info-gray">：{{registerObj.creatorContact}}</text>
							<uni-icons type="phone-filled" color="#00b5fe" size="20"></uni-icons>
						</view>
					</view>
					<view class="info-view">
						<myText class="info-text info-title-width" text="检查时间"></myText><text
							class="info-text info-gray">：{{registerObj.createTime}}</text>
					</view>
					<view class="info-view">
						<myText class="info-text info-title-width" text="车牌号"></myText><text
							class="info-text info-gray">：{{registerObj.carNumber}}</text>
					</view>
					<view class="info-view">
						<myText class="info-text info-title-width" text="车牌颜色"></myText><text
							class="info-text info-gray">：{{registerObj.colourName}}</text>
					</view>
					<view class="info-view">
						<myText class="info-text info-title-width" text="车型"></myText><text
							class="info-text info-gray">：{{registerObj.modelName}}</text>
					</view>
					<view class="info-view">
						<myText class="info-text info-title-width" text="轴型"></myText><text
							class="info-text info-gray">：{{registerObj.shaftTypeName}}</text>
					</view>
					<view class="info-view">
						<myText class="info-text info-title-width" text="车辆总重"></myText><text
							class="info-text info-gray">：{{registerObj.totalWeight}} KG</text>
					</view>
					<view class="info-view">
						<myText class="info-text info-title-width" text="驾驶员手机"></myText>
						<view class="phone-wapper" @click="makePhoneCall(registerObj.driverMobileNumber)">
							<text class="info-text info-gray">：{{registerObj.driverMobileNumber}}</text>
							<uni-icons type="phone-filled" color="#00b5fe" size="20"></uni-icons>
						</view>
					</view>
					<view class="info-view">
						<myText class="info-text info-title-width" text="驶离站点"></myText><text
							class="info-text info-gray">：{{registerObj.leaveStationName}}</text>
					</view>
				</view>


				<view class="block-wapper">
					<text class="block-title">三证信息</text>
					<view class="img-wapper">
						<block v-for="(item,index) in threeCardInfo" :key="index">
							<FrImage :src="item" mode="aspectFill" @tap="previewImage(index,threeCardInfo)"></FrImage>
						</block>
					</view>
					<dividerLine class="line"></dividerLine>

					<text class="block-title">车辆照片</text>
					<view class="img-wapper">
						<block v-for="(item,index) in carPhoto" :key="index">
							<FrImage :src="item" mode="aspectFill" @tap="previewImage(index,carPhoto)"></FrImage>
						</block>
					</view>
					<dividerLine class="line"></dividerLine>

					<text class="block-title">车辆视频</text>
					<view class="img-wapper">
						<block v-for="(item,index) in carPhoto" :key="index">
							<image class="image" :src="item" mode="aspectFill" @tap="previewImage(index,carPhoto)" />
						</block>
					</view>
					<dividerLine class="line"></dividerLine>

					<text class="block-title">告知书照片与超重信息照片</text>
					<view class="img-wapper">
						<block v-for="(item,index) in noticePhoto" :key="index">
							<FrImage :src="item" mode="aspectFill" @tap="previewImage(index,noticePhoto)"></FrImage>
						</block>
					</view>
					<dividerLine class="line"></dividerLine>
				</view>

				<!-- 情报板发布信息 -->
				<view class="block-wapper">

				</view>

				<!-- 退回原因 -->
				<view class="block-wapper">

				</view>

				<!-- 不立案原因 -->
				<view class="block-wapper">

				</view>

				<!-- 结案理由 -->
				<view class="block-wapper">

				</view>
			</view>
		</scroll-view>
		<!-- 内容 -->
	</view>

</template>
<script>
	import failPage from "../../components/failPage.vue"
	import myText from "../../components/my-text.vue"
	import dividerLine from "@/components/divider-line.vue"
	import FrImage from '../../components/fr-image/fr-image.vue'
	import {
		isNull
	} from '@/common/util.js';
	export default {
		components: {
			failPage,
			myText,
			dividerLine,
			FrImage
		},
		data() {
			return {
				id: '', // 车辆详情id
				registerObj: {}, //车辆详情
				hasDetails: false,
				threeCardInfo: [], //三证信息图片
				carPhoto: [], //车辆照片
				noticePhoto: [] // 告知书照片与超重信息照片
			}
		},
		onLoad(param) {
			this.id = param.id;
			this.reload();
		},
		methods: {
			/**
			 * 加载详情数据
			 */
			reload() {
				uni.showLoading({
					mask: true,
					title: "正在加载..."
				});
				uni.request({
					url: getApp().globalData.serverUrl + 'cxcz/overloadCar/get.action',
					method: 'POST',
					data: {
						"head": {},
						"body": {
							"id": this.id
						}
					},
					success: res => {
						console.log(res);
						if (res.data.head.ret.retCode == "000000") {
							this.registerObj = res.data.body;
							this.hasDetails = true;
							// 解析三证信息图片，并保存为数组
							if (!isNull(this.registerObj.threeCardInfo)) {
								this.threeCardInfo = this.registerObj.threeCardInfo.split(",")
							}
							// 解析车辆照片，并保存为数组
							if (!isNull(this.registerObj.carPhoto)) {
								this.carPhoto = this.registerObj.carPhoto.split(",")
							}

							// 解析告知书照片与超重信息照片，并保存为数组
							if (!isNull(this.registerObj.noticePhoto)) {
								this.noticePhoto = this.registerObj.noticePhoto.split(",")
							}
						} else {
							uni.showToast({
								duration: 2000,
								title: res.data.head.ret.retMsg,
								mask: true,
								icon: "none"
							})
						}
					},
					fail: (e) => {
						console.log("-----" + e.errMsg);
						// this.$refs["list"].resetLoadmore();
						uni.showToast({
							duration: 2000,
							title: "加载数据失败",
							mask: true,
							icon: "none"
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			/**
			 * 拨打电话
			 * @param {Object} num 电话号码
			 */
			makePhoneCall(num) {
				uni.makePhoneCall({
					phoneNumber: num
				});
			},
			/**
			 * 预览图片
			 * @param {Object} index 当前预览的位置
			 * @param {Object} imgArr 当前预览数组
			 */
			previewImage(index, imgArr) {
				// 去预览照片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[index]
				});
			},
		}
	}
</script>

<style lang="scss">
	.mani-container {
		height: 100%;
	}

	.container {
		display: flex;
		flex-direction: column;
		padding: $uni-spacing-row-base;
	}

	.block-wapper {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		border-radius: $uni-border-radius-lg;
		padding: $uni-spacing-row-base;
		margin-bottom: $uni-spacing-row-base;
	}

	.plate-bg {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #0057b0;
		border-radius: $uni-border-radius-base;
		width: 250rpx;
		height: 100rpx;
	}

	.plate-text {
		border: solid 2px #FFFFFF;
		border-radius: $uni-border-radius-base;
		padding-left: $uni-spacing-row-sm;
		padding-right: $uni-spacing-row-sm;
		color: #FFFFFF;
		font-size: $uni-font-size-max;
		font-weight: bold;
	}

	.info-view {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		height: 50rpx;
	}

	.info-text {
		font-size: $uni-font-size-lg;
		color: #000000;
	}

	.info-title-width {
		width: 200rpx;
	}

	.info-gray {
		color: $uni-text-color-grey;
	}

	.phone-wapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 70%;
		align-items: center;
	}

	.image {
		width: 165rpx;
		height: 165rpx;
		border-radius: $uni-border-radius-base;
		margin-right: $uni-spacing-row-lg;

	}

	.block-title {
		color: $uni-text-color-title;
		font-size: $uni-font-size-lg;

	}

	.img-wapper {
		display: flex;
		flex-direction: row;
	}

	.line {
		margin-top: $uni-spacing-row-lg;
		margin-bottom: $uni-spacing-row-lg;
	}
</style>
