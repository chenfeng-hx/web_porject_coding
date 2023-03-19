/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “通用后台管理系统” 中
 *    于 2023-03-19 11:10:13 编写而成！
 *    祝你食用愉快！！！
 */

import http from  '../utils/request'

// 请求首页数据
export const getData = () => {
	// 返回一个 promise 对象
	return http.get('/home/getData')
}