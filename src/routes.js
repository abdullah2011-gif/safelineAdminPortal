/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Login from "./views/Login/Loginandregister";
import Manageaccount from "views/Settings/Manageaccount";
import Manageprofile from "views/Settings/Manageprofile";
import Dashboard from "views/Settings/Dashboard";
import Line from "views/Line/Line";
import AddLine from "views/Line/AddLine";
import AddCustomers from "views/Customers/AddCustomers";
import Customers from "views/Customers/Customers";
import Notifications from "views/Notifications/Notifications";
// import Addmembership from "views/Memberships/Addmembership";
import Categories from "views/Categories/Categories";
import Addcategories from "views/Categories/Addcategories";
import AddEmployee from "views/Employee/AddEmployee";
import Employee from "views/Employee/Employee";
import Errors from "./NodeFunctions/Error";

import Test from "./views/test/test";
const dashboardRoutes = [
  //-----------------------------------------------------Error------------------------------------------
  {
    path: "/Error",
    name: "Error",
    icon: "ni ni-key-25 text-info",
    component: Errors,
    layout: "/admin",
    redirect: true,
  },
  //------------------------------------------------------------------Login------------------------------------
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    redirect: true,
  },
  // {
  //   path: "/Test",
  //   name: "Test",
  //   icon: "pe-7s-graph",
  //   component: Test,
  //   layout: "/admin",
  // },
  //--------------------------------------------------------------Dashboard--------------------------------------------
  {
    path: "/dashboard",
    name: "Summary",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
  },
  //------------------------------------------------------------Settings------------------------------------------------
  {
    path: "/manage_account",
    name: "Manage Account",
    icon: "pe-7s-user",
    component: Manageaccount,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/manage_profile",
    name: "Manage Profile",
    icon: "pe-7s-note2",
    component: Manageprofile,
    layout: "/admin",
    redirect: true,
  },

  //-------------------------------------------------------Line------------------------------------------------

  {
    path: "/addline",
    name: "Add Line",
    icon: "pe-7s-user",
    component: AddLine,
    layout: "/admin",
  },
  {
    path: "/line",
    name: "Line",
    icon: "pe-7s-note2",
    component: Line,
    layout: "/admin",
  },

  //------------------------------------------------------------Customers----------------------------------------------------
  // {
  //   path: "/addcustomer",
  //   name: "Add Customer",
  //   icon: "pe-7s-user",
  //   component: AddCustomers,
  //   layout: "/admin",
  // },
  {
    path: "/customer",
    name: "Customer",
    icon: "pe-7s-note2",
    component: Customers,
    layout: "/admin",
  },

  //------------------------------------------------------------Employes------------------------------------------------------

  {
    path: "/addemployee",
    name: "Add Employee",
    icon: "pe-7s-user",
    component: AddEmployee,
    layout: "/admin",
  },
  {
    path: "/employee",
    name: "Employee",
    icon: "pe-7s-note2",
    component: Employee,
    layout: "/admin",
  },
  //------------------------------------------------------------------Notifications-----------------------------------------
  // {
  //   path: "/admembership",
  //   name: "Add Membership",
  //   icon: "pe-7s-user",
  //   component: Addmembership,
  //   layout: "/admin",
  //   redirect: true,
  // },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-note2",
    component: Notifications,
    layout: "/admin",
  },
  //--------------------------------------------------------Categories-------------------------------------------------------
  // {
  //   path: "/addcategories",
  //   name: "Add Categories",
  //   icon: "pe-7s-user",
  //   component: Addcategories,
  //   layout: "/admin",
  //   redirect: true,
  // },
  // {
  //   path: "/categories",
  //   name: "Categories",
  //   icon: "pe-7s-note2",
  //   component: Categories,
  //   layout: "/admin",
  //   redirect: true,
  // },
];

export default dashboardRoutes;
