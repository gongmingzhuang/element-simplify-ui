import EsVideoUpload from './src/video-upload'

EsVideoUpload.install = Vue => Vue.component(EsVideoUpload.name, EsVideoUpload);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsVideoUpload);
}

export default EsVideoUpload