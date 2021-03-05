<template>
	<view class="content">
		<radio-group class="radio-group">
			<label v-for="shift in shiftList">
				<shift-radio :scheduleObj="shift"></shift-radio>
			</label>
		</radio-group>
	</view>
</template>

<script>
	import shiftRadio from "../../components/shiftRadio.vue"
	export default {
		data() {
			return {
				shiftList:[]
			}
		},
		onLoad() {
			uni.request({
				url:this.serverUrl + "cxcz/schedule/list.action",
				method:"POST",
				data:{},
				success: res => {
					console.log(res);
					if(res.statusCode == 200){
						if(res.data.head.ret.retCode == "000000"){
							this.shiftList = res.data.body;
						}else{
							uni.showToast({
								duration:2000,
								title:res.errMsg,
								mask:true,
								icon:"none"
							})
						}
					}
				},
				fail: () => {
					uni.showToast({
						duration:2000,
						title:"登录失败",
						mask:true,
						icon:"none"
					})
				},
				complete: () => {
					uni.hideLoading();
				}
			})
		},
		methods: {
			
		},
		components: {
			shiftRadio
		}
	}
</script>

<style lang="scss">
	.content{
		padding: $uni-spacing-row-lg;
		height: 100%;
	}
	.radio-group{
		background-color: #FFFFFF;
		border: solid 1px #FFFFFF;
		border-radius: $uni-spacing-col-lg;
	}
</style>
