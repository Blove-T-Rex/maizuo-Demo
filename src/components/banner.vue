<template>
	<div id="mz_banner" class="swiper-container">
		<ul class="swiper-wrapper">
			<li class="swiper-slide" v-for="item in bannerList"><img :src="item.imageUrl"></li>
			<!-- <li class="swiper-slide"><img src="src/assets/images/1.jpg"></li>
			<li class="swiper-slide"><img src="src/assets/images/2.jpg"></li>
			<li class="swiper-slide"><img src="src/assets/images/3.jpg"></li> -->
		</ul>
	</div>
</template>

<script>

	import axios from 'axios';
	export default {
		name : 'mz-banner',
		data(){
			return {
				bannerList : []
			};
		},
		mounted(){
			axios.get('/v4/api/billboard/home').then((res)=>{
				// console.log(res);
				// res.data -> 真实数据的根节点
				var status = res.data.status;
				if(status === 0){
					// 设置本地存储,先转成字符串
					window.localStorage.setItem('bannerList',JSON.stringify(res.data.data.billboards));
					this.bannerList = res.data.data.billboards;
					this.$nextTick().then(()=>{
						// DOM更新了
						// Swiper必须等到DOM加载完成后，JS才会生效
						var $mz_banner = $('#mz_banner');
						new Swiper($mz_banner,{
							loop : true,
							// autoplay:true,
							autoplay: {
							    delay: 3000,
							    stopOnLastSlide: false,
							    disableOnInteraction: false
						    }
						});
					});	
				}
			},(err)=>{
				// 访问失败时获取本地存储的值，再转换成数组
				console.log(22222);
				this.bannerList = JSON.parse(window.localStorage.getItem('bannerList'));
				this.$nextTick().then(()=>{
						// 本地存储时可滑动
						var $mz_banner = $('#mz_banner');
						new Swiper($mz_banner,{
							loop : true,
							autoplay: {
							    delay: 3000,
							    stopOnLastSlide: false,
							    disableOnInteraction: false
						    }
						});
					});	
			});

		}
	}
</script>

<style>
#mz_banner{ margin-top: 50px; width: 100%; overflow:hidden; }
#mz_banner img{ width: 100%; }
</style>