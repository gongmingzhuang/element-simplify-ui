import EsTable from './src/table'

EsTable.install = Vue => Vue.component(EsTable.name, EsTable);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsTable);
}

export default EsTable;