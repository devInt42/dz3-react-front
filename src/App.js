import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
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

function App() {
  return (
    <Routes>
      <Route path="/dz3/">
        <Route path="" element={<Login />} />
        <Route path="main" element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="common" element={<Home2 />} />
        <Route path="main2" element={<Home />} />
        <Route path="common" element={<Home2 />} />
        <Route path="main" element={<Layout />} />
        <Route path="menuset" element={<MenuSet />} />
        <Route exact path="company" element={<Company />} />
      </Route>
    </Routes>
  );
}
export default App;
