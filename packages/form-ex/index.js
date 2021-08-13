import EsFormEx from 'element-simplify-ui/packages/form-ex/src/form-ex'

EsFormEx.install = Vue => Vue.component(EsFormEx.name, EsFormEx);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsFormEx);
}

export default EsFormEx;