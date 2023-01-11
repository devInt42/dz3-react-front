import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Homepage";
import Employee from "../src/pages/Employee";
import Home2 from "../src/pages/CommonHomepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dz3/">
          <Route path="" element={<Home />} />
          <Route path="common" element={<Home2 />} />
          <Route path="employee" element={<Employee />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
