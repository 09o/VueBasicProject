/*
	记事本功能
	1. 新增
		- 生成列表结构（v-for数组）
		- 获取用户输入（v-model）
		- 回车，新增数据（v-on.enter)
	2. 删除
		- v-on splice index
	3. 统计
		-v-text
	4. 清空
		-v-on
	5. 隐藏
		-v-show -v-if
*/

var note = new Vue({
	el: "#note",
	data: {
		list: ["吃饭", "睡觉", "打豆豆"],
		inputValue: ""
	},
	methods: {
		add: function() {
			this.list.push(this.inputValue)
			this.inputValue = ""
		},
		remove: function(index) {
			this.list.splice(index, 1)
		},
		clear: function() {
			this.list = []
		}
	}
})