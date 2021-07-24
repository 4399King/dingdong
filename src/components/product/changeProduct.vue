<template>
  <div id="changeProduct">
    <el-card class="box-card">
      <el-form ref="changeProductRef" label-width="200px">
        <el-form-item label="商品编号">
          <el-input v-model="changeProductInfo.id"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="changeProductInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="商品副标题">
          <el-input v-model="changeProductInfo.subhead"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="changeProductInfo.brand" placeholder="请选择">
            <el-option
              v-for="item in selectBrand"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-cascader
            v-model="selectClassifiedMerchandise"
            :options="classifiedMerchandise"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="changeProductInfo.description"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="changeProductInfo.price"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="upload-demo"
            action=""
            :on-change="onUploadChange"
            :limit="1"
            :file-list="fileList"
            list-type="picture"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传一张图片jpeg,jpg,png,gif,svg格式且不超过2MB
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="success" @click="changeProduct"
            >修改商品信息</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "changeProduct",
  data(){
    return {
      changeProductInfo:{
        "id": "",
      "name": "",
        "subhead": "",
        "brand": "",
        "category": "",
        "description": "",
        "price": "",
        "picture": ""
      },
            brand: "",
      selectBrand: [
        {
          value: "小米",
          label: "小米",
        },
      ],
      fileList: [],
      classifiedMerchandise: [
        {
          value: "手机数码",
          label: "手机数码",
          children: [
            {
              value: "手机配件",
              label: "手机配件",
            },
          ],
        },
      ],
      selectClassifiedMerchandise: [],
    }
  },
  methods:{
      onUploadChange(file) {
      const isIMAGE =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/png" ||
        file.raw.type === "image/gif" ||
        file.raw.type === "image/jpg" ||
        file.raw.type === "image/svg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      let _this = this;
      this.uploadFile = file;
      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function (e) {
        _this.imgUrl = this.result;
        console.log(_this.imgUrl); //图片的base64数据
      };
    },
      changeProduct(){
          let config = {
        headers:{"Authorization": `${window.sessionStorage.getItem("tokenHead")} ${window.sessionStorage.getItem("token")}`}
      }
      this.changeProductInfo.category = this.selectClassifiedMerchandise[1];
      this.changeProductInfo.picture = this.imgUrl;
      this.$http
        .post("/admin/config/product/update", this.changeProductInfo, config)
        .then(() => {
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.err("修改失败");
        });
      }
  }
};
</script>