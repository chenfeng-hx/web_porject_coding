<template>
	<div>
		<el-row>
			<!-- 通过span的值进行分栏的占比划分，12:12为左右各一半的分布 -->
			<!-- 引用 layout 布局，并使用 card 组件 -->
			<el-col :span="8" style="padding-right: 10px;">
				<!-- 个人信息卡片 -->
				<el-card class="box-card">
					<div class="user">
						<img src="../assets/images/head_img.jpg" alt="">
						<div class="user-info">
							<p class="name">Admin</p>
							<p class="access">超级管理员</p>
						</div>
					</div>
					<div class="login-info">
						<p>上次登录时间：<span> 2021-7-19</span></p>
						<p>上次登录地点： <span>武汉</span></p>
					</div>
				</el-card>
				<!-- 数据信息卡片 -->
				<el-card style="margin-top: 20px; height: 460px">
					<el-table
						:data="tableData"
						style="width: 100%">
						<el-table-column
							:prop="item.name"
							:label="item.label"
							width="auto"
							v-for="item in labelData" :key="item.name">
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="16" style="padding-left: 10px;">
				<!--右侧顶部卡片渲染 -->
				<div class="num">
					<el-card v-for="item in conutDate" :key="item.name" :body-style="{ display: 'flex', padding: 0,}">
						<i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color, }"></i>
						<div class="detail">
							<p class="price">￥{{ item.value }}</p>
							<p class="desc">{{ item.name }}</p>
						</div>
					</el-card>
				</div>
				<!-- 折线图 -->
				<el-card style="height: 230px">
					<div ref="echarts1" class="echat1"></div>
				</el-card>
				<!-- 下方的两个图表 -->
				<div class="graph">
					<el-card>
						<!-- 柱状图 -->
						<div class="echat2" ref="echarts2"></div>
					</el-card>
					<el-card>
						<!-- 饼状图 -->
						<div ref="echarts3" class="echat3"></div>
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import User from "@/components/User.vue";
import { getData } from '../api';
import * as echarts from "echarts";
export default {
	name: "Home",
	components: {User},
	data() {
		return {
			tableData: [
				{
					name: 'oppo',
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800
				},{
					name: 'vivo',
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800
				},{
					name: '三星',
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800
				},{
					name: '魅族',
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800
				},{
					name: '苹果',
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800
				},{
					name: '小米',
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800
				},
			],
			labelData: [
				{
					label: '课程',
					name: 'name',
				},	{
					label: '今日购买',
					name: 'todayBuy',
				},	{
					label: '本月购买',
					name: 'monthBuy',
				},	{
					label: '总购买',
					name: 'totalBuy',
				},
			],
			conutDate: [
				{
					name: '今日支付订单',
					value: 1234,
					icon: 'success',
					color: '#2ec7c9',
				},
				{
					name: '今日收藏订单',
					value: 210,
					icon: 'star-on',
					color: '#ffb980',
				},
				{
					name: '今日未支付订单',
					value: 1234,
					icon: 's-goods',
					color: '#5ab1ef',
				},
				{
					name: '本月支付订单',
					value: 1234,
					icon: 'success',
					color: '#2ec7c9',
				},
				{
					name: '本月收藏订单',
					value: 210,
					icon: 'star-on',
					color: '#ffb980',
				},
				{
					name: '本月未支付订单',
					value: 1234,
					icon: 's-goods',
					color: '#5ab1ef',
				}
			],
		}
	},
	mounted() {
		// getData().then(data => {
		// 	console.log(data);
		// })
		// 折线图
		// 基于准备好的dom， 初始化 echarts 实例
		const echarts1 = echarts.init(this.$refs.echarts1);
		// 配置选项
		let echarts1Ooptions = {
				tooltip: {},
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: 'Step Start',
						type: 'line',
						step: 'start',
						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: 'Step Middle',
						type: 'line',
						step: 'middle',
						data: [220, 282, 201, 234, 290, 430, 410]
					},
					{
						name: 'Step End',
						type: 'line',
						step: 'end',
						data: [450, 432, 401, 454, 590, 530, 510]
					}
				]
			};
		// 绘制图表
		echarts1.setOption(echarts1Ooptions);

		// 柱状图
		const echarts2 = echarts.init(this.$refs.echarts2)
		const options2 = {
			xAxis: {
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {},
			series: [
				{
					type: 'bar',
					data: [23, 24, 18, 25, 27, 28, 25]
				},
				{
					type: 'bar',
					data: [26, 24, 18, 22, 23, 20, 27]
				}
			]
		}
		echarts2.setOption(options2);

		// 饼状图
		const echarts3 = echarts.init(this.$refs.echarts3)
		const opption3 = {
			series: [
				{
					type: 'pie',
					data: [
						{
							value: 335,
							name: '直接访问'
						},
						{
							value: 234,
							name: '联盟广告'
						},
						{
							value: 1548,
							name: '搜索引擎'
						}
					]
				}
			]
		}
		echarts3.setOption(opption3)
	}

}
</script>

<style scoped lang="less">
.user {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	margin-bottom: 20px;
	border-bottom: 1px solid #cccccc;
	img {
		margin-right: 40px;
		width: 150px;
		height: 150px;
		border-radius: 50%;
	}
	.user-info {
		.name {
			font-size: 32px;
			margin-bottom: 10px;
		}
		.access {
			color: #999999;
		}
	}
}
.login-info {
	line-height: 28px;
	font-size: 14px;
	color: #999999;
	span {
		color: #666666;
		margin-left: 60px;
	}
}
.num {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.icon {
		font-size: 30px;
		width: 80px;
		height: 80px;
		text-align: center;
		line-height: 80px;
		color: #ffffff;
	}
	.detail {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 15px;
		.price {
			font-size: 30px;
			margin-bottom: 10px;
			height: 30px;
		}
		.desc {
			font-size: 14px;
			color: #999999;
			text-align: center;
		}
	}
	.el-card {
		width: 32%;
		margin-bottom: 20px;
	}
}
.graph {
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	.el-card {
		height: 260px;
		width: 48%;
	}
}
.echat1 {
	width: 760px;
	height: 260px;
	position: relative;
	top: -34px;
	left: -20px;
}
.echat2, .echat3 {
	width: 400px;
	height: 300px;
	position: relative;
	top: -34px;
	left: -20px;
}
.echat3 {
	left: -50px;
}
</style>