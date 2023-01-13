import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Auth from "./pages/Auth";
import Login from "./pages/Login.js";
import Main from "./pages/Main.js";
import Home from "../src/pages/Home";
import Home2 from "./pages/Home2";
import Layout from "./components/Layout";
import MenuSet from "./pages/MenuSet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dz3/">
          <Route path="" element={<Login />} />
          <Route path="main" element={<Layout />} />
          <Route path="auth" element={<Auth />} />
          {/* <Route path="main" element={<Home />} /> */}
          <Route path="common" element={<Home2 />} />
          {/* <Route path="main2" element={<Home />} /> */}
          <Route path="menuset" element={<MenuSet />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
