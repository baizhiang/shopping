<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>

    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="Home" icon="wap-home-o" to="/">Home</van-tabbar-item>
      <van-tabbar-item name="Car" icon="shopping-cart-o" to="/car">购物车</van-tabbar-item>
      <van-tabbar-item name="About" icon="manager-o" to="/about">About</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      active: "Home",
    }
  },
  computed: {
  },
  methods: {
    //监听active的变化 当要跳转购物车时 如果没有登录 则active绑定的是About
    onChange(val) {
      console.log(val);
      if (val == "Car" && (!localStorage.getItem("token")) ) {
        this.active = "About";
      }
    }
    },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
