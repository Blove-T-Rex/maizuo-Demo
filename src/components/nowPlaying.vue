<template>
	<div class="list">
			<ul>
				<li v-for="item in nowPlayingList">
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
		name : 'now-playing',
		data(){
			return {
				nowPlayingList:[]
			};
		},
		mounted(){
			axios.get('/v4/api/film/now-playing',{
				params: {
					page:1,
					count:7
				}
			}).then((res)=>{
				var status = res.data.status;
				if (status === 0 ) {
					window.localStorage.setItem('nowPlayingList',JSON.stringify(res.data.data.films));
					this.nowPlayingList = res.data.data.films;
				}
			},(err)=>{
				this.nowPlayingList = JSON.parse(window.localStorage.getItem('nowPlayingList'));
			});
		}
	}
</script>

<style>

</style>