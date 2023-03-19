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
					prop="date"
					label="日期"
					width="180">
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

			}
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
		}

	},

}
</script>

<style scoped>

</style>