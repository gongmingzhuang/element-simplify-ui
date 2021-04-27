<template>
  <div>
    <el-button><slot></slot></el-button>
  </div>
</template>

<script>
  import { Button } from "element-ui"
  export default {
    name: "EsButton",
    components: {
      "el-button": Button
    },
    data(){
      return {

      }
    }
  }
</script>

<style scoped>

</style>