<template>
	<div id="mz_film">
		<div class="tab">
			<router-link to="/film/now-playing" tag="div">正在上映</router-link>
			<router-link to="/film/comming-soon" tag="div">即将上映</router-link>
		</div>
		<!-- 缓存组件，优化性能 -->
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>


	export default {
		name : 'mz-film',
		data(){
			return {};
		},
		activated(){
			this.$store.commit('CHANGE_HEADER_TITLE','卖座电影');
		}
	}
</script>

<style>
#mz_film{ margin-top: 80px; padding: 0 10px; box-sizing:border-box; }
#mz_film .tab{ display: flex; text-align: center;}
#mz_film .tab div{ flex : 1; font-size:16px; border-bottom: 1px #fe6e00 solid; height: 40px;}
#mz_film .tab div.active{ color:#fe6e00; border-bottom: 4px #fe6e00 solid; height:37px; }
#mz_film .tab div.router-link-active{color:#fe6e00; border-bottom: 4px #fe6e00 solid; height:37px;;}	
#mz_film .list{}
#mz_film .list ul{}
#mz_film .list li{ height: 124px; border-bottom:1px #c9c9c9 dashed; padding-top: 20px; box-sizing:border-box; display: flex;}
#mz_film .list .img{ width: 60px; float:left; }
#mz_film .list .img img{ width: 100%; }
#mz_film .list .info{ float:left; margin-left: 15px; flex:1;}
#mz_film .list .info p{ height: 28px; display: flex; line-height: 28px; font-size: 12px;}
#mz_film .list .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
#mz_film .list .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; margin-right: 20px; color:#fc7103;}

#mz_film .list .info span{}
</style>