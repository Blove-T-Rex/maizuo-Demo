<template>
	<div id="mz_head">
		<!-- 阻止冒泡 -->
		<div class="menu" @tap.stop="handleMenuClick"><i class="iconfont icon-category"></i></div>
		<div class="title">{{headerTitle}}</div>
		<router-link to="/city" tag="div" class="city">大连 <i class="iconfont icon-moreunfold"></i></router-link>
		<div class="user"><i class="iconfont icon-account"></i></div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
	export default {
		name : 'mz-header',
		data(){
			return {};
		},
		methods : {
			handleMenuClick(){
				this.$store.commit('CHANGE_HEADER_SHOW', !this.$store.state.isHeaderShow)
			}
		},
		computed :{
			...mapState(['headerTitle'])
		}
	}
</script>

<style>
#mz_head{ width:100%; height:50px; background:#282828; position: fixed; left: 0; top: 0; display: flex; line-height: 50px; color:#999999; text-align: center; z-index:10;}
#mz_head .menu{ width: 50px; height: 50px; border-right: #333333 solid 1px; }
#mz_head .menu i{ font-size:26px; }
#mz_head .title{ flex:1; color:white; padding-left: 15px; text-align: left;}
#mz_head .city{ width:80px; }
#mz_head .user{ width:50px; }
</style>