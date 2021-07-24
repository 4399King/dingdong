<template>
    <div id="classifyMerchandise">
          
    <el-card class="box-card">
      <div class="el-icon-tickets"></div>
      <span>&nbsp;&nbsp;&nbsp;数据列表</span>
      <el-button type="info" size="small" style="float: right" @click="addCategory"
        >添加分类</el-button
      >
    </el-card>
    </div>
</template>

<script>
export default {
    name:"classifyMerchandise",
    methods:{
        addCategory(){
            this.$router.push("/addCategory");
        }
    }
}
</script>