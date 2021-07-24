<template>
  <div id="addMerchandise">
    <el-card class="box-card">
      <el-form ref="addMerchandiseFormRef" label-width="200px">
        <el-form-item label="商品名称">
          <el-input v-model="addMerchandise.name"></el-input>
        </el-form-item>
        <el-form-item label="商品副标题">
          <el-input v-model="addMerchandise.subhead"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="addMerchandise.brand" placeholder="请选择">
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
          <el-input v-model="addMerchandise.description"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="addMerchandise.price"></el-input>
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
          <el-button
          
          size="small"
          type="success"
          @click="submitUpload"
          >添加商品</el-button
        >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "addMerchandise",
  data() {
    return {
      brand: "",
      selectBrand: [
        {
          value: "小米",
          label: "小米",
        },
      ],
      addMerchandise: {
        "name": "",
        "subhead": "",
        "brand": "",
        "category": "",
        "description": "",
        "price": "",
        "picture": "",
      },
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
    };
  },
  methods: {
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
        
      };
    },
    submitUpload() {
      
      let config = {
        headers:{"Authorization": `${window.sessionStorage.getItem("tokenHead")} ${window.sessionStorage.getItem("token")}`}
      }
      this.addMerchandise.category = this.selectClassifiedMerchandise[1];
      this.addMerchandise.picture = this.imgUrl;
      this.$http
        .post("/admin/config/product/add", this.addMerchandise, config)
        .then((res) => {
          console.log("success");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>