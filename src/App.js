import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Auth from "./pages/Auth";
import Login from "./pages/Login.js";
import Main from "./pages/Main.js";
import Home2 from "../src/pages/CommonHomepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dz3/">
          <Route path="" element={<Login />} />
          <Route path="auth" element={<Auth />} />
          <Route path="main" element={<Main />} />
          <Route path="common" element={<Home2 />} />
          <Route path="main2" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
