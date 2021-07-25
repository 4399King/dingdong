<template>
  <el-container>
    <el-header>
      <el-menu :default-active="1"  mode="horizontal" background-color="#f6192b" active-text-color="#ffd04b">
        <el-menu-item index="1">处理中心</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "ddmall"
}
</script>

<style lang="less" scoped>
.el-header {
  height: 50px;
  padding: 0;

}

.el-main {
  background: pink;
}

.el-footer {
  background: red;
}
</style>