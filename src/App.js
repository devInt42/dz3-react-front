import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage.js";
import Employee from "./pages/Employee";
import Company from "./pages/Company";
import Auth from "./pages/Auth";
import Login from "./pages/Login.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dz3/">
          <Route path="" element={<Home />} />
          <Route path="employee" element={<Employee />} />
          <Route path="company" element={<Company />} />
          <Route path="auth" element={<Auth />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
