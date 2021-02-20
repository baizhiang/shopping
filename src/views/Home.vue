<template>
  <div class="home">

       <transition enter-active-class="animate__animated animate__fadeInLeft">       
        <ul v-show="fade">
          <li v-for="item in arr" :key="item.id" @click="getInfo(item)">
              <img :src="item.img" alt="">
              <p> {{ item.title }} </p>
          </li>
        </ul>
       </transition>
     
      <!-- overlay 是否显示遮罩层 -->
      <van-popup v-model="show" position="right" :overlay="false">
          <div class="box">
              <van-nav-bar
                :title= "currentItem.title"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
              />
              <!-- <img :src="currentItem.img" alt=""> -->
              <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item>
                  <img :src="currentItem.img" alt="">
                </van-swipe-item>
                <van-swipe-item>
                  <img :src="currentItem.img" alt="">
                </van-swipe-item>
                <van-swipe-item>
                  <img :src="currentItem.img" alt="">
                </van-swipe-item>
                <van-swipe-item>
                  <img :src="currentItem.img" alt="">
                </van-swipe-item>
              </van-swipe>

              <p>{{ currentItem.info }} <span>{{ currentItem.storage }}</span></p>

              <van-button type="primary" @click="addtoCar(currentItem)" :disabled="currentItem.storage==0">添加到购物车{{ totalNum }}</van-button>
              
          </div>
      </van-popup>

  </div>
</template>

<script>
// import animation from 'animate.css';
import { mapState, mapGetters } from 'vuex'; 
export default {
  data() {
    return {
      show: false,
      currentItem: {},
      //控制ul出现或隐藏
      fade: true
    }
  },
  computed: {
    ...mapState(['arr']),
    ...mapGetters(['totalNum']),
  },
  methods: {
    //显示弹出层
    getInfo(item) {
      this.fade = false;
      this.show = true;
      //把当前这一项赋值给currentItem
      this.currentItem = item;
    },

    onClickLeft() {
      this.fade = true;
      this.show = false;
    },

    addtoCar(currentItem) {
      this.$store.commit("addtoCar", currentItem);
    }
  }

}
</script>

<style scoped lang="scss">
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .home{
    height: 100%;
    ul{
      
      li{
        padding: 10px;
        display: flex;

        img{
          width: 68px;
          height: 34px;
          margin-right: 10px;
        }
        p{
          line-height: 34px;
          font-size: 16px;
        }
      }
    }
    
    .van-popup{
      height: 100%;
      font-size: 16px;
      overflow: hidden;
      background-color: #ffffff;
      transition: all ease 1s;
      

      .box{
        height: 100%;
        
        .my-swipe{
          width: 375px;
         .van-swipe-item{
            width: 100%;
            img{
              width: 100%;
            }
          }
        }
        p{
          span{
            color: red;
          }
        }
        .van-button{
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 50px;
          line-height: 48px;
        }
      }
    }
  }

  
</style>
