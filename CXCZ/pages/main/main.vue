<template>
	<view class="content">
		<view class="example-body">
			<uni-grid :column="4" :show-border="false" :square="false">
				<uni-grid-item v-for="(item ,index) in iconListArr" :index="index" :key="index">
					<navigator :url="item.page">
						<view class="grid-item-box">
							<image class="image" :src="item.icon" mode="aspectFill" />
							<text class="text">{{item.name}}</text>
							<view v-if="item.num" class="grid-dot">
								<uni-badge :text="item.num" type="error" />
							</view>
						</view>
					</navigator>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconListArr: [],
				functionTitle: [{
						"id": "PTCL",
						"name": "普通车辆",
						"page": "../set/set"
					},
					{
						"id": "PTJL",
						"name": "普通记录",
						"page": "../set/set"
					},
					{
						"id": "TSCL",
						"name": "特殊车辆",
						"page": "../set/set"
					},
					{
						"id": "TSJL",
						"name": "特殊记录",
						"page": "../set/set"
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
						"page": "../set/set"
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
			// var iconListArr = [];
			// 根据功能列表初始化功能
			var userinfo = uni.getStorageSync("userinfo");
			var iconList = userinfo.iconList;
			iconList.push(this.SZ);
			for (var i = 0; i < iconList.length; i++) {
				var id = iconList[i]
				var name = "未知";
				var page = "";
				console.log("length----------" + this.functionTitle.length);
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
					num = i+1000;
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
		padding-top:$uni-spacing-row-sm ;
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
