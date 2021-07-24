<template>
  <div id = "login">
    <el-card class="login-form-layout">
      <el-form
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <h2 class="login-title" id = "title">叮咚后台管理</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autoComplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <div class="el-icon-user-solid color-main"></div>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <div class="color-main el-icon-key"></div>
            </span>
            <span slot="suffix" @click="showPwd">
              <div class="color-main el-icon-view"></div>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px; text-align: center">
          <el-button
            style="width: 45%"
            type="primary"
            :loading="loading"
            @click="handleLogin"
            size="small"
          >
            登录
          </el-button>
          <el-button
            style="width: 45%"
            type="info"
            :loading="loading"
            @click="register"
            size="small"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    
    return {
      loginForm: {
        "username": "",
        "password": "",
      },
      loginRules: {
        username: [
          { required: true, message:"请输入用户名",trigger: "blur", },
        ],
        password: [
          { required: true, message:"请输入密码",trigger: "blur" },
        ],
      },
      loading: false,
      pwdType: "password",

      dialogVisible: false,
      supportDialogVisible: false,
    };
  },

  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const {data:res} = await this.$http.post("/admin/login",this.loginForm);
          if (res.code === '00000') {
            window.sessionStorage.setItem("token", res.data.token);
            window.sessionStorage.setItem("tokenHead", res.data.tokenHead);
            this.$router.push("/admin");
          }else {
          this.$message.error("用户名或密码错误");
        }
        } 
      });
    },
    handleTry() {
      this.dialogVisible = true;
    },
    dialogConfirm() {
      this.dialogVisible = false;
      setSupport(true);
    },
    dialogCancel() {
      this.dialogVisible = false;
      setSupport(false);
    },
    register(){
      this.$router.push("/register");
    }
  },
};
</script>

<style scoped lang="less">
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}

#title {
  font-size:20px;
  font-weight:400;
  margin-bottom:20px;
}
</style>
