<!-- 超限上报页面 -->
<template>
	<scroll-view style="height: 100%;" scroll-y="true">
		<view>
			<view class="station-wapper">
				<text style="width: 33%;text-align: left;">{{userOrgName}}</text>
				<text style="width: 33%;text-align: center;">时间 {{time}}</text>
				<text style="width: 33%;text-align: right;">{{personName}}</text>
			</view>

			<view class="record-wapper" :class="bgClassName">
				<text style="color: #FFFFFF;">该车辆有超限记录</text>
				<com-button :font-size="25" size="small" type="danger" :color="btnColor" @click="lookDetail">查看详情
				</com-button>
			</view>

			<view class="mid-wapper">
				<view class="item-wapper">
					<text class="title">车辆信息</text>
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
						<input class="plate-num" type="text" placeholder="请输入车牌号" maxlength="5" />
					</view>
					<view class="camera-wapper">
						<uni-icons type="camera-filled" size="30"></uni-icons>
					</view>
				</view>

				<view class="item-wapper">
					<view class="com-spinner">
						<view class="uni-list-cell-db">
							<picker mode="selector" @change="bindPickerChange" :value="cxIndex" :range="cxArray"
								range-key="value">
								<view class="uni-input">{{cxArray[cxIndex].value}}</view>
							</picker>
						</view>
						<text v-show="vehicleType">{{vehicleType}}</text>
						<image class="icon" src="../../static/icons/spinnerRGray.png"></image>
					</view>
					<view class="com-spinner">
						<view class="uni-list-cell-db">
							<picker mode="selector" @change="bindPickerChange2" :value="zsIndex" :range="zsArray"
								range-key="value">
								<view class="uni-input">{{zsArray[zsIndex].value}}</view>
							</picker>
						</view>
						<image class="icon" src="../../static/icons/spinnerRGray.png"></image>
					</view>
				</view>

				<view class="item-wapper item-wapper-input">
					<input type="number" placeholder="请输入车辆总重" maxlength="5" />
					<text>kg</text>
				</view>

				<view class="cp-wapper">
					<text class="title">车牌颜色</text>
					<view class="cp-content">
						<helangCheckbox ref="checkbox" @change="cpChange"></helangCheckbox>
					</view>
				</view>
				<dividerLine class="line"></dividerLine>

				<view class="cp-wapper">
					<text class="title">三证信息</text>
					<view class="media-wapper">
						<view class="media-container" v-for="(imgItem,index) in threeCardInfo" :key="index">
							<view class="media-container-nobored" v-if="imgItem.img == ''"
								@tap="toCamera(index,threeCardInfo)">
								<image class="img-camera" src="../../static/icons/camera.png"></image>
								<text class="holder">{{imgItem.name}}</text>
							</view>
							<view v-else class="media-container-img">
								<image class="img-img" :src="imgItem.img" @tap="previewImage(index,threeCardInfo)">
								</image>
								<view class="close-view" @click="close(index,threeCardInfo)">-</view>
							</view>
						</view>
						<view class="media-container media-bg">
							<text class="holder remind">三证信息必\n须拍摄清晰\n，照片能看\n清证件内容</text>
						</view>
					</view>
				</view>
				<dividerLine class="line"></dividerLine>

				<view class="cp-wapper">
					<text class="title">车辆照片</text>
					<view class="media-wapper">
						<view class="media-container" v-for="(imgItem,index) in carPhoto" :key="index">
							<view class="media-container-nobored" v-if="imgItem.img == ''"
								@tap="toCamera(index,carPhoto)">
								<image class="img-camera" src="../../static/icons/camera.png"></image>
								<text class="holder">{{imgItem.name}}</text>
							</view>
							<view v-else class="media-container-img">
								<image class="img-img" :src="imgItem.img" @tap="previewImage(index,carPhoto)"></image>
								<view class="close-view" @click="close(index,carPhoto)">-</view>
							</view>
						</view>
						<view class="media-container media-bg">
							<text class="holder remind">车辆拍摄必\n须拍摄清晰\n照片能看清\n车辆与车牌</text>
						</view>
					</view>
				</view>
				<dividerLine class="line"></dividerLine>

				<view class="cp-wapper">
					<text class="title">车辆视频</text>
					<view class="media-wapper">
						<view class="media-container" v-for="(imgItem,index) in carVideo" :key="index">
							<view class="media-container-nobored" v-if="imgItem.img == ''"
								@tap="toVideo(index,carVideo)">
								<image class="img-camera" src="../../static/icons/video.png"></image>
								<text class="holder">{{imgItem.name}}</text>
							</view>
							<view v-else class="media-container-img">
								<!-- <video class="img-img" :src="imgItem.img" @play="playMe"
									:data-playIndex="imgItem.img"></video> -->
								<image class="img-img" src="../../static/icons/play.png" @tap="previewVideo(imgItem)"></image>
								<view class="close-view" @click="close(index,carVideo)">-</view>
							</view>
						</view>
						<view class="media-container media-bg">
							<text class="holder remind">车辆视频必\n须能清楚识\n别车辆与车\n牌且需声音</text>
						</view>
					</view>
				</view>

			</view>

			<view class="mid-wapper">
				<view class="item-wapper">
					<text class="title">驾驶员信息</text>
				</view>

				<view class="item-wapper margin-bottomLg item-wapper-input">
					<input type="number" placeholder="请输入驾驶员手机号" maxlength="11" />
				</view>
				<dividerLine class="line"></dividerLine>

				<view class="cp-wapper">
					<text class="title">告知书照片与超重信息照片</text>
					<view class="media-wapper">
						<view class="media-container" v-for="(imgItem,index) in noticePhoto" :key="index">
							<view class="media-container-nobored" v-if="imgItem.img == ''"
								@tap="toCamera(index,noticePhoto)">
								<image class="img-camera" src="../../static/icons/camera.png"></image>
								<text class="holder">{{imgItem.name}}</text>
							</view>
							<view v-else class="media-container-img">
								<image class="img-img" :src="imgItem.img" @tap="previewImage(index,noticePhoto)">
								</image>
								<view class="close-view" @click="close(index,noticePhoto)">-</view>
							</view>
						</view>

						<view class="media-container-no-border">
						</view>
						<view class="media-container-no-border">
						</view>
					</view>
				</view>
				<dividerLine class="line"></dividerLine>

				<view class="cp-wapper">
					<text class="title">驶离收费站点</text>
					<view class="com-spinner com-spinner-auto">
						<view class="uni-list-cell-db">
							<picker mode="selector" @change="bindPickerChangeSL" :value="slIndex" :range="slArray"
								range-key="value">
								<view class="uni-input">{{slArray[slIndex].value}}</view>
							</picker>
						</view>
						<!-- <text v-show="vehicleType">{{vehicleType}}</text> -->
						<image class="icon" src="../../static/icons/spinnerRGray.png"></image>
					</view>
				</view>

				<com-button type="info" @click="submitRegister" class="subBtn">确认上报</com-button>
			</view>


			<plateNumber ref="plate" v-model="plateNum" @showOrHide="showOrHide"></plateNumber>
			<plateZM ref="plateZM" v-model="plateZm" @showOrHide="showOrHide"></plateZM>
		</view>
	</scroll-view>
