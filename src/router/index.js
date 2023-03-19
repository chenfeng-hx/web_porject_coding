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
			{ path: 'home', name: 'home', component: home },   // 首页
			{ path: 'user', name: 'user', component: user },   // 用户页
			{ path: 'mall', name: 'mall', component: Mall },    // 商品管理
			{ path: 'pageOne', name: 'page1', component: PageOne },  // 页面1
			{ path: 'pageTwo', name: 'page2', component: PageTwo }   // 页面2
		]
	}
]

const router = new VueRouter({
	routes,
})

// 暴露路由实例
export default router