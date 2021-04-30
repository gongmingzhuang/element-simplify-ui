import EsMenu from './src/menu'

EsMenu.install = Vue => Vue.component(EsMenu.name, EsMenu);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EsMenu);
}

export default EsMenu;