import EsCrumb from './src/crumb'

EsCrumb.install = Vue => Vue.component(EsCrumb.name, EsCrumb);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsCrumb);
}

export default EsCrumb;