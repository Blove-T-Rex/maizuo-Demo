<template>
	<div id="mz_movie">
			<ul>
				<!-- <li>
					<img src="src/assets/images/4.jpg">
					<div class="info">
						<div class="title">
							<p>神秘巨星</p>
							<p>9家影院上映1331134人购票</p>
						</div>
						<div class="score">8.5</div>
					</div>
				</li> -->
				<!-- tap点击事件的好处，滑动时不会触发点击事件 -->
				<li v-for="item in films" @tap="handleDetailClick(item.id)">
					<img :src="item.cover.origin">
					<div class="info">
						<div class="title">
							<p>{{ item.name }}</p>
							<p>{{ item.cinemaCount }}家影院上映{{ item.watchCount}}人购票</p>
						</div>
						<div class="score">{{ item.grade }}</div>
					</div>
				</li>
			</ul>
		</div>
</template>

<script>

	import axios from 'axios';

	export default {
		name : 'mz-movie',
		data(){
			return {
				films : []
			};
		},
		mounted(){
			axios.get('/v4/api/film/now-playing',{
				params : {
					page : 1,
					count : 5
				}
			}).then((res)=>{

				var status = res.data.status;
				if (status === 0) {
					this.films = res.data.data.films;
					window.localStorage.setItem('films',JSON.stringify(res.data.data.films));
				}

			},(err)=>{
				this.films = JSON.parse(window.localStorage.getItem('films'));
			});
		},
		methods : {
			handleDetailClick(id){
				// 编程式路由，在js中完成路由的跳转
				this.$router.push('/detail/' + id);
			}
		}
	}
</script>

<style>
#mz_movie{ margin-top: 18px; }
#mz_movie ul{ width: 100%; padding:0 10px; box-sizing:border-box;}
#mz_movie li{ margin-bottom: 10px; }
#mz_movie img{ width: 100%; }
#mz_movie .info{ height: 50px; background:white; display: flex; }
#mz_movie .title{ flex : 1; padding-left: 10px; padding-top: 5px; }
#mz_movie .title p{ line-height: 20px; }
#mz_movie .score{ width: 50px; line-height: 50px; text-align: center; color:#f79177; font-size: 20px; }
</style>