import EsUpload from './src/upload'

EsUpload.install = Vue => Vue.component(EsUpload.name, EsUpload);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsUpload);
}

export default EsUpload;