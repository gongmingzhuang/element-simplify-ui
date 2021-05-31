import EsAside from './src/aside'

EsAside.install = Vue => Vue.component(EsAside.name, EsAside);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsAside);
}

export default EsAside;