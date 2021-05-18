
import EsButton from "../packages/button/index"
import EsButtonGroup from "../packages/button-group/index"
import EsCrumb from "../packages/crumb/index"
import EsMenu from "../packages/menu/index"
import EsQuery from "../packages/query/index"
import EsTable from "../packages/table/index"
import EsTabs from "../packages/tabs/index"
import 'element-ui/lib/theme-chalk/index.css'
import '../lib/css/public.css'
import ElementUI from 'element-ui'

const components = [
  EsButton,
  EsButtonGroup,
  EsCrumb,
  EsMenu,
  EsQuery,
  EsTable,
  EsTabs
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

