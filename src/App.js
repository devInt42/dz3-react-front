import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Home2 from "./pages/Home2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dz3/">
          <Route path="main" element={<Home />} />
          <Route path="common" element={<Home2 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