</template>

<script>
	import plateNumber from "@/components/plate-number/plateNumber.vue";
	import plateZM from "@/components/plate-number/plate-zm.vue";
	import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"
	import dividerLine from "@/components/divider-line.vue"
	import {
		isNull
	} from '@/common/util.js';
	export default {
		data() {
			return {
				title:'',
				bgClassName:'',
				btnColor:'',
				userOrgName:'',
				time:'',
				personName:'',
				plateNum: '赣', //输入的车牌号
				plateZm: 'A',
				vehicleType: '',
				vehichleZx: '',
				cxArray: [],
				cxIndex: 0,
				zsArray: [],
				zsIndex: 0,
				cpys: [],
				slArray: [],
				slIndex: 0,
				threeCardInfo: [{
						"name": "行驶证",
						"img": ""
					},
					{
						"name": "驾驶证",
						"img": ""
					},
					{
						"name": "运营证",
						"img": ""
					}
				],
				carPhoto: [{
						"name": "车头照片",
						"img": ""
					},
					{
						"name": "车身照片",
						"img": ""
					},
					{
						"name": "车尾照片",
						"img": ""
					}
				],
				noticePhoto: [{
						"name": "告知书照片",
						"img": ""
					},
					{
						"name": "超重信息照片",
						"img": ""
					}
				],
				carVideo: [{
						"name": "车辆视频",
						"img": ""
					},
					{
						"name": "车辆视频",
						"img": ""
					},
					{
						"name": "车辆视频",
						"img": ""
					}
				]
			};
		},
		onLoad(param) {
			this.cxArray = getApp().globalData.CX;
			this.zsArray = getApp().globalData.ZS;
			this.cpys = getApp().globalData.CPYS;
			this.slArray = getApp().globalData.SLSFZ;
			var userinfo = uni.getStorageSync("userinfo");
			this.userOrgName = userinfo.userOrgName;
			this.personName = userinfo.personName;
			this.title = param.title;
			uni.setNavigationBarTitle({
				title:this.title
			})
			if(this.title == "特殊车辆"){
				this.bgClassName = 'bgBlue';
				this.btnColor = `#0057b0`;
			}else{
				this.btnColor = `#ff7900`;
			}
		},
		onReady() {
			// 开启定时器，更新页面显示时间
			this.timer = setInterval(() => {
					var date = new Date();
					this.time = this.dateFormat("HH:MM",date)
				},1000);
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		mounted() {
			this.$refs.checkbox.set({
				type: 'radio', // 类型：单选框
				index: -1, // 默认选中的项
				column: 5, // 分列
				list: this.cpys // 列表数据
			});
			this.disabled = true;
		},
		methods: {
			dateFormat(fmt, date) {
			    let ret;
			    const opt = {
			        "Y+": date.getFullYear().toString(),        // 年
			        "m+": (date.getMonth() + 1).toString(),     // 月
			        "d+": date.getDate().toString(),            // 日
			        "H+": date.getHours().toString(),           // 时
			        "M+": date.getMinutes().toString(),         // 分
			        "S+": date.getSeconds().toString()          // 秒
			        // 有其他格式化字符需求可以继续添加，必须转化成字符串
			    };
			    for (let k in opt) {
			        ret = new RegExp("(" + k + ")").exec(fmt);
			        if (ret) {
			            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			        };
			    };
			    return fmt;
			},
			/**
			 * @desc 车牌选择关闭和打开
			 */
			showOrHide(falg) {
				this.isCursor = falg;
			},
			/**
			 * 显示车牌选择
			 */
			showPlate() {
				this.$refs.plateZM.close();
				this.$refs.plate.show();
			},
			/**
			 * 显示车牌字母选择
			 */
			showZM() {
				this.$refs.plate.close();
				this.$refs.plateZM.show();
			},
			/**
			 * 车型选择监听
			 * @param {Object} e
			 * @param {Object} i
			 */
			bindPickerChange: function(e, i) {
				this.cxIndex = e.detail.value
			},
			/**
			 * 轴型选择监听
			 * @param {Object} e
			 * @param {Object} i
			 */
			bindPickerChange2: function(e, i) {
				this.zsIndex = e.detail.value
			},
			/**
			 * 驶离收费站选择监听
			 * @param {Object} e
			 * @param {Object} i
			 */
			bindPickerChangeSL: function(e, i) {
				this.slIndex = e.detail.value
			},
			/**
			 * 车牌颜色选择监听
			 * @param {Object} data
			 */
			cpChange(data) {
				console.log("车牌颜色:" + data.key + "," + data.value);
			},
			submitRegister() {

			},
			/**
			 * 拍照方法
			 * @param {Object} index  当前拍照的位置
			 * @param {Object} imgArr 当前拍照存储数组
			 */
			toCamera(index, imgArr) {
				// let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //直接拍照
					success: function(res) {
						var imgItem = imgArr[index];
						imgItem.img = res.tempFilePaths[0];
					}
				});
			},
			/**
			 * 预览图片
			 * @param {Object} index 当前预览的位置
			 * @param {Object} imgArr 当前预览数组
			 */
			previewImage(index, imgArr) { 
				var imgList = [];
				// 因为预览照片必须是 Array<String> ,而页面存储的照片数组是Array<Object>,所以遍历转换
				for (var i = 0; i < imgArr.length; i++) {
					var img = imgArr[i].img;
					imgList.push(img);
				}
				// 去预览照片
				uni.previewImage({
					urls: imgList,
					current: imgList[index]
				});
			},
			/**
			 * 删除照片或视频
			 * @param {Object} index 当前需要删除的照片或视频的下标
			 * @param {Object} imgArr 当前需删除的媒体数组
			 */
			close(index, imgArr) {
				imgArr[index].img = "";
			},
			lookDetail() {},
			/**
			 * 视频录制
			 * @param {Object} index 当前启动视频录制的数组下标
			 * @param {Object} imgArr 当前存储视频的数组
			 */
			toVideo(index, imgArr) {
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera'],
					success: function(res) {
						imgArr[index].img = res.tempFilePath;
					}
				});
			},
			/**
			 * 视频预览
			 * @param {Object} e 视频对象
			 */
			previewVideo(e) {
				uni.navigateTo({
					url:"../registerDetail/videoPreview?title="+e.name+"&path="+e.img
				})
			}
		},
		components: {
			plateNumber,
			plateZM,
			helangCheckbox,
			dividerLine
		}
	}
