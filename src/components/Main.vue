<template>
	<div id="NavAside">
		<el-container>
			<el-aside width="200px">
				<NavAside></NavAside>
			</el-aside>
			<el-container>
				<el-header><Header></Header></el-header>
				<el-main>
					<!--子组件的出口-->
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
//引入侧边栏组件
import NavAside from "@/components/NavAside.vue";
//引入头部组件
import Header from "@/components/Header.vue";
export default {
	name: "Main",
	components: {
		NavAside,
		Header
	}
}
</script>

<style lang="less" scoped>
#NavAside {
	width: 100%;
	height: 100%;
}
.el-header {
	padding: 0;
}
</style>