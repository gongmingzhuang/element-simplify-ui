
import EsAside from "../packages/aside/index"
import EsButton from "../packages/button/index"
import EsButtonGroup from "../packages/button-group/index"
import EsCropper from "../packages/cropper/index"
import EsCrumb from "../packages/crumb/index"
import EsDialog from "../packages/dialog/index"
import EsDialogForm from "../packages/dialog-form/index"
import EsEditForm from "../packages/edit-form/index"
import EsForm from "../packages/form/index"
import EsFormEx from "../packages/form-ex/index"
import EsInfoForm from "../packages/info-form/index"
import EsMenu from "../packages/menu/index"
import EsImageGroup from "../packages/image-group/index"
import EsQuery from "../packages/query/index"
import EsTable from "../packages/table/index"
import EsTabs from "../packages/tabs/index"
import EsUpload from "../packages/upload/index"
import 'element-ui/lib/theme-chalk/index.css'
import '../lib/css/public.css'
import ElementUI from 'element-ui'
import Moment from 'moment'

const components = [
  EsAside,
  EsButton,
  EsButtonGroup,
  EsCropper,
  EsCrumb,
  EsDialog,
  EsDialogForm,
  EsEditForm,
  EsForm,
  EsFormEx,
  EsInfoForm,
  EsImageGroup,
  EsMenu,
  EsQuery,
  EsTable,
  EsTabs,
  EsUpload
]

const install = Vue => {
  // [20210531][upd] 修复在template 中直接使用new Error 报错异常
  Vue.prototype.Error = Error
  Vue.prototype.$moment = Moment
  Vue.use(ElementUI)
  components.forEach(component => {
    Vue.component(component.name, component);
  })
}

/* istanbul ignore if */
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }

export default {
  install,
  EsAside,
  EsButton,
  EsButtonGroup,
  EsCrumb,
  EsDialog,
  EsDialogForm,
  EsEditForm,
  EsForm,
  EsFormEx,
  EsInfoForm,
  EsImageGroup,
  EsMenu,
  EsQuery,
  EsTable,
  EsTabs,
  EsUpload
}

