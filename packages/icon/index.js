import EsCloseIcon from './src/closeIcon'

EsCloseIcon.install = Vue => Vue.component(EsCloseIcon.name, EsCloseIcon);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsCloseIcon);
}

export default EsCloseIcon;