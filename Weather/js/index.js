/*
##查询天气应用##
1. 回车查询
	- 按下回车(v-on.enter)
	- 查询数据(axios接口 v-model)
	- 渲染数据(v-for 数组 that)
接口：http://wthcdn.etouch.cn/weather_mini
	- 参数: city
*/
var app = new Vue({
	el: "#app",
	data: {
		city: "",
		weatherList: [{
			wea: "晴",
			tem1: 37,
			tem2: 24,
			day: "24日（星期五）"
		},{
			wea: "多云",
			tem1: 37,
			tem2: 24,
			day: "25日（星期六）"
		},{
			wea: "多云转雷阵雨",
			tem1: 37,
			tem2: 24,
			day: "26日（星期日）"
		},{
			wea: "阴",
			tem1: 37,
			tem2: 24,
			day: "27日（星期一）"
		},{
			wea: "多雨",
			tem1: 37,
			tem2: 24,
			day: "28日（星期二）"
		},]
	},
	methods: {
		searchWeather: function() {
			var that = this
			// alert("天气查询")
			// console.log(this.city)
			// 调用接口
			axios.get("http://www.tianqiapi.com/api?version=v9&appid=82136948&appsecret=q3atkYkJ&city="+this.city).then(function(response) {
				// console.log(response);
				that.weatherList = response.data.data.slice(0, 5)
			}).catch(function(err){})
		},
		changeWeather: function(city) {
			this.city = city
			this.searchWeather()
		}
	}
})