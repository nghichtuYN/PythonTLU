import DashboardPage from "../pages/DashboardPage/DashboardPage";
import { DetailCategoryPage } from "../pages/DetailCategoryPage/DetailCategoryPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ManageCategoryPage from "../pages/ManageCategoryPage/ManageCategoryPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import { HomePage } from "../pages/HomePage/HomePage";
import SizeCategoryPage from "../pages/SizeCategoryPage/SizeCategoryPage";
import DetailSizeCategoryPage from "../pages/DetailSizeCategoryPage/DetailSizeCategoryPage";
import ManageProduct from "../pages/ManageProduct/ManageProduct";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";
import CategoryDetailClient from "../pages/CategoryDetailClient/CategoryDetailClient";
import DetailProductClientPage from "../pages/DetailProductClientPage/DetailProductClientPage";
import DetailProductItemPage from "../pages/DetailProductItemPage/DetailProductItemPage";
import ShoppingCartPage from "../pages/ShoppingCartPage/ShoppingCartPage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
import ManageOrdersPage from "../pages/ManageOrdersPage/ManageOrdersPage";
import { ManageOrderItemsPage } from "../pages/ManageOrderItemsPage/ManageOrderItemsPage";
export const publicRouter = [
  { path: "admin/dashboard/", component: DashboardPage, layout: "admin" },
  { path: "/admin/product/", component: ManageProduct, layout: "admin" },
  {
    path: "/admin/category/",
    component: ManageCategoryPage,
    layout: "admin",
  },
  {
    path: "/admin/orders/",
    component: ManageOrdersPage,
    layout: "admin",
  },
  {
    path: "/admin/orders/:id",
    component: ManageOrderItemsPage,
    layout: "admin",
  },
  {
    path: "/admin/category/detailCategory/:id/",
    component: DetailCategoryPage,
    layout: "admin",
  },
  {
    path: "/admin/product/detailProduct/:id/",
    component: DetailProductPage,
    layout: "admin",
  },
  {
    path: "/admin/product/productItem/:id/",
    component: DetailProductItemPage,
    layout: "admin",
  },
  {
    path: "/admin/size_category/detailSizeCategory/:id/",
    component: DetailSizeCategoryPage,
    layout: "admin",
  },
  {
    path: "/:gender/",
    component: HomePage,
    layout: "client",
  },
  {
    path: "/:gender/:category/cat/:id",
    component: CategoryDetailClient,
    layout: "client",
  },
  {
    path: "/:product/prd/:id/items/:itemID",
    component: DetailProductClientPage,
    layout: "client",
  },
  {
    path: "/cart",
    component: ShoppingCartPage,
    layout: "client",
  },
  {
    path: "/checkout",
    component: CheckOutPage,
    layout: "client",
  },
  {
    path: "/login",
    component: LoginPage,
    layout: "none",
  },
  {
    path: "/register",
    component: RegisterPage,
    layout: "none",
  },
  {
    path: "/admin/size_category/",
    component: SizeCategoryPage,
    layout: "admin",
  },
  {
    path: "/admin/size_category/",
    component: SizeCategoryPage,
    layout: "admin",
  },
];
