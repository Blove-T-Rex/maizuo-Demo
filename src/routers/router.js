import vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../components/index.vue';
import Film from '../components/film.vue';
import Detail from '../components/detail.vue';
import NowPlaying from '../components/nowPlaying.vue';
import CommingSoon from '../components/commingSoon.vue';
import City from '../components/city.vue';

vue.use(VueRouter);

var router = new VueRouter({
	routes : [
		{ path : '/index' , component : Index },
		{ 
			path : '/film' , 
			component : Film ,
			children : [
				{ path : 'now-playing' , component: NowPlaying },
				{ path : 'comming-soon', component: CommingSoon }	
			],
			redirect : '/film/now-playing'
		},
		{ path : '/detail/:id?' , component : Detail },
		{ path : '/city', component:City },
		{ path : '/*' , redirect : '/index' }
	],
	scrollBehavior (to, from, savedPosition) {
	  return { x: 0, y: 0 }
	}
});

export default router;

