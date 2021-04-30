
import EsButton from "../packages/button/index"
import EsMenu from "../packages/menu/index"
import 'element-ui/lib/theme-chalk/index.css'
import '../lib/css/public.css'
import ElementUI from 'element-ui'

const components = [
  EsButton,
  EsMenu
]

const install = Vue => {
  // const ElementUI = require('element-ui')
  Vue.use(ElementUI)
  components.forEach(component => {
    Vue.component(component.name, component);
  })
}

/* istanbul ignore if */
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }

export default install

