import EsDialogForm from './src/dialog-form'

EsDialogForm.install = Vue => Vue.component(EsDialogForm.name, EsDialogForm);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsDialogForm);
}

export default EsDialogForm;