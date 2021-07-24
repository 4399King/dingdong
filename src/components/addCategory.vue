<template>
  <div id="addCategory">
    <el-card class="box-card">
      <el-form ref="addCategoryRef" label-width="200px">
        <el-form-item label="类别名称">
          <el-input v-model="addCategoryInfo.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="类别图片">
          <el-upload
            class="upload-demo"
            action=""
            :on-change="onUploadChange"
            :limit="1"
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
          <el-button size="small" type="success" @click="addCategory"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "addCategory",
  data() {
    return {
      addCategoryInfo: {
        "categoryName": "",
        "categoryPic": "",
      },
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
      reader.onload = function () {
        _this.addCategoryInfo.categoryPic = this.result;
      };
    },
    async addCategory() {
      let config = {
        headers:{"Authorization": `${window.sessionStorage.getItem("tokenHead")} ${window.sessionStorage.getItem("token")}`}
      }
      const { data: res } = await this.$http.post(
        "/admin/config/productCategory/add",
        this.addCategoryInfo,
        config
      );
      if (res.code === "00000") {
        this.$message.success("提交成功");
      }else {
        this.$message.error("提交失败");
      }
     
    },
  },
};
</script>