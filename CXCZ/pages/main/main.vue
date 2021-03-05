<template>
	<view class="content">
		<view class="function-list" >
			<view class="item-wapper" v-for="iconObj in iconListArr">
				<image :src="iconObj.icon" class="item-img"></image>
				<view class="item-name">{{iconObj.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconListArr : [],
				functionTitle:[
					{"id":"PTCL","name":"普通车辆","page":"../set/set"},
					{"id":"PTJL","name":"普通记录","page":""},
					{"id":"TSCL","name":"特殊车辆","page":""},
					{"id":"TSJL","name":"特殊记录","page":""},
					{"id":"CXCL","name":"超限处理","page":""},
					{"id":"CXLB","name":"超限列表","page":""},
					{"id":"LZQBFB","name":"情报发布","page":""},
					{"id":"GSQBFB","name":"情报发布","page":""},
					{"id":"TJBB","name":"统计报表","page":""},
					{"id":"CXBB","name":"统计报表","page":""},
					{"id":"SZ","name":"设置","page":""},
					{"id":"GSDB","name":"代办","page":""},
					{"id":"GSYSB","name":"已上报","page":""},
					{"id":"LZDB","name":"待办","page":""},
					{"id":"LZYCL","name":"已处理","page":""}]
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
				console.log("length----------"+this.functionTitle.length);
				for (var y = 0; y < this.functionTitle.length; y++) {
					var obj = this.functionTitle[y];
					if(obj.id == id){
						name = obj.name;
						page = obj.page;
					}
				}
				var icon = "../../static/funicons/"+id+".png";
				var iconObj = {"title":id,"icon":icon,"name":name,"page":page};
				console.log(iconObj);
				this.iconListArr.push(iconObj);
			}
			
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		padding: $uni-spacing-row-base;
	}
	.grid-item-box {
			flex: 1;
			/* position: relative;
	*/
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 15px 0;
		}
	.function-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: $uni-spacing-row-base;
	}
	.item-wapper {
		padding:20upx 13upx;
		display: flex;
		flex-direction: column;
		width: $uni-img-size-main;
		align-items: center;
	
	}
	.item-img {
		width: $uni-img-size-main;
		height: $uni-img-size-main;
	}
	.item-name {
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 15upx;
		color: $uni-text-color;
	}
</style>
