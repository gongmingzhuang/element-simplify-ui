import EsImageGroup from './src/image-group'

EsImageGroup.install = Vue => Vue.component(EsImageGroup.name, EsImageGroup);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsImageGroup);
}

export default EsImageGroup;