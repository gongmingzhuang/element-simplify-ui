import { Message, Loading } from 'element-ui'
export default {
  data () {
    return {
      loadInstance: null
    }
  },
  methods: {
    loadStart(loadTip) {
      this.$nextTick(() => {
        this.loadInstance = Loading.service({
          lock: true,
          text: loadTip || 'loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true,
        })
      })
    },
    loadEnd() {
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        this.loadInstance.close()
      })
    }
  }
}