import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dz3/">
          <Route path="" element={<Login />} />
          <Route path="main" element={<Layout />} />

          {/* <Route path="auth" element={<Auth />} />
          <Route path="common" element={<Home2 />} />
          <Route path="main2" element={<Home />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;