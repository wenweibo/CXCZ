<template>
	<view class="content">
		<view class="example-body">
			<uni-grid :column="4" :show-border="false" :square="false">
				<uni-grid-item v-for="(item ,index) in iconListArr" :index="index" :key="index">
					<!-- <navigator :url="item.page" > -->
					<view class="grid-item-box" @click="goDetailPage(item.page)">
						<image class="image" :src="item.icon" mode="aspectFill" />
						<text class="text">{{item.name}}</text>
						<view v-if="item.num" class="grid-dot">
							<uni-badge :text="item.num" type="error" />
						</view>
					</view>
					<!-- </navigator> -->
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import {
		isNull
	} from '@/common/util.js';
	export default {
		data() {
			return {
				iconListArr: [],
				functionTitle: [{
						"id": "PTCL",
						"name": "普通车辆",
						"page": "../vechicleRegister/vechicleRegister?title=普通车辆"
					},
					{
						"id": "PTJL",
						"name": "普通记录",
						"page": "../registerDetail/registerDetail?id=aaaaa"
					},
					{
						"id": "TSCL",
						"name": "特殊车辆",
						"page": "../vechicleRegister/vechicleRegister?title=特殊车辆"
					},
					{
						"id": "TSJL",
						"name": "特殊记录",
						"page": "../swiper-list/swiper-list?title=特殊记录"
					},
					{
						"id": "CXCL",
						"name": "超限处理",
						"page": "../set/set"
					},
					{
						"id": "CXLB",
						"name": "超限列表",
						"page": "../swiper-list/swiper-list?title=超限列表"
					},
					{
						"id": "LZQBFB",
						"name": "情报发布",
						"page": "../swiper-list/swiper-list?title=情报发布"
					},
					{
						"id": "GSQBFB",
						"name": "情报发布",
						"page": "../swiper-list/swiper-list?title=情报发布"
					},
					{
						"id": "TJBB",
						"name": "统计报表",
						"page": "../statistic/statistic"
					},
					{
						"id": "CXBB",
						"name": "统计报表",
						"page": "../set/set"
					},
					{
						"id": "SZ",
						"name": "设置",
						"page": "../set/set"
					},
					{
						"id": "GSDB",
						"name": "代办",
						"page": "../swiper-list/swiper-list?title=代办"
					},
					{
						"id": "GSYSB",
						"name": "已上报",
						"page": "../swiper-list/swiper-list?title=已上报"
					},
					{
						"id": "LZDB",
						"name": "待办",
						"page": "../set/set"
					},
					{
						"id": "LZYCL",
						"name": "已处理",
						"page": "../set/set"
					}
				]
			}
		},
		onLoad() {
			// 根据功能列表初始化功能
			var userinfo = uni.getStorageSync("userinfo");
			var iconList = userinfo.iconList;
			iconList.push(this.SZ);
			for (var i = 0; i < iconList.length; i++) {
				var id = iconList[i]
				var name = "未知";
				var page = "";
				for (var y = 0; y < this.functionTitle.length; y++) {
					var obj = this.functionTitle[y];
					if (obj.id == id) {
						name = obj.name;
						page = obj.page;
					}
				}
				var icon = "../../static/funicons/" + id + ".png";
				var num = 0;
				if (i < 4 || i > 7) {
					num = i + 1000;
				}
				var iconObj = {
					"title": id,
					"icon": icon,
					"name": name,
					"page": page,
					"num": num
				};
				console.log(iconObj);
				this.iconListArr.push(iconObj);
			}

		},
		methods: {
			goDetailPage(e) {
				// 如果基础数据没有加载
				if (isNull(getApp().globalData.CX)) {
					// 则去加载基础数据
					this.getBaseData(e);
				} else {
					// 否则，直接跳转
					uni.navigateTo({
						url: e
					})
				}
			},
			getBaseData(page) {
				// 加载 车辆基础支撑数据
				uni.showLoading({
					mask: true,
					title: "加载数据..."
				})
				uni.request({
					url: getApp().globalData.serverUrl + "cxcz/overloadCar/init.action",
					method: "POST",
					data: {
						"head": {},
						"body": {
							"code": "CX,ZS,CPYS"
						}
					},
					success: (res) => {
						// 如果基础数据成功
						if (res.data.head.ret.retCode == "000000") {
							var body = res.data.body;
							var CX = body.CX;
							var CPYS = body.CPYS;
							var ZS = body.ZS;
							var SLSFZ = body.SLSFZ;
							// 如果 车型、车牌颜色、轴型数组都有数据时
							if (!isNull(CX) && !isNull(CPYS) && !isNull(ZS) && !isNull(SLSFZ)) {
								// 将 三种基础数据 数组 存储到全局变量
								var globalData = getApp().globalData;
								globalData.CX = CX;
								globalData.CPYS = CPYS;
								globalData.ZS = ZS;
								globalData.SLSFZ = SLSFZ;
								
								console.log("跳转到："+page);
								// 跳转到指定页面
								uni.navigateTo({
									url: page
								})
							} else {
								// 返回到上一页
								uni.showToast({
									duration: 2000,
									title: "获取基础数据失败",
									mask: true,
									icon: "none"
								})
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
						uni.showToast({
							duration: 2000,
							title: "获取基础数据失败",
							mask: true,
							icon: "none"
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
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */
	.content {
		// padding: $uni-spacing-row-sm;
		padding-top: $uni-spacing-row-sm;
	}

	.example-body {
		flex-direction: column;
		padding: $uni-spacing-row-mid;
	}

	.image {
		width: $uni-img-size-main;
		height: $uni-img-size-main;
	}

	.text {
		font-size: $uni-font-size-base;
		margin-top: $uni-spacing-row-sm;
		color: $uni-text-color-disable;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: $uni-spacing-row-mid 0;
	}

	.grid-dot {
		position: absolute;
		top: -5px;
		right: 0px;
	}
</style>
