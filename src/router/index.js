import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../components/admin.vue'
import Welcome from '../components/welcome.vue'
import MerchadiseMenu from "../components/merchandiseMenu"
import AddMerchandise from "../components/addMerchandise"
import Login from "../components/login.vue"
import BrandAdministration from "../components/brandAdministration.vue"
import AddBrand from "../components/addBrand.vue"
import ClassifyMerchandise from "../components/classifyMerchandise.vue"
import AddCategory from "../components/addCategory.vue"
import ChangeProduct from "../components/changeProduct.vue"
import ProductCategory from "../components/productCategory.vue"
import Register from "../components/register.vue"
import UserLogin from "../components/userLogin.vue"
import UserRegister from "../components/userRegister.vue"


Vue.use(VueRouter)

const routes = [
  {path:"/",redirect:"/userLogin"},
  {path:"/register", component:Register},
  {path:"/login",component:Login},
  {path:"/userLogin", component:UserLogin},
  {path:"/userRegister", component:UserRegister},
  {path:"/admin",component:Admin, redirect:"welcome",children:[{path:"/welcome", component:Welcome},{path:"/merchandiseMenu", component:MerchadiseMenu},{path:"/addMerchandise", component:AddMerchandise},{path:"/brandAdministration", component:BrandAdministration},{path:"/addBrand", component:AddBrand},{path:"/classifyMechandise", component:ClassifyMerchandise},{path:"/addCategory", component:AddCategory},{path:"/changeProduct", component:ChangeProduct},{path:"/productCategory", component:ProductCategory}]}
]

const router = new VueRouter({
  routes
})

export default router
