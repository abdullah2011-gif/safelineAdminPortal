import Login from "./views/Login/Loginandregister";
import Dashboard from "views/Dashboard/Dashboard";
import Manageaccount from "views/Settings/Manageaccount";
import Manageprofile from "views/Settings/Manageprofile";
import Line from "views/Line/Line";
import Entries from "./views/Entries/Entries";
import Tables from "views/Tables/Tables";
import Parties from "views/Parties/Parties";
import Customers from "views/Customers/Customers";
import AddEmployee from "views/Employee/AddEmployee";
import Employee from "views/Employee/Employee";
import Errors from "./NodeFunctions/Error";
import Notifications from "views/Notifications/Notifications";
import AddCustomers from "views/Customers/AddCustomers";
import ReservedTable from "views/Tables/ReservedTable";
import ReservedParties from "views/Parties/ReservedParties";

const dashboardRoutes = [
  {
    path: "/Error",
    name: "Error",
    icon: "ni ni-key-25 text-info",
    component: Errors,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    redirect: true,
  },
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
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-user",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/line",
    name: "Line",
    icon: "pe-7s-note2",
    component: Line,
    layout: "/admin",
  },

  {
    path: "/bartables",
    name: "Bar Tables",
    icon: "pe-7s-note2",
    component: Tables,
    layout: "/admin",
    // redirect: true,
  },
  {
    path: "/reserved-table",
    name: "Add Reservations",
    icon: "pe-7s-note2",
    component: ReservedTable,
    layout: "/admin",
    // redirect: true,
  },
  {
    path: "/reserved-parties",
    name: "Pre-Reservations",
    icon: "pe-7s-note2",
    component: ReservedParties,
    layout: "/admin",
    // redirect: true,
  },
  {
    path: "/Parties",
    name: "Parties",
    icon: "pe-7s-user",
    component: Parties,
    layout: "/admin",
    // redirect: true,
  },
  {
    path: "/entries",
    name: "Entries",
    icon: "pe-7s-user",
    component: Entries,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-note2",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/addcustomer",
    name: "Add Customer",
    icon: "pe-7s-user",
    component: AddCustomers,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/customer",
    name: "Customer",
    icon: "pe-7s-note2",
    component: Customers,
    layout: "/admin",
  },
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
];

export default dashboardRoutes;
