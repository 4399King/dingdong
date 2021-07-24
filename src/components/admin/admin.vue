<template>
  <div id="admin">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#3881ce"
          :collapse="isCollapse"
          :router="true"
          :collapse-transition="false"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-shopping-bag-2"></i>
              <span>商品</span>
            </template>
            <el-menu-item
              index="/merchandiseMenu"
              @click="saveActivePath('/merchandiseMenu')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/addMerchandise"
              @click="saveActivePath('/addMerchandise')"
            >
              <template slot="title">
                <i class="el-icon-circle-plus-outline"></i>
                <span>添加商品</span>
              </template>
            </el-menu-item>
                        <el-menu-item
              index="/brandAdministration"
              @click="saveActivePath('/brandAdministration')"
            >
              <template slot="title">
                <i class="el-icon-discount"></i>
                <span>品牌管理</span>
              </template>
            </el-menu-item>
            
                        <el-menu-item
              index="/productCategory"
              @click="saveActivePath('/productCategory')"
            >
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span>商品种类</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="collapse el-icon-s-fold" @click="toggleCollapse"></div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>商品</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      isCollapse: false,
      activePath: "",
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveActivePath(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    },
  },
};
</script>

<style lang="less" scoped>
#admin {
  height: 100%;
}
.el-container,
.el-main,
.el-aside {
  height: 100%;
}

.el-aside {
  background-color: #202d3c;
}

.el-menu {
  border-right: none;
}
.el-submenu {
  background-color: #304156;
}

.el-submenu:hover {
  background-color: #263445 !important;
}

.el-menu-item {
  background-color: #1f2d3d;
}

.el-breadcrumb {
  line-height: 29.6px;
}
.collapse {
  float: left;
  height: 30px;
  width: 30px;
  margin-left: 5px;
  margin-right: 10px;
  font-size: 30px;
  cursor: pointer;
}

.collapse:hover {
  border-radius: 10px;
  color: #3881ce;
}

.el-breadcrumb {
  margin-bottom: 10px;
}
</style>