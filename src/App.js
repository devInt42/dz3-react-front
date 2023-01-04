import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Proxytest from "./components/Proxytest";
import Home from "./pages/HomePage";
import Employee from "./pages/Employee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dz3/">
          <Route path="" element={<Home />} />
          <Route path="test" element={<Proxytest />} />
          <Route path="employee" element={<Employee/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
