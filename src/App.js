import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Proxytest from "./components/Proxytest";
import Home from "./pages/HomePage";
import Auth from "./pages/Auth";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dz3/">
          <Route path="" element={<Home />} />
          <Route path="test" element={<Proxytest />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
