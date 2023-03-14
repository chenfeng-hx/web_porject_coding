<template>
	<div>
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
		background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<h3>通用后台管理系统</h3>
			<!-- 没有子菜单的导航 -->
			<el-menu-item @click="toUrl(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
				<i :class="`el-icon-${item.icon}`"></i>
				<span slot="title">{{ item.label }}</span>
			</el-menu-item>
			<!-- 有子菜单的导航 -->
			<el-submenu :index="item.name" v-for="item in hasChildren" :key="item.path">
				<!-- 父导航 -->
				<template slot="title">
					<i :class="`el-icon-${item.icon}`"></i>
					<span>{{ item.path }}</span>
				</template>
				<!-- 子选项 -->
				<el-menu-item-group v-for="child in item.children" :key="child.name">
					<el-menu-item @click="toUrl(child)" :index="child.name">{{ child.label }}</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
export default {
	name: "NavAside",
	data() {
		return {
			isCollapse: false,
			menuData: [
				{
					path: '/',
					name: 'home',
					label: '首页',
					icon: 's-home',
					url: 'Home/Home'
				},
				{
					path: '/mall',
					name: 'mall',
					label: '商品管理',
					icon: 'video-play',
					url: 'MallManage/MallManage'
				},
				{
					path: '/user',
					name: 'user',
					label: '用户页',
					icon: 'user',
					url: 'UserManage/UserManage'
				},
				{
					path: '其他',
					name: 'location',
					icon: 'eleme',
					children: [
						{
							path: '/pageOne',
							name: '/page1',
							label: '页面1',
							icon: 'setting',
							url: 'Other/PageOne'
						},
						{
							path: '/pageTwo',
							name: '/page2',
							label: '页面2',
							icon: 'setting',
							url: 'Other/PageTwo'
						},
					]
				},
			],

		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		toUrl(item) {
			if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
				this.$router.push(item.path);
			}
		}
	},
	computed: {
		//先对子菜单的数据进行过滤，找出其中有无子选项的数据
		noChildren() {
			return this.menuData.filter(item => !item.children)
		},
		hasChildren() {
			return this.menuData.filter(item => item.children)
		}
	}
}
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
.el-menu {
	height: 100vh;
	border: 0;
	h3 {
		height: 45px;
		width: 100%;
		font-size: 19px;
		line-height: 50px;
		text-align: center;
	}
}
</style>