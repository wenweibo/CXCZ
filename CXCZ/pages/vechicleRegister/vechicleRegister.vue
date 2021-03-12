<template>
	<scroll-view style="height: 100%;" scroll-y="true">
		<view>
			<view class="station-wapper">
				<text>南昌南站</text>
				<text>时间 09:43</text>
				<text>张三</text>
			</view>

			<view class="record-wapper">
				<text style="color: #FFFFFF;">该车辆有超限记录</text>
				<com-button :font-size="25" size="small" type="danger" color="#ff7900">查看详情</com-button>
			</view>

			<view class="mid-wapper">
				<view class="item-wapper">
					<text>车辆信息</text>
				</view>
				<view class="item-wapper">
					<view class="spinner-wapper">
						<view class="spinner" @click="showPlate">
							<text style="color: #FFFFFF;">{{plateNum}}</text>
							<image class="icon" src="../../static/icons/spinnerR.png"></image>
						</view>
						<view class="spinnerWhite" @click="showZM">
							<text>{{plateZm}}</text>
							<image class="icon" src="../../static/icons/spinnerRGray.png"></image>
						</view>
						<input class="plate-num" type="text" placeholder="请输入车牌号" maxlength="5"/>
					</view>
					<view class="camera-wapper">
						<uni-icons type="camera-filled" size="30"></uni-icons>
					</view>
				</view>
				
				<view class="item-wapper">
					<view class="com-spinner">
						<view class="uni-list-cell-db">
							<picker mode="selector" @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input">{{array[index].name}}</view>
							</picker>
						</view>
						<!-- <text class="holder" v-show="!vehicleType">请选择车型</text>
						<text v-show="vehicleType">{{vehicleType}}</text> -->
						<image class="icon" src="../../static/icons/spinnerRGray.png"></image>
					</view>
					<view class="com-spinner">
						<text class="holder" v-show="!vehichleZx">请选择轴型</text>
						<text v-show="vehichleZx">{{vehichleZx}}</text>
						<image class="icon" src="../../static/icons/spinnerRGray.png"></image>
					</view>
				</view>
				
			</view>
			<plateNumber ref="plate" v-model="plateNum" @showOrHide="showOrHide"></plateNumber>
			<plateZM ref="plateZM" v-model="plateZm" @showOrHide="showOrHide"></plateZM>
		</view>
	</scroll-view>
</template>

<script>
	import plateNumber from "@/components/plate-number/plateNumber.vue"
	import plateZM from "@/components/plate-number/plate-zm.vue"
	export default {
		data() {
			return {
				plateNum: '赣', //输入的车牌号
				plateZm:'A',
				vehicleType:'',
				vehichleZx:'',
				array: [{name:'中国'},{name: '美国'}, {name:'巴西'}, {name:'日本'}],
				index: 0,
			};
		},
		methods: {
			/**
			 * @desc 车牌选择关闭和打开
			 */
			showOrHide(falg) {
				this.isCursor = falg;
			},
			showPlate() {
				this.$refs.plateZM.close();
				this.$refs.plate.show();
			},
			showZM(){
				this.$refs.plate.close();
				this.$refs.plateZM.show();
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
			},
		},
		components: {
			plateNumber,
			plateZM
		}
	}
</script>

<style lang="scss">
	.station-wapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #FFFFFF;
		padding: $uni-spacing-row-base;
		align-items: center;
	}

	.record-wapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: $yellow;
		padding: $uni-spacing-row-base;
		align-items: center;
		margin-top: $uni-spacing-row-lg;
	}

	.mid-wapper {
		margin-top: $uni-spacing-row-lg;
		display: flex;
		padding: $uni-spacing-row-base;
		flex-direction: column;
		background-color: #FFFFFF;
	}

	.item-wapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: $uni-spacing-row-mid;
	}

	.spinner-wapper {
		display: flex;
		flex-direction: row;
	}

	.spinner {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: $center_blue;
		// height: $uni-block-height;
		width: $uni-block-width-mid;
		border-top-left-radius: $uni-border-radius-base;
		border-bottom-left-radius: $uni-border-radius-base;
		
	}

	.spinnerWhite {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		width: $uni-block-width-mid;
		border-top: solid 1px $uni-border-color;
		border-bottom: solid 1px $uni-border-color;
	}

	.icon {
		width: $uni-img-size-min;
		height: $uni-img-size-min;
		margin: $uni-spacing-row-sm;
	}
	.plate-num{
		border-top: solid 1px $uni-border-color;
		border-bottom: solid 1px $uni-border-color;
		border-right: solid 1px $uni-border-color;
		border-top-right-radius: $uni-border-radius-base;
		border-bottom-right-radius: $uni-border-radius-base;
		height: $uni-block-height;
		width: 380rpx;
	}
	.camera-wapper{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: $uni-block-height;
		height: $uni-block-height;
		border: solid 1px $uni-border-color;
		border-radius:$uni-border-radius-base ;
	}
	.com-spinner{
		height: $uni-block-height;
		width: 44%;
		border: solid 1px $uni-border-color;
		border-radius:$uni-border-radius-base ;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-left: $uni-spacing-row-mid;
		padding-right: $uni-spacing-row-mid;
	}
	.holder{
		color: $uni-text-color-placeholder;
	}
</style>
