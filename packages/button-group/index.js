import EsButtonGroup from './src/button-group'

EsButtonGroup.install = Vue => Vue.component(EsButtonGroup.name, EsButtonGroup);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsButtonGroup);
}

export default EsButtonGroup;