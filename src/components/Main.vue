<template>
	<div id="NavAside">
		<el-container>
			<el-aside width="auto">
				<!--侧边栏菜单条-->
				<NavAside></NavAside>
			</el-aside>
			<el-container>
				<!--头部-->
				<el-header><Header></Header></el-header>
				<!--标签栏-->
				<Tags></Tags>
				<!--主体内容-->
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
//引入标签栏组件
import Tags from "@/components/Tags.vue";
export default {
	name: "Main",
	components: {
		Tags,
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