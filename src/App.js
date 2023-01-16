import { Route, Routes, Switch } from "react-router-dom";
import React from "react";
import Company from "./components/company/Company";
import Auth from "./pages/Auth";
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
import Login from "./pages/Login";
import { Container, Col, Row } from "react-bootstrap";

function App() {
  return (
    <Container fluid="true">
      <GNB />
      <Row>
        <Col xs={1}>
          <LNB />
        </Col>
        <Col xs={11}>
          <Routes>
            <Route path="/dz3/">
              <Route path="" element={<Login />} />
              <Route path="main" element={<Home />} />
              <Route path="auth" element={<Auth />} />
              <Route path="common" element={<Home2 />} />
              <Route path="main" element={<Layout />} />
              <Route path="menuset" element={<MenuSet />} />
              <Route exact path="company/info" element={<Company />} />
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
        </Col>
      </Row>
    </Container>
  );
}

export default App;
