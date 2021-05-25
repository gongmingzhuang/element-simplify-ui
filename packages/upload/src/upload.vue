<template>
  <div class="file-upload">
    <div class="upload-comp">
      <el-upload
        class="upload-demo"
        :class="operate == 'VIEW' || operate == 'APPROVAL' ? 'd-none-i' : ''"
        :action="fileUploadAction"
        :headers="fileUploadConfig"
        :show-file-list="false"
        :before-upload="handleBeforeUpload"
        :on-success="handleOnSuccess"
      >
        <el-button
          class="upload-select"
          :type="filePath ? 'warning' : 'primary'"
          size="mini"
          >{{ filePath ? "变 更" : "选 择" }}
        </el-button>
      </el-upload>
      <!-- 文件查看 -->
      <div class="upload-view" v-if="fileStatus == 'preview' || filePath">
        <el-button type="success" @click="handleOnPreview(operate, filePath)"
          >查 看</el-button
        >
        <!-- 放大图片 -->
        <!-- https://www.cnblogs.com/xiaoyao181/p/8550398.html -->
        <preview-img
          v-if="fileStatus == 'preview' && fileType != 'pdf'"
          @clickit="closePreview"
          :imgSrc="filePreviewPath"
        ></preview-img>
        <!-- pdf -->
        <div
          class="group_img"
          v-if="fileStatus == 'preview' && fileType == 'pdf'"
        >
          <div class="group_img_mask" @click="closePreview"></div>
          <iframe
            title="查看文件"
            :src="filePreviewPath"
            width="100%"
            height="100%"
          ></iframe>
          <!-- v-if="isCheckingFile && isPdfFile" -->
        </div>
      </div>
    </div>
    <!-- 1110 提示语 -->
    <div class="tips"></div>
  </div>
</template>

