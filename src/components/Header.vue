<template>
	<div class="head-container">
		<!-- 左侧功能区 -->
		<div class="l-content">
			<el-button style="margin-right: 20px;" icon="el-icon-menu" size="mini" @click="changeNavSide"></el-button>
			<!-- 面包屑导航 -->
			<el-breadcrumb separator-class="el-icon-arrow-right" class="breadNav">
				<el-breadcrumb-item v-for="item in tabs" :key="item.name" :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 右侧个人中心 -->
		<div class="r-content">
			<el-dropdown>
				<span class="el-dropdown-link">
					<img src="../assets/images/head_img.jpg" alt="个人信息">
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>个人中心</el-dropdown-item>
					<el-dropdown-item>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Header",
	methods: {
		changeNavSide() {
			this.$store.commit('changeIsCollapse')
		}
	},
	computed: {
		...mapState({
			tabs: state => state.home.tabslist
		})
	},
	mounted() {
		// console.log(this.tabs, 'tags');
	}
}

</script>

<style scoped lang="less">
.head-container {
	padding: 0 20px;
	background-color: #333333;
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.breadNav {
		font-size: 14px;
		color: #ffffff;
		margin-left: 10px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
		img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
	}
	.el-icon-arrow-down {
		font-size: 12px;
	}
	.l-content {
		display: flex;
		align-items: center;
		/deep/.el-breadcrumb__item {
			.el-breadcrumb__inner {
				font-weight: normal;
				&.is-link {
					color: #ffffff;
				}
			}
		}
	}
}

</style>