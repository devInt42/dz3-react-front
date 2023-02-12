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
import Modal from "react-modal";
function App() {
  // 모달을 열었을 때 화면을 바라보고 있는 사용자가
  // 모달창이 아닌 다른 컴포넌트의 content를 바라보지 않도록 하기 위해 숨겨줄 엘리먼트를 정의해 줌.
  // 모달이 열렸을 때 #root 엘리먼트를 숨겨주기 위해
  // 우편번호 검색 시 오류 해결
  Modal.setAppElement("#root");
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