<script>
// import fileComp from "./FileComp";
// import { fileUpload, fileDownload } from "@/api/admin/file";
// import evanDialog from "@/components/common/evanDialog";
// import { mapGetters } from "vuex";
// 引入图片查看
import PreviewImg from "./preview";
// 1025 过滤器
// import { toThousandslsFilter, dateFormat } from "@/filters/index";
// import { Loading } from "element-ui";
export default {
  name: "file-upload",
  components: {
    // fileComp,
    PreviewImg
    // evanDialog
  },
  props: {
    option: {
      type: Object
    },
    operate: {
      type: String,
      default: "ADD"
    },
    menuDisplay: {
      type: Boolean,
      default: true
    },
    submitBtns: {
      type: Boolean,
      default: true
    },
    tableLoading: {
      type: Boolean
    },
    form: {
      type: Object
    },
    // rules: {
    //   type: Object,
    //   default: null
    // },
    listenChange: {
      type: Function,
      default: null
    },
    name: {
      type: Number,
      default: 0
    },
    treeData: {
      type: Array
    },
    filePath: {
      type: String,
      default: ""
    },
    uploadConfig: {
      type: Object,
      default: () => {
        return { accept: ["jpg"], filesize: 1 };
      }
    }
  },
  // 1025 监听表单变化
  watch: {
    $attrs: {
      handler: function(val) {
        // this.form = JSON.parse(JSON.stringify(val.value));
        if (val.value.hasOwnProperty("daterange")) {
          debugger;
        }
      },
      deep: true
    },
    // 1105 tree 过滤框输入监控
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    // ...mapGetters(["access_token"]),
    // rules: function() {
    //   var rules = {};
    //   this.option.column.forEach(ele => {
    //     if (ele.rules) {
    //       rules[ele.prop] = ele.rules;
    //       // this.$set(this.form, ele.prop, "");
    //     }
    //   });
    //   return rules;
    // }
  },
  // 1009
  data() {
    return {
      visible: false,
      searchMore: "searchMore",
      dialogTile: "新增",
      count: 1,
      fileList: [],
      list: {},
      activeNames: ["1", "2"],
      // form: {},
      formCache: {}, // 1026
      loading: false,
      // 文件上传控件
      fileUploadComp: {
        operate: "info",
        // 上传文件数组
        uploadList: [],
        // 上传文件路径
        uploadAction: "",
        // 文件上传格式限制
        fileFormatArr: ["jpg", "png"],
        // 文件上传大小限制
        fileSizeLimit: 2,
        // 文件下载接口
        downloadAction: "",
        // 上传提示（用于覆盖默认提示）
        uploadTip: ""
      },
      dateRange: {},
      defaultProps: {
        children: "children",
        label: "name"
      },
      filterText: "", // tree
      fileUploadAction: 'http://192.168.200.203:8099/index/upload', // 1110 文件上传接口
      fileUploadConfig: {}, // 1110 文件上传接口
      fileStatus: "ready", // 1110 上传文件状态 ready-可以上传 pendding-上传中 error-上传失败 success-上传成功 preview-预览
      fileType: "jpg", // 1110 文件类型 jpg、pdf
      // filePath: "", // 1110 当前查看文件路径
      filePreviewPath: "", // 1110 当前文件预览路径
      fullscreenLoading: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 1019 条件查询
    search() {
      this.$emit("getList", this.form);
    },
    // 1019 清空查询条件
    reset() {
      this.form = {};
      // this.$refs.form.resetFields();
      this.$emit("getList", {});
    },
    // 1019 高级查询显示控制
    searchMoreCtrl() {
      if (this.searchMore) {
        this.searchMore = "";
      } else {
        this.searchMore = "searchMore";
      }
    },
    // 1019 弹窗
    init(dialogTitle) {
      if (dialogTitle) {
        this.dialogTile = dialogTitle;
      }
      this.visible = true;
    },
    // 1019 关闭
    close() {
      this.visible = false;
      this.$refs.evan_form.clearValidate();
      // 清除弹窗组件表单对象，防止下次打开缓存数据
      this.$refs["evan-dialog"].$children[0].init();
      // this.beforeClose();
    },
    // 1019 关闭弹窗前触发
    beforeClose(done) {
      // 清除弹窗组件表单对象，防止下次打开缓存数据
      this.$refs["evan-dialog"].$children[0].init();
      done();
    },
    submit() {
      switch (this.operate) {
        case "ADD":
          // this.loading = true;
          // debugger;
          this.$refs.evan_form.validate(valid => {
            debugger;
            if (valid) {
            }
          });
          this.$emit(
            "row-save",
            this.form,
            () => {
              this.loading = false;
              // 1025 关闭弹窗
              // this.$nextTick(() => {
              //   this.$emit("close-dialog");
              // });
            },
            () => {
              this.loading = false;
            }
          );
          break;
        case "EDIT":
          this.loading = true;
          // var _this = this;
          // this.form = JSON.parse(JSON.stringify(this.form));
          setTimeout(() => {
            this.$emit(
              "row-update",
              this.form,
              this.form.id,
              () => {
                this.loading = false;
                // var dk = _this.form;
                // debugger;
                // 1025 关闭弹窗
                // this.$nextTick(() => {
                // this.$emit("close-dialog");
                // });
              },
              () => {
                this.loading = false;
              }
            );
          }, 1000);
      }

      // let canSubmit = true;
      // this.list.forEach((item, index) => {
      //   this.option.forEach(item => {
      //     if (
      //       item.prop != "default" &&
      //       !this.form[item.prop + "_" + index]
      //     ) {
      //       console.log("item:", item.prop);
      //       canSubmit = false;
      //     }
      //   });
      // });
      // if (!canSubmit) {
      //   this.$message.error("存在未填项...");
      //   console.log(this.form);
      // } else {
      //   console.log(this.form);
      // }
    },
    delectRow(index) {
      console.log(index);
      this.list.splice(index, 1);
      console.log(this.list);
    },
    addRow() {
      this.count += 1;
      this.list.push({ protocol: this.count });
      console.log(this.list);
    },
    // 1028 弹窗：关闭
    cancle() {
      this.fileStatus = "ready";
      this.$emit("row-cancle");
    },
    // 1023 折叠面板：change 事件
    handleEventListener(field, form) {
      this.$emit("field-blur", field, JSON.parse(JSON.stringify(form)));
    },
    handleChange(activeNames) {},
    // 1102 日期范围选择变动
    datePickerChange(val, field, props, format) {
      let valueFormat = format || "YYYY-MM-DD";
      this.$set(this.form, props[0], this.$moment(val[0]).format(valueFormat));
      this.$set(this.form, props[1], this.$moment(val[1]).format(valueFormat));
    },
    // 1105 tree控件-过滤
    filterNode(value, data) {
      debugger;
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 1105 tree 选择
    handleNodeClick(node, field, idField) {
      this.$set(this.form, field, node.name);
      this.$set(this.form, idField, node.id);
    },
    // 1110 文件上传前触发
    handleBeforeUpload(file, field) {
      // this.uploadConfig;
      // this._load("文件上传中...");
      // this._Load.loading();
      // this.fullscreenLoading = true;
      let { accept, filesize } = this.uploadConfig;
      let { type, size } = file;
      let transferAccept = []; // 格式转换数组
      accept.forEach(item => {
        switch (item) {
          case "jpg":
            transferAccept.push("image/jpeg");
            break;
          case "png":
            transferAccept.push("iamge/png");
            break;
          case "pdf":
            transferAccept.push("application/pdf");
            break;
        }
      });
      // 文件类型判断
      if (!transferAccept.includes(type)) {
        // this._loadCls();
        this.$message.error("上传文件支持类型：" + accept.join("、"));
        return false;
      }
      // 文件大小判断
      if (size > filesize * 1024 * 1024) {
        // this._loadCls();
        this.$message.error("上传文件大小限制：小于" + filesize + "M");
        return false;
      }
      return true;
    },
    // 1110 文件上传成功后触发
    handleOnSuccess(response, form, field) {
      if (response.code == '0000') {
        this.$message.success("上传成功");
        // this.fileStatus = "success";
        // this.filePath = response.data;
        //
        // this.$set(form, field, response.data);
        this.$emit("on-success", response);
      } else {
        this.$message.error("上传失败");
        this.$message.error(response.message);
      }
      // 加载状态
      // this._loadCls();
    },
    // 1110 查看文件
    handleOnPreview(operate, path) {
      let filePath = this.filePath;
      if (operate == "EDIT" || operate == "VIEW" || operate == "APPROVAL") {
        filePath = path;
      }
      let _this = this;
      this.fileType = filePath
        .toLowerCase()
        .substring(filePath.lastIndexOf(".") + 1);
      // 处理pdf文件遮罩层
      if (this.fileType == "pdf") {
        var xhr = new XMLHttpRequest();

        xhr.open(
          "GET",
          this.$serverIp + "/file/oss/download?filePath=" + filePath
        );
        xhr.onreadystatechange = handler;
        xhr.responseType = "blob";
        xhr.setRequestHeader("Authorization", "Bearer " + this.access_token);
        xhr.send();

        function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              // this.response is a Blob, because we set responseType above
              console.log("this.response:", this.response);
              _this.filePreviewPath = URL.createObjectURL(this.response);
              _this.fileStatus = "preview";
              // debugger;
              // document.querySelector("#output-frame-id").src = data_url;
            } else {
              console.error("no pdf :(");
            }
          }
        }
      } else {
        this.filePreviewPath = filePath;
        this.fileStatus = "preview";
      }
      // debugger;
    },
    // 1110 关闭预览
    closePreview() {
      this.fileStatus = "success";
    },
     // 1124 上传发票成功回显
    // handleOnSuccess(res, index) {
    //   this.$set(this.list[index], "invoiceUrl", res);
    // },
    // 1112 加载框
    // load.loading
    // load.stop
    /*
    
    */
    // loading() {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: "Loading",
    //     spinner: "el-icon-loading",
    //     background: "rgba(0, 0, 0, 0.7)"
    //   });
    // }
  }
};

