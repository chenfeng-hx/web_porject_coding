/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “通用后台管理系统” 中
 *    于 2023-03-19 11:00:49 编写而成！
 *    祝你食用愉快！！！
 */
import { Axios } from "axios";

const http = new Axios({
	baseURL: '/api',
	timeout: 10000,
})

export default http