import EsInfoForm from './src/info-form'

EsInfoForm.install = Vue => Vue.component(EsInfoForm.name, EsInfoForm);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsInfoForm);
}

export default EsInfoForm;