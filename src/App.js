import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Company from "./components/company/Company";
import Auth from "./pages/Auth";
import Login from "./pages/Login.js";
import Main from "./pages/Main.js";
import Home from "../src/pages/Home";
import Home2 from "./pages/Home2";
import Layout from "./components/Layout";
import MenuSet from "./pages/MenuSet";
import CompanyDetail from "./components/company/CompanyDetail";
import CompanyInsert from "./components/company/CompanyInsert";
import CompanyUpdateform from "./components/company/CompanyUpdateform";
import GNB from "./components/GNB";
import LNB from "./components/LNB";
import SubMenu from "./pages/SubMenu";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dz3/" element={<Layout />}>
        <Route path="menuset" element={<MenuSet />} />
        <Route path="auth" element={<Auth />} />
        <Route exact path="company/info" element={<Company />} />
        <Route path="common" element={<Home2 />} />
        <Route path="main2" element={<Home />} />
        <Route path="common" element={<Home2 />} />
        <Route path="main" element={<Layout />} />
        <Route
          exact
          path="company/info/:companyCode"
          element={<CompanyDetail />}
        />
        <Route exact path="company/insert" element={<CompanyInsert />} />
        <Route
          exact
          path="company/update/:companyCode"
          element={<CompanyUpdateform />}
        />
      </Route>
    </Routes>
  );
}
export default App;
