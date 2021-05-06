import EsTabs from './src/tabs'

EsTabs.install = Vue => Vue.component(EsTabs.name, EsTabs);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsTabs);
}

export default EsTabs;