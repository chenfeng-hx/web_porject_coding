/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “通用后台管理系统” 中
 *    于 2023-03-19 11:25:53 编写而成！
 *    祝你食用愉快！！！
 */
import Mock from "mockjs";

// 定义 mock 请求拦截
Mock.mock('/api/home/getData', function () {
	// 拦截到请求后的处理逻辑
	// console.log('拦截到了');
});