<template>
	<div id="mz_city">
		<ul>
			<div class="first-title">
				GPS定位你所在的城市
			</div>
			<span class="item-detail">深圳</span>	
		</ul>
		<ul>
			<div class="first-title">
				热门城市
			</div>
			<span class="item-detail">北京</span>
			<span class="item-detail">上海</span>
			<span class="item-detail">广州</span>
			<span class="item-detail">深圳</span>
		</ul>
		<ul>
			<div class="first-title">
				按字母排序
			</div>
			<span class="item-detail" @tap="handleGetIndex" v-for="item in formatCities">
				{{ item.index }}
			</span>
		</ul>
		<ul ref="cityList">
			<li v-for="item in formatCities">
				<h2 class="first-title">{{ item.index }}</h2>
				<span class="item-detail" v-for="itemList in item.list">{{ itemList.name }}</span>
			</li>
		</ul>
	</div>
</template>

<script>

import axios from 'axios';

	export default {
		name : 'mz-city',
		data(){
			return {
				cities : []
			};
		},
		mounted(){
			// 假数据引用静态资源需要用到绝对路径
			axios.get('/src/assets/mock/city.json').then((res)=>{
				var status = res.data.status;
				if (status === 0) {
					this.cities = res.data.data.cities;
					this.$store.commit('CHANGE_HEADER_TITLE','选择城市');
					// this.$store.state.cityTitle
				}
			});
		},
		computed : {
			formatCities(){
				// [
				// 	{ index : 'Y' : list : [{"id":133,"name":"阳泉","pinyin":"YangQuan"}] },
				// 	{ index : 'T' : list : [{"id":134,"name":"泰安","pinyin":"TaiAn"}] },
				// 	{ index : 'J' : list : [{"id":258,"name":"荆门","pinyin":"JingMen"}] }
				// ]
				if (!this.cities.length) {
					return this.cities;
				}
				else{
					return this.changeCities(this.cities);
				}				
			}
		},
		methods : {
			changeCities(cities){
				var result = [];
				
				for(var i=0;i<cities.length;i++){
					var firstLetter = cities[i].pinyin.charAt(0);
					if (toCom(firstLetter)) {  //新的index
						result.push({ index : firstLetter , list : [cities[i]] });
					}
					else{		//已有的index
						for(var j=0;j<result.length;j++){
							if (result[j].index == firstLetter) {
								result[j].list.push( cities[i] );
							}
						}
					}
				}

				function toCom(firstLetter){
					for(var i=0;i<result.length;i++){
						if ( result[i].index == firstLetter ) {
							return false;
						}
					}
					return true;
				}

				result.sort(function(n1,n2){
					if (n1.index > n2.index) {
						return 1;
					}
					else{
						return -1;
					}
				});
				console.log(result);
				return result;
			},
			handleGetIndex(ev){
				var nowHTML = ev.target.innerHTML.trim();
				var $h2 = $(this.$refs.cityList).find('h2');
				$h2.each((i,item)=>{
					if(item.innerHTML == nowHTML){
						document.documentElement.scrollTop = $(item).offset().top - 50;
					}
				});	
			}

		}
	}
</script>

<style>
#mz_city{
	margin-top: 50px ;
}

#mz_city ul{
	background: #fff
}

.first-title{
	padding-left: 15px;
    font-size: 14px;
    line-height: 40px;
    background-color: #ebebeb;
    margin-top: -1px;
}
.item-detail{
	width: 24%;
    font-size: 16px;
    line-height: 46px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    color: #838383;
    border-bottom: #ebebeb 1px solid;
}
</style>