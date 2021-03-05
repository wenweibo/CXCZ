<template name="shiftRadio">
	<view>
		<view class="content">
			<image class="img" src="../static/icons/shift_icon.png"></image>
			<text class="title">{{scheduleObj.scheduleName}}</text>
			<text class="remind">{{scheduleObj.startTime}} —— {{scheduleObj.endTime}}</text>
			<radio :value="scheduleObj.scheduleId" />
		</view>
		<dividerLine></dividerLine>
	</view>

</template>

<script>
	import dividerLine from "./divider-line.vue"
	export default {
		name: "shiftRadio",
		data() {
			return {
			
			};
		},
		props:{
			scheduleObj:{}
		},
		components: {
			dividerLine
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.title{
		font-size: $uni-font-size-lg;
	}
	.remind{
		font-size: $uni-font-size-lg;
		color: $uni-text-color-placeholder;
	}
	.img {
		width: $uni-img-size-base;
		height: $uni-img-size-base;
	}
</style>
