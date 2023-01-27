import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Company from "./components/company/Company";
import Auth from "./pages/Auth";
import Login from "./pages/Login.js";
import Home2 from "./pages/Home2";
import Layout from "./pages/Layout";
import MenuSet from "./pages/MenuSet";
import CompanyDetail from "./components/company/CompanyDetail";
import CompanyUpdateform from "./components/company/CompanyUpdateform";
import NoMenu from "./pages/NoMenu";
import AuthGroup from "./pages/AuthGroup";
import Department from "./components/department/Department";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dz3/" element={<Layout />}>
        <Route path="menuset" element={<MenuSet />} />
        <Route path="auth" element={<Auth />} />
        <Route path="authgroup" element={<AuthGroup />} />
        <Route exact path="company/info" element={<Company />} />
        <Route path="common" element={<Home2 />} />
        <Route path="nomenu" element={<NoMenu />} />
        <Route
          exact
          path="company/info/:companyCode"
          element={<CompanyDetail />}
        />
        <Route
          exact
          path="company/update/:companyCode"
          element={<CompanyUpdateform />}
        />
        <Route exact path="company" element={<Company />} />
        <Route exact path="department" element={<Department />} />
      </Route>
    </Routes>
  );
}
export default App;
