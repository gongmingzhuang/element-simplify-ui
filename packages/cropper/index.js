import EsCropper from './src/cropper'

EsCropper.install = Vue => Vue.component(EsCropper.name, EsCropper);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsCropper);
}

export default EsCropper;