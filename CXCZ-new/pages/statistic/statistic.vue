<template>
	<view>
		<vCharts :dataArr="chartsArr" :typeNum="statisticObj.length"></vCharts>
	</view>
</template>

<script>
	import vCharts from "../../components/v-charts.vue"
	export default {
		components: {
			vCharts
		},
		data() {
			return {
				statisticObj: [],
				chartsArr: []
			}
		},
		onLoad() {
			// 获取统计数据
			uni.showLoading({
				mask: true,
				title: "正在加载..."
			});
			uni.request({
				url: getApp().globalData.serverUrl + 'cxcz/overloadCar/countModel.action',
				method: 'POST',
				data: {
					"head": {},
					"body": {
						"createTime": "2020-06-02",
						"enterStation": "041100341",
						"findType": "day",
						"carType": "PTCL"
					}
				},
				success: res => {
					console.log(res);
					if (res.data.head.ret.retCode == "000000") {
						this.statisticObj = res.data.body;
						this.formatArr(this.statisticObj);
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
		methods: {
			formatArr(arr) {
				for (var i = 0; i < arr.length; i++) {
					// this.chartsArr.push(i);
					var itemBig = arr[i];
					for (var y = 0; y < itemBig.values.length; y++) {
						var item = itemBig.values[y];
						if (i == 0) {
							var pItem = {
								"name": item.name,
								arr: [{
									"carTypeId": itemBig.carTypeId,
									"carTypeName": itemBig.carTypeName,
									"value": item.value
								}]
							}
							this.chartsArr.push(pItem);
						} else {
							var pItem = this.chartsArr[y];
							pItem.arr.push({
								"carTypeId": itemBig.carTypeId,
								"carTypeName": itemBig.carTypeName,
								"value": item.value
							});
						}
					}
				}

			}
		}
	}
</script>

<style>

</style>
