<template>
  <div id="userRegister">
    <el-card>
      <div slot="header" class="title">
        <span>用户注册信息填写</span>
      </div>
      <el-form
        autoComplete="on"
        :model="registerForm"
        :rules="registerRules"
        label-position="left"
      >
        <el-form-item>
          <el-input
            type="text"
            v-model="registerForm.username"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <div class="el-icon-user-solid color-main"></div>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            @keyup.enter.native="register"
            v-model="registerForm.password"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <div class=" el-icon-key"></div>
            </span>
            <span slot="suffix" @click="showPwd">
              <div class="el-icon-view"></div>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px; text-align: center">
          <el-button
            style="width: 45%"
            type="info"
            
            @click="userRegister"
            size="small"
          >
            提交信息
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "userRegister",
  data() {
    return {
      registerForm: {
        "username": "",
        "password": ""
      },
      registerRules: {
        username: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async userRegister() {
      const {data:res} = await this.$http.post(`/user/register`, this.registerForm);
      if (res.code === "00000") {
        this.$message.success("注册成功");
        this.registerForm = {
        "username": "",
        "password": ""
      };
      
      }else {
        this.$message.error("注册失败");
      }
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.el-card {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  top: 150px;
  height: 300px;
}

.title {
  text-align: center;
  font-size: 20px;
}
.el-form-item {
  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
}
</style>