import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Wheel from "./pages/Wheel";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/wheel/:id" element={<Wheel />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;
