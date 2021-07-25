import Vue from 'vue'
import {
    Button,
    Container,
    Header,
    Main,
    Aside,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Select,
    Option,
    FormItem,
    Form,
    Input,
    Cascader,
    Upload,
    Message,
    Row,
    Col,
    Table,
    TableColumn,
    Pagination,
    MessageBox,
    Footer
} from 'element-ui'

Vue.use(Button)
Vue.use(Header)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu);
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Cascader)
Vue.use(Upload)
Vue.prototype.$message = Message
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Footer)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt