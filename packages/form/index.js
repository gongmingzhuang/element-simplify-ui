import EsForm from './src/form'

EsForm.install = Vue => Vue.component(EsForm.name, EsForm);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsForm);
}

export default EsForm;