<template>
  <div id="app" @tap="handleAllClick">
      <mz-header></mz-header>
      <mz-nav></mz-nav>
      <!-- exclude属性指定的组件不被缓存 -->
      <keep-alive exclude="mz-detail mz-city">
        <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './components/header.vue'
import Nav from './components/nav.vue'
import City from './components/city.vue'

axios.default.timeout = 2000;

export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components : {
    [Header.name]: Header,
    [Nav.name]: Nav,
    [City.name]:City
  },
  methods: {
    // 点击其他区域隐藏
    handleAllClick(){
        this.$store.commit('CHANGE_HEADER_SHOW',false)
    }
  }
}
</script>

<style lang="scss">
*{ margin:0; padding:0; }
html,body{ height: 100%; font-size:14px; background: #ebebeb; }
li{ list-style:none; }
img{ display:block; }
</style>
