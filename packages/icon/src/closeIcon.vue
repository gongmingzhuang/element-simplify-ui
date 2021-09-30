<template>
  <div
    class="es-close"
    @click="handleCloseEvent"
  >
    <span class="">
      <i class="el-icon-close"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'EsCloseIcon',
  props: {
    closeEvent: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
    handleCloseEvent() {
      this.closeEvent()
    }
  }
}
</script>
<style lang='less'>
@basic-color: #888;
@hover-color: #fff;
.es-close {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border: 1px solid @basic-color;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 18px;
  color: @basic-color;
  &:hover {
    color: @hover-color;
    border-color: transparent;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  span {
    position: relative;
  }
}
</style>
