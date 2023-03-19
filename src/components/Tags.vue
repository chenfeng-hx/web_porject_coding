<template>
	<!-- 注释 -->
	<!-- 用于渲染在 header 下方的跳转和删除标签 -->
	<div class="tag">
		<el-tag
			v-for="(tag, index) in tags"
			:key="tag.name"
			:closable="tag.name !== 'home'"
			:effect="$route.name === tag.name ? 'dark' : 'plain'"
			size: small
			@click="updateMenu(tag)"
			@close="handleClose(tag, index)"
			>
			{{tag.label}}
		</el-tag>
	</div>
</template>

<script>
/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “通用后台管理系统” 中
 *    于 2023-03-19 15:06:24 编写而成！
 *    祝你食用愉快！！！
 */

import { mapState, mapMutations } from "vuex";
export default {
	name: "Tags",
	data() {
		return {

		}
	},
	computed: {
		...mapState({
			tags: state => state.home.tabslist
		})
	},
	methods: {
		// 将 mutilation 中的方法解析出来
		...mapMutations(['closeTag']),
		// 点击 tag标签进行跳转
		updateMenu(item) {
			this.$router.push(item.path)
		},
		// 点击 tag继续删除
		handleClose(item, index) {
			// 调用 store 中的 mutilations 中的方法
			this.closeTag(item)
			// 因为此时的 tags 的长度已经被删去了一条，所以不需要减一
			let length = this.tags.length;
			// 删除之后的跳转逻辑
			if (item.name !== this.$route.name) {
				return
			}
			// 表示的是删除最后一项
			if (index === length) {
				this.$router.push({
					name: this.tags[index - 1].name
				})
			}
		}
	}
}
</script>

<style scoped lang="less">
.tag {
	padding: 20px;
	.el-tag {
		margin-right: 15px;
		cursor: pointer;
	}
}
</style>