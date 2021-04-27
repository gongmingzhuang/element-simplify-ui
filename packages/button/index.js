import EsButton from './src/button'

EsButton.install = Vue => Vue.component(EsButton.name, EsButton);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsButton);
}

export default EsButton;