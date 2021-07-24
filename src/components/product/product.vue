<template>
  <div id="merchandiseMenu">
    <el-card class="box-card">
      <el-row id="row">
        <el-col>
          <span class="el-icon-search">&nbsp;&nbsp;&nbsp;筛选搜索</span>

          <el-button type="primary" id="search" @click = "search">查询结果</el-button>

          <el-button type="info" id="reset">重置</el-button>
        </el-col>
      </el-row>

      <el-form :inline="true">
        <el-form-item label="输入搜索">
          <el-input placeholder="商品名称"></el-input>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-cascader
            v-model="selectClassifiedMerchandise"
            :options="classifiedMerchandise"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="商品品牌">
          <el-select placeholder="请选择品牌" v-model="selectBrand">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态">
          <el-select placeholder="全部" v-model="selectSituation">
            <el-option
              v-for="item in situations"
              :key="item.value"
              :label="item.label"
              value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select placeholder="全部" v-model="checking">
            <el-option
              v-for="item in checkings"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="el-icon-document"> &nbsp;&nbsp;&nbsp;数据列表</span>


      </div>
      <el-row>
        <el-col>
          <el-table
            border
            :data="products"
            style="width: 100%"
            
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="id" label="商品编号" width="50">
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="120">
            </el-table-column>
            <el-table-column label="商品图片" width="250">
              <template slot-scope="scope"
                ><img :src="scope.row.picture" style="width: 200px"
              /></template>
            </el-table-column>
            <el-table-column prop="subhead" label="商品副标题" width="120">
            </el-table-column>
            <el-table-column prop="category" label="商品种类" width="120">
            </el-table-column>
            <el-table-column prop="description" label="商品描述" width="120">
            </el-table-column>
            <el-table-column prop="price" label="商品价格" width="120">
            </el-table-column>
            <el-table-column prop="brand" label="品牌" width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              width="145"
              prop="id"
              label="操作"
              id="do"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  id="change"
                  @click="changeProduct"
                  >修改</el-button
                >

                <el-button
                  type="danger"
                  size="small"
                  id="delete"
                  @click="deleteProduct(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="this.page.pageNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="this.page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total"
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
  name: "merchandiseMenu",
  created() {
    this.getMerchandise();
  },
  methods: {
    async getMerchandise() {
      const { data: res } = await this.$http.post(
        `/product/getAll?pageNum=${this.page.pageNum}&pageSize=${this.page.pageSize}`
      );
      this.products = res.data.products;
      this.total = res.data.total;
    },
    changeProduct() {
      this.$router.push("/changeProduct");
    },
    async deleteProduct(id) {
      await this.$confirm(
        "此操作将永久删除该商品信息, 是否继续?",
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

      const {data:res} = await this.$http.post(`/admin/config/product/remove`, {"id":`${id}`}, config);
      if (res.code === "00000") {
        this.$message.success("删除成功");
        this.getMerchandise();
      }else {
        this.$message.error("删除失败");
      }
      });
    },

    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.getMerchandise();
    },
    handleCurrentChange(pageNum) {
      this.page.pageNum = pageNum;
      this.getMerchandise();
    },
    async search() {
      if (this.selectClassifiedMerchandise !== []) {
        const {data:res} = await this.$http.post(`/product/getByCategory?category=${this.selectClassifiedMerchandise[0]}&pageNum=${this.page.pageNum}&pageSize=${this.page.pageSize}`);
        console.log(res);
      }else if (this.selectBrand !== '') {
        const {data:res} = await this.$http.post(`/product/getByBrand?brand=${this.selectBrand}&pageNum=${this.page.pageNum}/pageSize=${this.page.pageSize}`);
        console.log(res);
      }
    }
  },
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      classifiedMerchandise: [
        {
          value: "服装",
          label: "服装 "
        },
      ],
      selectClassifiedMerchandise: [],
      products: [],
      total: 0,
      options: [
        {
          value: "小米",
          label: "小米",
        },
        {
          value: "三星",
          label: "三星",
        },
      ],
      selectBrand: "",
      situations: [
        {
          value: "上架",
          label: "上架",
        },
        {
          value: "下架",
          label: "下架",
        },
      ],
      selectSituation: "",
      checkings: [
        {
          value: "审核通过",
          label: "审核通过",
        },
        {
          value: "未通过",
          label: "未通过",
        },
      ],
      checking: "",
    };
  },
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
}
#search,
#reset {
  position: absolute;
  top: -5px;
  right: 0;
}

#search {
  margin-right: 80px;
}
.el-form {
  display: flex;
  justify-content: space-between;
}

.el-card {
  margin-bottom: 35px;
}

#row {
  margin-bottom: 10px;
}
</style>