<template>
	<div class="head-container">
		<!-- 左侧功能区 -->
		<div class="l-content">
			<el-button icon="el-icon-menu" size="mini"></el-button>
			<!-- 面包屑导航 -->
			<span class="breadNav">首页</span>
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
export default {
	name: "Header"
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
}
</style>