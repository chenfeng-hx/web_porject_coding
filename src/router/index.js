import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from '@/components/Home.vue'
import user from '@/components/User.vue'
import Main from "@/components/Main.vue";
import Mall from "@/components/Mall.vue";
import PageOne from "@/components/PageOne.vue";
import PageTwo from "@/components/PageTwo.vue";

const routes = [
	{
		path: '/',
		redirect: '/home',
		component: Main,
		children: [
			{ path: 'home', component: home },   // 首页
			{ path: 'user', component: user },   // 用户页
			{ path: 'mall', component: Mall },    // 商品管理
			{ path: 'pageOne', component: PageOne },  // 页面1
			{ path: 'pageTwo', component: PageTwo }   // 页面2
		]
	}
]

const router = new VueRouter({
	routes,
})

// 暴露路由实例
export default router