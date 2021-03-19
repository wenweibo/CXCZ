<!-- 视频预览页面 -->
<template>
	<view class="container">
		<video class="media" id="myVideo" :src="path" controls></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				path: ''
			}
		},
		onLoad(param) {
			this.title = param.title;
			this.path = param.path;
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		onReady() {
			// 页面首次渲染完成，去获得视频的上下文，以便后续操作
			this.videoContext = uni.createVideoContext('myVideo');
			this.videoContext.play();
		},
		onHide() {
			// 页面隐藏，则停止播放视频
			this.videoContext.pause();
		},
		onShow() {
			// 当页面再次显示，则继续播放视频
			if (this.videoContext) {
				this.videoContext.play();
			}
		}
	}
</script>

<style>
	.container {
		height: 100%;
		background-color: #000000;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.media {
		width: 100%;
		height: 100%;
	}
</style>