/**
 * 功能开放：
 * 【1019】：添加搜索（含高级搜索）
 * 1.crud.js 文件中 searchMoreCtrl: true, // 1019 高级搜索开关，字段相关属性（searchProp：查询字段，searchMore：属于高级搜索字段）
 * 2.父组件（应用高级搜索页面）：<avue-crud> 前添加 </avue-crud><evan-crud :option="option" @getList="handleFilter"></evan-crud>，其中handleFilter 方法为原<avue-crud></avue-crud> search-change 方法；
 * 【1019】：添加表头添加按钮
 *
 * 【1105】
 * 问题记录：
 * 1.[to-do] 查看详情时，会触发校验规则校验
 *
 */
</script>

<style lang="less">
.basic-container {
  padding: 8px 10px;
  border-radius: 10px;
  box-sizing: border-box;
  .el-card {
    width: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
  &--block {
    height: 100%;
    .el-card {
      height: 100%;
    }
  }
}
</style>
<style lang="less">
.file-upload {
  .p-abs {
    position: absolute;
  }
  .ispopup {
    button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  input[type="text"],
  .el-select,
  .el-date-editor {
    width: 100%;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    color: #606266;
    cursor: text;
  }
  // input[type="text"][readonly="readonly"] {
  //   background-color: #f5f7fa;
  //   color: #c0c4cc;
  // }
  .upload-comp {
    display: flex;
    // justify-content: end;  // 1201
    .upload-view {
      margin-left: 10px;
      button {
        padding: 7px 15px;
      }
    }
    .group_img {
      position: fixed;
      top: 5vh;
      left: 5vw;
      width: 90vw;
      height: 90vh;
      z-index: 1000;
      .group_img_mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
      }
      iframe {
        position: relative;
        z-index: 200;
      }
    }
    & + .tips {
      font-size: 14px;
      color: #f00;
    }
  }
}
.evan-form__menu {
  margin-top: 20px;
}
.evan-form__menu--center {
  text-align: center;
}
.d-inblock {
  display: inline-block;
}
.el-select :not(.is-disabled) > input[readonly] {
  background-color: #fff !important;
}
</style>
