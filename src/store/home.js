/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “vue2_demo” 中
 *    于 2023-03-14 09:02:25 编写而成！
 *    祝你食用愉快！！！
 */
export default {
	actions: {

	},
	mutations: {
		changeIsCollapse(state) {
			state.isCollapse = ! state.isCollapse
		},
		updateBreadTar(state, value) {
			console.log(value);
			// 判断添加的数据是否为首页
			if (value.name !== 'home') {
				const index = state.tabslist.findIndex(item => item.name === value.name);
				// 如果不存在
				if (index === -1) {
					state.tabslist.push(value);
				}
			}
		},
		// 进行 tag标签的删除功能
		closeTag(state, item) {
			const index = state.tabslist.findIndex(value => value.name === item.name)
			state.tabslist.splice(index, 1);
		},
		// 进行人员列表删除按钮的功能
		deleteUserInfo(state, { index, row }) {
			if (row.name === state.tableData[index].name) {
				state.tableData.splice(index, 1);
			}
		}
	},
	state: {
		isCollapse: false,   // 控制菜单栏的展开和闭合状态
		// 面包屑数据
		tabslist: [
			{
				path: '/',
				name: "home",
				label: "首页",
				icon: "s-home",
				url: "Home/Home",
			}
		],
		// 用户列表数据
		tableData: [
			{
				name: '王小虎',
				sex: '男',
				age: 17,
				birth: '2002-12-31',
				addr: '成华大道花园小区403号'
			},
			{
				name: '王晓华',
				sex: '男',
				age: 25,
				birth: '1882-12-31',
				addr: '北平小明区新华大道2号'
			},
		]
	}
}