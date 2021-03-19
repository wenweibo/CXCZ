<template name="failPage">
	<view class="fail-content">
		<text class="text">{{msg}}</text>
		<button  type="default" plain="true" @tap="btnClick">点击重试</button>
	</view>
</template>

<script>
	export default {
		name:"failPage",
		data() {
			return {
				
			};
		},
		props:{
			msg:""
		},
		methods:{
			btnClick() {
				if (this.disabled) return false;
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss">
	.fail-content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.text{
		font-size:$uni-font-size-lg ;
		color: $uni-text-color-placeholder;
		margin-bottom: $uni-spacing-col-lg;
	}
	
</style>
