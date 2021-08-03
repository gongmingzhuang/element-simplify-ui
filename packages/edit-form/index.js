import EsEditForm from './src/edit-form'

EsEditForm.install = Vue => Vue.component(EsEditForm.name, EsEditForm);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsEditForm);
}

export default EsEditForm;