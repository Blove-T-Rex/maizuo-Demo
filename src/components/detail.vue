<template>
	<div id="mz_detail">
		<div class="banner"><img :src="detailFilm.cover && detailFilm.cover.origin"></div>
		<div class="info">
			<h2>影片简介</h2>
			<dl>
				<dt>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：</dt>
				<dd>{{ detailFilm.director }}</dd>
			</dl>
			<dl>
				<dt>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：</dt>
				<dd>{{formatActors}}</dd>
			</dl>
			<dl>
				<dt>地区语言：</dt>
				<dd>{{detailFilm.language}}</dd>
			</dl>
			<dl>
				<dt>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</dt>
				<dd>{{detailFilm.category}}</dd>
			</dl>
			<dl>
				<dt>上映日期：</dt>
				<dd>{{formatPremiereAt}}上映</dd>
			</dl>
			<p>{{detailFilm.synopsis}}</p>
		</div>
	</div>
</template>

<script>

import axios from 'axios';

	export default {
		name : 'mz-detail',
		data(){
			return {
				// 接收film对象
				detailFilm : {}
			};
		},
		mounted(){
			var id = this.$route.params.id;
			axios.get('v4/api/film/'+id).then((res)=>{
				var status = res.data.status;
				if (status === 0) {
					this.detailFilm = res.data.data.film;
					this.$store.commit('CHANGE_HEADER_TITLE',this.detailFilm.name);
				}
			});
		},
		computed : {
			// 计算上映日期
			formatPremiereAt(){
				// 计算属性时第一次为空，后面就都是undefined了
				if (this.detailFilm.premiereAt) {
					var date = new Date();
					// 从数据中难道每个影片上映时间的毫秒数
					date.setTime(this.detailFilm.premiereAt);

					return (date.getMonth() + 1) + '月' + date.getDate() + '日';
				}
				return '';
			},
			formatActors(){
				// 遍历演员表
				var result = '';
				if (this.detailFilm.actors) {
					this.detailFilm.actors.forEach((item,i)=>{
						if (i==0) {
							result += item.name;
						}
						else{
							result += ' | ' + item.name;
						}
					});
				}
				return result;
			}
		}
	}
</script>

<style>
#mz_detail{ margin-top:50px; }
#mz_detail .banner{ width: 100%; }
#mz_detail .banner img{ width: 100%; }
#mz_detail .info{ margin-top: 16px; font-size: 12px; }
#mz_detail .info h2{ height: 24px; line-height: 24px; border-left:16px #e4c89c solid; font-size: 16px; padding-left: 4px; font-weight: 100; }
#mz_detail .info dl{ overflow: hidden; line-height: 27px; margin-top: 10px; padding:0 10px; box-sizing:border-box; display: flex; }
#mz_detail .info dt{ width:80px; }
#mz_detail .info dd{ flex:1; overflow:hidden; white-space: nowrap; text-overflow:ellipsis;}
#mz_detail .info p{ padding:0 10px; box-sizing:border-box; line-height: 20px; margin-top: 10px; }
</style>