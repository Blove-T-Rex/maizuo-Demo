import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);

var store = new vuex.Store({
	// 默认隐藏
	state : {
		isHeaderShow : false,
		headerTitle: '卖座电影',
		// cityTitle: '选择城市'
	},
	mutations : {
		CHANGE_HEADER_SHOW(state,payload){
			state.isHeaderShow = payload;
		},
		CHANGE_HEADER_TITLE(state,payload){
			state.headerTitle = payload;
		}
	}
});

export default store;

// 状态管理，可以管理所有组件的状态