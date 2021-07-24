<template>
  <div id="brandAdministration">
    <el-card class="box-card" shadow="never">
      <div class="el-icon-tickets"></div>
      <span>&nbsp;&nbsp;&nbsp;数据列表</span>
      <el-button type="info" size="small" style="float: right" @click="addBrand"
        >添加品牌</el-button
      >
    </el-card>
    <el-card>
      <el-row>
        <el-col>
          <el-table
            border
            :data="brands"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="id" label="品牌编号" width="120">
            </el-table-column>
            <el-table-column prop="brandName" label="品牌名称" width="120">
            </el-table-column>
            <el-table-column label="品牌图片" width="300">
              <template slot-scope="scope"
                ><img :src="scope.row.brandPic" style="width:150px"
              /></template>
            </el-table-column>
            <el-table-column prop="subhead" label="品牌副标题" width="120">
            </el-table-column>

            <el-table-column prop="description" label="商品故事" width="120">
            </el-table-column>
            <el-table-column
              
              label="操作"
              show-overflow-tooltip
              id="do"
            >
              <template slot-scope = "scope">
                <el-button
                  type="primary"
                  size="mini"
                  id="change"
                  
                  >修改</el-button
                >

                <el-button
                  type="danger"
                  size="small"
                  id="delete"
                  @click="deleteBrand(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="this.pageNum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="this.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            style="margin-top: 20px"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "brandAdminstration",
  created(){
    this.getBrands();
  },
  data(){
    return {
      total:10,
      brands:[],
      pageNum:1,
      pageSize:10
    }
  },
  methods: {
    addBrand() {
      this.$router.push("/addBrand");
    },
    async getBrands(){
      const {data:res} = await this.$http.post(`/productBrand/getAll?pageNum=${this.pageNum}&pageSize=${this.pageSize}`);
      this.brands = res.data.brands;
      this.total = res.data.total;
    },
    handleCurrentChange(num) {
      this.pageNum = num;
      this.getBrands();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getBrands();
    },
    async deleteBrand(id) {
      await this.$confirm(
        "此操作将永久删除该品牌信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(async ()=>{
              let config = {
        headers: {
          "Authorization": `${window.sessionStorage.getItem(
            "tokenHead"
          )} ${window.sessionStorage.getItem("token")}`,
        },
      };

      const {data:res} = await this.$http.post(`/admin/config/productBrand/remove`, {"id":`${id}`}, config);
      if (res.code === "00000") {
        this.$message.success("删除成功");
      }else {
        this.$message.error("删除失败");
      }
      });


    }
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom:30px;
}
</style>