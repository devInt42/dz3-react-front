import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Company from "./components/company/Company";
import Auth from "./pages/Auth";
import Login from "./pages/Login.js";
import Layout from "./pages/Layout";
import MenuSet from "./pages/MenuSet";
import NoMenu from "./pages/NoMenu";
import AuthGroup from "./pages/AuthGroup";
import Department from "./components/department/Department";
import NotSelected from "./pages/NotSelected";
import EmployeeSet from "./pages/EmployeeSet";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dz3/" element={<Layout />}>
        <Route path="menuset" element={<MenuSet />} />
        <Route path="notselected" element={<NotSelected />} />
        <Route path="auth" element={<Auth />} />
        <Route path="authgroup" element={<AuthGroup />} />
        <Route exact path="company/info" element={<Company />} />
        <Route path="nomenu" element={<NoMenu />} />
        <Route path="employeeset" element={<EmployeeSet />} />
        <Route exact path="company" element={<Company />} />
        <Route exact path="department" element={<Department />} />
      </Route>
    </Routes>
  );
}
export default App;
