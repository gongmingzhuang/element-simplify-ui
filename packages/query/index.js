import EsQuery from './src/query'

EsQuery.install = Vue => Vue.component(EsQuery.name, EsQuery);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsQuery);
}

export default EsQuery;