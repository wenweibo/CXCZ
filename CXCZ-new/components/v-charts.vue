<template name="v-charts">
	<view class="charts-wapper">
		<view class="">
			<list>
				<cell v-for="(item,index) in dataArr" :key="index">
					<view class="item-wapper" :style="{
						height:getHeight()
					}">
						<text style="width: 20px;">{{item.name}}</text>
						<view style="height: 100%;width: 1px; background-color: #e4e4e4;"></view>
						<view class="item-conent">
							<progress class="progress-class" v-for="(pro,i) in item.arr" :key="i" :percent="pro.value"
								stroke-width="10" :activeColor="getColor(i)" backgroundColor="#FFFFFF" active="true" />
						</view>
					</view>
				</cell>
			</list>
		</view>

		<view class="tl-class" style="position: fixed;">
			<view class="tl-item" v-for="(item,index) in getTlArr()" :key="index">
				<view class="tl-view" :style="{backgroundColor: getColor(index)}"></view>
				<text class="tl-text">{{item.carTypeName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	// const dom = weex.requireModule('dom');
	export default {
		name: "v-charts",
		data() {
			return {
				proColor: ['#FFA197', '#00dcff', '#ffcc00', '#00CE47', '#CE3C39'],

			};
		},
		props: {
			dataArr: {
				type: Array,
				default: []
			},
			typeNum: {
				type: Number,
				default: 0
			}
		},
		created() {

		},
		methods: {
			getColor(index) {
				return this.proColor[index];
			},
			getHeight() {
				return (30 * this.typeNum + 10 * (this.typeNum + 1)) + 'rpx';
			},
			getTlArr(){
				var tlArr = [];
				if(this.dataArr!=null && this.dataArr!=undefined && this.dataArr.length > 0){
					tlArr = this.dataArr[0].arr;
				}
				return tlArr;
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;

	}

	.charts-wapper {
		// position: relative;
	}

	.item-wapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
		margin-bottom: 1px;
	}

	.item-conent {
		width: 90%;
		margin-top: 20px;
		margin-bottom: 20px;
		height: 80%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

	}

	.tl-class {
		position: absolute;
		top: 10px;
		right: 10px;
		// display: flex;
		
		flex-direction: column;

		// position: sticky;
		// top: 0;
	}

	.tl-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.tl-view {
		width: 20rpx;
		height: 20rpx;
	}

	.tl-text {
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
	}
</style>
