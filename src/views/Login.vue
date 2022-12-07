<template>
  <div class="Login-container">
    <el-card class="login-card">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="LoginForm"
      >
        <h2 class="login-title">后台登录</h2>
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin(loginForm)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleLogin(loginForm)"
            class="login-btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // 登录验证
    const validateUsername = (rule, value, callback) => {
      const regU = /^[\w-]{4,16}$/
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else if (!regU.test(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      const regP = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (!regP.test(value)) {
        callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      }
    }
  },
  methods: {
    // 登录实现
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // console.log('密码检查通过')
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$message({ message: '登录成功', type: 'success' })
            this.$router.replace({ path: '/home' }).catch(() => {})
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
.Login-container {
  height: 100%;
  width: 100%;
  padding: 0;
  position: relative;
  background-image: url('../assets/backg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 360px;
  width: 420px;
  opacity: 0.85;
}
.login-title {
  text-align: center;
}
.login-btn {
  width: 100%;
}
</style>
