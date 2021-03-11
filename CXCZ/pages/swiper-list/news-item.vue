<template>
	<view class="container">
		<image class="portrait" src="../../static/icons/defaultimage.png" mode="aspectFill"></image>
		<view class="msg-container">
			<view class="title-container">
				<text class="title">{{options.carNumber}}</text>
				<text>货1</text>
				<uni-tag text="未阅读" size="small"></uni-tag>
			</view>
			<view class="station-wapper">
				<image class="icon" src="../../static/icons/station_icon.png"></image>
				<text class="station-text">{{options.leaveStationName}}</text>
			</view>
			<view class="station-wapper">
				<image class="icon" src="../../static/icons/clock_icon.png"></image>
				<text class="station-text">{{options.updateTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				portrait:"../../static/logo.png"
			};
		},
		props: {
			options: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		margin-bottom: $uni-spacing-row-base;
		margin-left: $uni-spacing-row-base;
		margin-right: $uni-spacing-row-base;
		padding: $uni-spacing-row-base;
		border-radius: $uni-border-radius-lg;
	}

	.portrait {
		width: $uni-img-size-main-lg;
		height: $uni-img-size-main-lg;
		border-radius: $uni-border-radius-base;
	}

	.msg-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: $uni-spacing-row-lg;
	}

	.title-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 460rpx;
	}

	.title {
		// font-size: $uni-font-size-lg;
		font-weight: bold;
	}

	.station-wapper {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.icon {
		width: $uni-img-size-base;
		height: $uni-img-size-base;
	}

	.station-text {
		font-size: $uni-font-size-lg;
		color: $uni-text-color-disable;
		margin-left: $uni-spacing-row-mid;
	}
</style>
