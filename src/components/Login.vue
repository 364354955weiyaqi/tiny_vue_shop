<template>
  <div class="login-container">
    <div class="login-box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/img/logo.png" alt="">
      </div>
      <!--登陆表单区域-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"
                    prefix-icon="iconfont icon-user"
                    autofocus placeholder="请输入用户名"
                    clearable></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
                    prefix-icon="iconfont icon-3702mima"
                    type="password" placeholder="请输入密码"
                    clearable></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 这是登陆表单绑定的数据对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名合法性:
        username: [
          { required: true, min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码合法性:
        password: [
          { required: true, min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置方法
    resetLoginForm () {
      // console.log(this)  // 这里的this指的是谁？this代表的应该是Login.vue父组件，$refs表示子组件中所有的ref属性集合，
      this.$refs.loginFormRef.resetFields() // ref用在子组件上，指向的是组件实例，可以理解为对子组件的索引，通过ref可能获取到在子组件里定义的属性和方法
    },
    login: function () {
      // 点击登陆按钮进行字段验证
      this.$refs.loginFormRef.validate(async valid => {
        // 登陆逻辑判断
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) {
          return this.$message.error({ showClose: true, message: '登陆失败！' })
        }
        this.$message.success({ showClose: true, message: '登陆成功！' })
        // 登陆成功之后,token保存于客户端的sessionStore中(因为当前token只在网站打开期间生效)
        window.sessionStorage.setItem('token', res.data.token)
        // 登陆成功后，通过编程式跳转到home页面
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    background-color: #2b4b6b;
    height: 100%;
    .login-box {
      width: 450px;
      height: 300px;
      background-color: #fff;
      border-radius: 3px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);

      .avatar_box { /*头像图标*/
        height: 130px;
        width: 130px;
        border: solid 1px #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 5px #ddd; /*加阴影效果*/
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%); /*往后(左)移动自身的50%,往后(上)移动自身的50%*/
        background-color: #fff;
        img{
          height: 100%;
          width: 100%;
          border-radius: 50%;
          background-color: #eee;
        }
      }
      .login_form {
        position: absolute;
        bottom: 0; /*form表单底部对齐*/
        width: 100%;
        padding: 0 40px;
        box-sizing: border-box;
        display: inline;
      }
    }
  }
  .btns { /*弹性盒模型*/
    display: flex;
    justify-content: flex-end;  /*横轴上尾部对齐*/
  }
</style>
