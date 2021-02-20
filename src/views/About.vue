<template>
  <div class="about">
    <div v-if="!loginToken">
      <van-form>
        <van-field class="login"
          v-model="username"
          name="用户名"
          label="请输入名称:"
          placeholder="请输入名称"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field class="login"
          v-model="password"
          type="password"
          name="密码"
          label="请输入密码:"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" @click="setToken()">
            登录
          </van-button>
        </div>
      </van-form>
    </div>

    <div v-else>
        <van-cell-group>
          <van-cell title="名称为" :value="loginToken" />
        </van-cell-group>
        <div class="exit">
          <van-button icon="https://img.yzcdn.cn/vant/logo.png" type="info" @click="exitLogin">退出登录</van-button>
        </div>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {

      }
    },
    computed: {
      //实现用户名和密码的双向绑定
      username:{
        get(){
          return this.$store.state.username;
        },
        set(val){
          this.$store.commit('setUsername', val);
        }
      },
      password:{
        get(){
          return this.$store.state.password;
        },
        set(val){
          this.$store.commit('setPassword', val);
        }
      },
      //通过loginToken是否为空来更换不同内容
      ...mapState(['loginToken']),
    },
    methods: {
      //点击登录按钮把token(用户名)设置到本地存储localstorage里面
      setToken() {
        this.$store.commit('setToken');
      },
      //点击退出登录按钮
      exitLogin() {
        this.$store.commit('exitLogin');
      }

    }
  }
</script>

<style lang="scss" scoped>
  .van-cell.login::before{
      position: absolute;
      left: 8px;
      color: #ee0a24;
      font-size: 14px;
      content: "*";
  }
  .exit{
    padding-top: 20px;
    text-align: center;
  }
</style>