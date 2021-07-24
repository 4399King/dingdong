<template>
  <div id="productCategory">
    <el-card shadow="never">
      <div class="el-icon-tickets"></div>
      <span>&nbsp;&nbsp;&nbsp;数据列表</span>
      <el-button
        type="info"
        size="small"
        style="float: right"
        @click="addCategory"
        >添加类型</el-button
      >
    </el-card>
    <el-card>
      <el-row>
        <el-col>
          <el-table
            border
            :data="productCategory"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="id" label="类别编号" width="50">
            </el-table-column>
            <el-table-column prop="categoryName" label="类别名称" width="120">
            </el-table-column>
            <el-table-column label="类别图片" width="300">
              <template slot-scope="scope"
                ><img :src="scope.row.categoryPic"
              /></template>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip id="do">
              <template slot-scope="operation">
                <el-button
                  type="primary"
                  size="mini"
                  :id="changeCategory(operation.row.id)"
                  >修改</el-button
                >

                <el-button
                  type="danger"
                  size="small"
                  @click="deleteCategory(operation.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="margin-top: 20px"
            @size-change="handlePageSizeChange"
            @current-change="handlePageNumChange"
            :current-page="pageNum"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "productCategory",
  created() {
    this.getCategory();
  },
  data() {
    return {
      productCategory: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
    };
  },
  methods: {
    addCategory() {
      this.$router.push(`/addCategory`);
    },
    async getCategory() {
      const { data: res } = await this.$http.post(
        `/productCategory/getAll?pageNum=${this.pageNum}&pageSize=${this.pageSize}`
      );

      if (res.code === "00000") {
        this.total = res.data.total;
        this.productCategory = res.data.categories;
      } else {
        this.$message.error("获取类别数据失败");
      }
    },
    async deleteCategory(id) {
      await this.$confirm(
        "此操作将永久删除该类别信息, 是否继续?",
        "提示",
        {
          confirmButtonText:"确定",
          cancelButtonText:"取消",
          type:"warning"
        }
      ).then(async ()=>{
              let config = {
        headers: {
          "Authorization": `${window.sessionStorage.getItem(
            "tokenHead"
          )} ${window.sessionStorage.getItem("token")}`,
        },
      };
      const { data: res } = await this.$http.post(
        `/admin/config/productCategory/remove`,
        {
          "id": `${id}`,
          
        },
        config
      );
      if (res.code === "00000") {
        this.$message.success("删除成功");
        this.getCategory();
      }else {
        this.$message.error("删除失败");
      }
      })

    },
    changeCategory() {},
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.getCategory();
    },
    handlePageNumChange(num) {
      this.pageNum = num;
      this.getCategory();
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 30px;
}
</style>