/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “vue2_demo” 中
 *    于 2023-03-14 08:46:24 编写而成！
 *    祝你食用愉快！！！
 */

import Vue from 'vue'
import Vuex from 'vuex'
// 引入 vuex 实例模块
import home from "@/store/home";

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		home,
	}
})

// 暴露 store
export default store