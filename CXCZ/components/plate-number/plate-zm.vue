<template>
	<!-- 车牌组件 -->
	<view class="plate-content">
		<view class="plate-popup" v-show="plateShow">
			<view class="plate-close" @click="close">
				<text style="margin-right: 30rpx;">关闭</text>
			</view>

			<view>
				
				<view class="plate-popup-item">
					<view class="plate-popup-item-list" :class="!isInputZh?'':''" v-for="item in keyEnInput1"
						@click="plateInput(item)">{{item}}</view>
				</view>
				<view class="plate-popup-item">
					<view class="plate-popup-item-list" :class="!isInputZh?'':''" v-for="item in keyEnInput2"
						@click="plateInput(item)">{{item}}</view>
				</view>
				<view class="plate-popup-item">
					<view class="plate-popup-item-list" :class="!isInputZh?'':''" v-for="item in keyEnInput3"
						@click="plateInput(item)">{{item}}</view>
					<!-- 车牌最后一位-->
					<!-- <view class="plate-popup-item-list"
						:class="(plateNumber.length===6 || plateNumber.length===7) &&!isInputZh?'':''"
						v-for="item in keyEnInput4" @click="plateLast(item)">{{item}}</view> -->
					<!-- 删除 -->
					<!-- <view class="plate-popup-item-list del" @click="plateDel">
                        <image :src="src" />
                    </view> -->
				</view>
			</view>

		</view>
		<!-- <button class="btn" type="button" @click="show" data-position="bottom">底部弹出 popup</button> -->

	</view>
</template>

<script>
	import plateDel from './plate-del.png'
	export default {
		data() {
			return {
				plateNumber: '', //输入的车牌
				platePlace: '', // 简称
				plateZm: '', //字母
				plateShow: false, //车牌选择是否打开
				keyVehicle1: ['京', '沪', '粤', '津', '冀', '豫', '云', '辽', '黑', '湘'],
				keyVehicle2: ['皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘'],
				keyVehicle3: ['晋', '蒙', '陕', '吉', '闽', '贵', '渝', '川'],
				keyVehicle4: ['青', '藏', '琼', '宁', '使'],
				keyNumber: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
				keyEnInput1: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
				keyEnInput2: ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
				keyEnInput3: ["U", "V", "W", "X","Y","Z"],
				keyEnInput4: ["港", "澳", "学"],
				isInputZh: false, //是否输入了特殊字符
				src: '',
				type: true
			};
		},

		mounted() {
			this.src = plateDel;
		},
		onShow() {},
		methods: {
			/**
			 * @desc 初始化
			 */
			init() {
				this.plateNumber = '';
			},
			/**
			 * @desc 打开下拉栏
			 */
			show(type) {
				this.type = type;
				this.plateShow = true;
				//传值到父组件
				this.$emit('showOrHide', true);
			},
			/**
			 * @desc 关闭弹出的车牌
			 */
			close() {
				this.plateShow = false;
				//传值到父组件
				this.$emit('showOrHide', false);
			},
			/**
			 * @desc 首字母选择
			 */
			plateHead(plate) {
				// if (!this.plateNumber) {
				console.log("--------" + plate);
				this.platePlace = plate;
				//与父组件双向绑定，传值到父组件
				this.$emit('input', this.platePlace);
				// }
			},
			/**
			 * @desc 字母选择
			 */
			plateInput(plate) {
				//判断是否输入了字母
				// if (this.isInputZh) {
				// 	return;
				// }
				// if (this.plateNumber.length < 8) {
				this.plateZm = plate;
				//与父组件双向绑定，传值到父组件
				this.$emit('input', this.plateZm);
				// }
			},
			/**
			 * @desc 数字选择
			 */
			plateNum(plate) {
				//判断是否输入了字母
				if (this.isInputZh) {
					return;
				}
				if (this.plateNumber.length >= 2 && this.plateNumber.length < 8) {
					this.plateNumber = this.plateNumber + plate;
					//与父组件双向绑定，传值到父组件
					this.$emit('input', this.plateNumber);
				}
			},
			/**
			 * @desc 最后一位选择
			 */
			plateLast(plate) {
				//判断是否输入了字母
				if (this.isInputZh) {
					return;
				}
				if (this.plateNumber.length === 6 || this.plateNumber.length === 7) {
					this.plateNumber = this.plateNumber + plate;
					this.isInputZh = true;
					//与父组件双向绑定，传值到父组件
					this.$emit('input', this.plateNumber);
				}
			},
			/**
			 * @desc 删除
			 */
			plateDel() {
				if (this.plateNumber) {
					this.plateNumber = this.plateNumber.substring(0, this.plateNumber.length - 1);
				}

				if (this.plateNumber.length === 6 || this.plateNumber.length === 7) {
					this.isInputZh = false;
				}
				//与父组件双向绑定，传值到父组件
				this.$emit('input', this.plateNumber);
			}
		}
	}
</script>

<style lang="scss">
	@import "./plateNumber.scss";
</style>
