import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../components/admin/admin'
import Welcome from '../components/welcome.vue'
import MerchadiseMenu from "../components/product/product"
import AddMerchandise from "../components/product/addProduct"
import Login from "../components/admin/adminLogin"
import BrandAdministration from "../components/brand/productBrand"
import AddBrand from "../components/brand/addBrand"
import ClassifyMerchandise from "../components/classifyMerchandise.vue"
import AddCategory from "../components/category/addCategory"
import ChangeProduct from "../components/product/changeProduct"
import ProductCategory from "../components/category/productCategory"
import Register from "../components/admin/adminRegister"
import UserLogin from "../components/user/userLogin"
import UserRegister from "../components/user/userRegister"


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
