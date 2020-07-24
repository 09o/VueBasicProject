
/*
== 综合应用 音乐播放
	- 歌曲搜索
	- 歌曲播放
	- 歌曲封面
	- 歌曲评论
	- 播放动画
	- MV播放
*/

/*
	1. 歌曲搜索
		- 按下回车(v-on.enter)
		- 查询数据(axios接口v-model)
		- 渲染数据(v-for数组that)

	请求地址: https://autumnfish.cn/search
	prop: keywords

	2. 歌曲播放
		- 点击播放(v-on)
		- 歌曲地址获取(song's id)
		- 歌曲地址设置(v-bind)
	请求地址：https://autumnfish.cn/song/url
	prop: id

	3. 歌曲封面
	请求地址：https://autumnfish.cn/song/detail
	prop: ids

	4. 歌曲评论
	请求地址：https://autumnfish.cn/comment/hot
	prop: {id}&type=0

	5. 播放动画
		- 监听音乐播放(v-on play)
		- 监听音乐暂停(v-on pause)
		- 操纵类名(v-bind 对象)

	6. MV播放
		- mv图标显示(v-if)
		- mv地址获取
		- 遮罩层
		- mv地址设置
	请求地址：https://autumnfish.cn/mv/url
	prop: id(mvid)
*/

var app = new Vue({
	el: "#app",
	data: {
		query: "",
		musicList: [],
		musicUrl: "",
		nowPlay: {
			songName: "Hioks Music",
			singer: "Hioks"
		},
		current: -1,
		picUrl: "./imgs/cover.png",
		hotComments: [],
		// 动画播放状态
		isPlaying: false,
		mvUrl: ""
		// isShow: false
	},
	methods: {
		searchMusic: function () {
			var that = this;
			axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(function (response) {
				// console.log(response)
				that.musicList = response.data.result.songs
			}, function (err) { })
			this.current = -1
		},
		playMusic: function (musicId, index) {
			var that = this
			// console.log(musicId);
			// 获取歌曲地址
			axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(function (response) {
				that.musicUrl = response.data.data[0].url
			}, function (err) { })
			// 获取歌曲详情
			axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(function (response) {
				// console.log(response)
				that.picUrl = response.data.songs[0].al.picUrl
				that.nowPlay.songName = response.data.songs[0].name
				that.nowPlay.singer = response.data.songs[0].ar[0].name
			}, function (err) { })
			// 获取歌曲评论
			axios.get("https://autumnfish.cn/comment/hot?id=" + musicId + "&type=0").then(function (response) {
				// console.log(response)
				that.hotComments = response.data.hotComments
			}, function (err) { })
			// 当前播放音乐
			that.current = index;
		},
		play: function () {
			// console.log("play")
			this.isPlaying = true
		},
		pause: function () {
			// console.log("pause")
			this.isPlaying = false
		},
		playMv: function (mvid) {
			var that = this
			// console.log(item.mvid);
			axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(function (response) {
				// console.log(response);
				that.mvUrl = response.data.data.url
				// that.isShow = true
			}, function (err) { })
		}
	}
})
