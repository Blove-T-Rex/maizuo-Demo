<template>
	<div class="list">
			<ul>
				<li v-for="item in comingSoonList">
					<div class="img"><img :src="item.poster.thumbnail"></div>
					<div class="info">
						<p><span>{{item.name}}</span><span>{{item.grade}}<i class="iconfont icon-more"></i></span></p>
						<p>{{item.intro}}</p>
						<p><span>{{item.cinemaCount}}家影院上映</span><span>{{item.watchCount}}人购票</span></p>
					</div>
				</li>
			</ul>
		</div>
</template>

<script>

	import axios from 'axios';

	export default {
		name : 'coming-soon',
		data(){
			return {
				comingSoonList:[]
			};
		},
		mounted(){
			axios.get('/v4/api/film/coming-soon',{
				params: {
					page:1,
					count:7
				}
			}).then((res)=>{
				var status = res.data.status;
				if (status === 0 ) {
					window.localStorage.setItem('comingSoonList',JSON.stringify(res.data.data.films));
					this.comingSoonList = res.data.data.films;
				}
			},(err)=>{
				this.comingSoonList = JSON.parse(window.localStorage.getItem('comingSoonList'));
			});
		}
	}
</script>

<style>

</style>