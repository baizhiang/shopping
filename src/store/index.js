import Vue from 'vue'
import Vuex from 'vuex'
import Mock from 'mockjs'
import router from '../router';
Vue.use(Vuex);

var Random = Mock.Random;
var arr = [];
for (var i = 0; i < 10; i++) {
  var obj = {
    id: Random.id(),
    title: Random.ctitle(),
    img: Random.dataImage('200x100'),
    price: Random.natural(10, 100),
    storage: Random.natural(0, 10),
    info: Random.cparagraph(),
  }
  arr.push(obj);
}

//全局导航守卫
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('token');
  if (to.path == '/car') {
    if (token) {
        next();
    } else {
        alert("没有登录!");
        next('/about');
    }
    } else {
        next();
    }
})

export default new Vuex.Store({
  state: {
    arr,
    username: '',
    password: '',
    carList: [],
    loginToken: '',
  },

  mutations: {
    setUsername(state, val) {
      state.username = val;
    },
    setPassword(state, val) {
      state.password = val;
    },

    setToken(state) {
      //点击登录时把口令保存到本地中
      localStorage.setItem('token', state.username);
      //并且赋值给loginToken
      state.loginToken = state.username;
    },

    //添加到购物车
    addtoCar(state, val) {
      //购物车中已有此项商品
      if (state.carList.some(el => el.id == val.id)) {
        var item = state.carList.find(el => el.id == val.id);
        item.num++;
        console.log(item.num);
      } else {
        //购物车中没有此项商品
        var goodInCar = {
          id: val.id,
          title: val.title,
          img: val.img,
          price: val.price,
          storage: val.storage,
          info: val.info,
          //不同于库存storage 是加入购物车的数量
          num: 1,
          isChecked: false,
        };
        state.carList.push(goodInCar);
      };
      //库存--
      var itemInArr = state.arr.find(el => el.id == val.id);
      itemInArr.storage--;
      //用于添加购车按钮上的数量渲染
      // state.totalNum++;
    },

    //改变checkbox的状态
    checkedChange(state, val) {
      var item = state.carList.find(el => el.id == val.id);
      item.isChecked = val.isTrue;
    },

    //点击购物车中减少按钮
    decrease(state, id) {
      //找到商品列表arr中商品对应项 库存++
      var item = state.arr.find(el => el.id == id);
      item.storage++;
      //找到购物车列表中对应商品项
      var itemInCar = state.carList.find(el => el.id == id);
      itemInCar.num--;
      //购物车中总数量--
      // state.totalNum--;
    },

    //点击增加按钮
    increase(state, id) {
      var item = state.arr.find(el => el.id == id);
      item.storage--;
      var itemInCar = state.carList.find(el => el.id == id);
      itemInCar.num++;
      // state.totalNum++;
    },

    //当输入框数量发生改变时
    changeNum(state, val) {
      //找到购物车中对应项
      var itemInCar = state.carList.find(el => el.id == val.id);
      itemInCar.num = val.value;
      //找到商品列表对应项
      var itemInArr = state.arr.find(el => el.id == val.id);
      itemInArr.storage = itemInCar.storage - itemInCar.num;
    },

    //退出登录
    exitLogin(state) {
      localStorage.removeItem('token');
      state.loginToken = "";
    },
  },
  actions: {
  },
  getters: {
    //购物车按钮上的总数量渲染
    totalNum(state) {
      return state.carList.reduce((cur, val) => {
        return cur + val.num;
      },0)
    },
    
    //购物车中总价
    totalPrice(state) {
      return state.carList.reduce((cur, val) => {
        if (val.isChecked) {
          return cur + val.num * val.price;
        } else {
          return cur;
        }
      },0)
    }
  }
})
