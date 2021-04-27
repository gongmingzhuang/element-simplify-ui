
import EsButton from "../packages/button/index"
import 'element-ui/lib/theme-chalk/index.css'

const components = [
  EsButton
]

const install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component);
  })
}

/* istanbul ignore if */
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }

export default install

