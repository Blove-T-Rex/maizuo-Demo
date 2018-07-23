<template>
	<div>
		<mz-banner></mz-banner>
		<mz-movie></mz-movie>
	</div>
</template>

<script>

import Banner from './banner.vue';
import Movie from './movie.vue';

	export default {
		name : 'mz-index',
		data(){
			return {};
		},
		components : {
			[Banner.name] : Banner,
			[Movie.name] : Movie
		},
		mounted(){
			
		},
		// activated生命周期为keep-alive特有的，在有缓存的情况下进入会触发
		activated(){
			this.$store.commit('CHANGE_HEADER_TITLE','卖座电影');
		}
	}
</script>

<style>
</style>