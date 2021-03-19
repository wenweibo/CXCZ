<!-- 均匀分布式文本模板 -->
<template name="myText">
	<view class="text-container">
		<text v-for="c in textArr">{{c}}</text>
	</view>
</template>

<script>
	export default {
		name:"myText",
		data() {
			return {
				textArr:[]
			};
		},
		props:{
			text:''
		},
		created() {
			if(this.text.length>0){
				for (var i = 0; i < this.text.length; i++) {
					this.textArr.push(this.text.charAt(i));
				}
			}
		}
	}
</script>

<style>
	.text-container{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
