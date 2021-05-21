import EsDialog from './src/dialog'

EsDialog.install = Vue => Vue.component(EsDialog.name, EsDialog);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsDialog);
}

export default EsDialog;