</script>

<style lang="scss">
	.subBtn {
		margin-top: $uni-spacing-col-lg;
		margin-bottom: $uni-spacing-col-lg;
	}

	.title {
		color: $uni-text-color-title;
		font-size: $uni-font-size-lg;
	}

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
	.bgBlue{
		background-color: $center_blue;
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

	.margin-bottomLg {
		margin-bottom: $uni-spacing-row-lg;
	}

	.item-wapper-input {
		height: $uni-block-height;
		border: solid 1px $uni-border-color;
		border-radius: $uni-border-radius-base;
		padding-left: $uni-spacing-row-mid;
		padding-right: $uni-spacing-row-mid;
		align-items: center;
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

	.plate-num {
		border-top: solid 1px $uni-border-color;
		border-bottom: solid 1px $uni-border-color;
		border-right: solid 1px $uni-border-color;
		border-top-right-radius: $uni-border-radius-base;
		border-bottom-right-radius: $uni-border-radius-base;
		height: $uni-block-height;
		width: 380rpx;
	}

	.camera-wapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: $uni-block-height;
		height: $uni-block-height;
		border: solid 1px $uni-border-color;
		border-radius: $uni-border-radius-base;
	}

	.com-spinner {
		height: $uni-block-height;
		width: 44%;
		border: solid 1px $uni-border-color;
		border-radius: $uni-border-radius-base;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-left: $uni-spacing-row-mid;
		padding-right: $uni-spacing-row-mid;
	}

	.com-spinner-auto {
		width: auto;
	}

	.cp-wapper {
		display: flex;
		flex-direction: column;
		margin-bottom: $uni-spacing-row-lg;
	}

	.line {
		margin-bottom: $uni-spacing-row-mid;
	}

	.cp-content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.tag-wapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: solid 1px $uni-text-color-disable;
		border-radius: $uni-border-radius-base;
		width: 110rpx;
		margin: 10rpx 10rpx;
	}

	.media-wapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

	}

	.media-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: solid 1px $uni-border-color;
		border-radius: $uni-border-radius-base;
		width: 165rpx;
		height: 165rpx;
	}

	.media-container-nobored {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 165rpx;
		height: 165rpx;
	}

	.media-container-img {
		position: relative;
		width: 165rpx;
		height: 165rpx;
		// border: solid 1px $uni-border-color;
		// border-radius: $uni-border-radius-base;
	}

	.media-container-no-border {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 165rpx;
		height: 165rpx;
	}

	.media-bg {
		background-color: $uni-bg-color-grey;
	}

	.img-camera {
		width: 90rpx;
		height: 70rpx;
	}

	.img-img {
		width: 165rpx;
		height: 165rpx;
		border: solid 1px $uni-border-color;
		border-radius: $uni-border-radius-base;
	}

	.holder {
		color: $uni-text-color-disable;
		font-size: $uni-font-size-sm;
	}

	.remind {
		font-size: $uni-font-size-sm;
	}

	.close-view {
		text-align: center;
		line-height: 14px;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #FF5053;
		color: #FFFFFF;
		position: absolute;
		top: -6px;
		right: -4px;
		font-size: 12px;
	}
</style>
