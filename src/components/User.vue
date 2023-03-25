<template>
	<div>
		<div class="user">
			<!--新建信息按钮对应的提示框-->
			<el-dialog
				title="提示"
				:visible.sync="dialogVisible"
				width="50%"
				:before-close="handleClose">
				<!--表单新建人员信息-->
				<el-form ref="form" :inline="true" :rules="rules" :model="form" label-width="80px">
					<!--姓名-->
					<el-form-item label="姓名" prop="name">
						<el-input v-model="form.name" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<!--年龄-->
					<el-form-item label="年龄" prop="age">
						<el-input v-model="form.age" placeholder="请输入年龄"></el-input>
					</el-form-item>
					<!--性别-->
					<el-form-item label="性别" prop="sex">
						<el-select v-model="form.sex" placeholder="请选择性别">
							<el-option label="男" value="1"></el-option>
							<el-option label="女" value="2"></el-option>
						</el-select>
					</el-form-item>
					<!--出生日期-->
					<el-form-item label="出生日期" prop="birth">
						<el-col>
							<el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
						</el-col>
					</el-form-item>
					<!--地址-->
					<el-form-item label="地址" prop="addr">
						<el-input v-model="form.addr" placeholder="请输入地址"></el-input>
					</el-form-item>
				</el-form>
				<!--底部回复确认零件-->
				<span slot="footer" class="dialog-footer">
					<el-button @click="resetForm('form')">重置</el-button>
					<el-button type="primary" @click="submitForm('form')">确 定</el-button>
				</span>
			</el-dialog>
			<!--header 头部盒子-->
			<div class="header">
				<!--新建信息按钮-->
				<el-button type="primary" @click="dialogVisible = true">+ 新增</el-button>
				<!--搜索框-->
			</div>
			<!--具体的人员列表-->
			<el-table
				:data="tableData"
				style="width: 100%">
				<el-table-column
					v-for="item in labels"
					:key="item.label"
					:prop="item.data"
					:label="item.label"
					width="auto">
				</el-table-column>
				<!--自定义列表-->
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button
							size="mini"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	name: "User",
	data() {
		return {
			dialogVisible: false,
			// 新建表单数据相关
			form: {
				name: '',
				age: '',
				sex: '',
				addr: '',
				birth: ''
			},
			rules: {
				name: {required: true, message: '请输入活动名称', trigger: 'blur'},
				age: {required: true, message: '请输入年龄', trigger: 'change'},
				sex: {required: true, message: '请输入性别', trigger: 'blur'},
				addr: {required: true, message: '请输入地址', trigger: 'blur'},
				birth: {required: true, message: '请输入生日', trigger: 'blur'},
			},
			// 动态渲染表格的行信息
			labels: [
				{
					label: '姓名',
					data: 'name'
				},
				{
					label: '性别',
					data: 'sex'
				},
				{
					label: '年龄',
					data: 'age'
				},
				{
					label: '出生日期',
					data: 'birth'
				},
				{
					label: '地址',
					data: 'addr'
				},
			],
			modelType: 0,   // 数据新增和编辑使用同一模态框，只是内容不同  0 新增   1 编辑
		};
	},
	methods: {
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					this.resetForm('form');
					done();
				})
				.catch(_ => {});
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.form);
					this.dialogVisible = false;
					alert('submit!');
					this.resetForm('form');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 自定义列的操作方法
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			//调用方法删除vuex中的用户数据
			this.$store.commit('deleteUserInfo', {index, row});
			console.log(index, row);
		}

	},
	computed: {
		tableData() {
			return this.$store.state.home.tableData;
		}
	}

}
</script>

<style scoped>

</style>