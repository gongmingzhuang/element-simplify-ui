import EsAvatarUpload from './src/avatar-upload'

EsAvatarUpload.install = Vue => Vue.component(EsAvatarUpload.name, EsAvatarUpload);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsAvatarUpload);
}

export default EsAvatarUpload