<template name="divider-line">
	<view class="line-wapper">
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		name:"divider-line",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.line-wapper{
		padding: 20upx;
	}
	.line{
		border-bottom:solid 1px;
		border-bottom-color: #DBDBDB;
	}
</style>
