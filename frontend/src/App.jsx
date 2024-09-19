import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Welcome from "./components/Welcome/Welcome";
import Books from "./components/Books/Books";
import Navbar from './components/Navbar/Navbar';
import Publishers from "./components/Publishers/Publishers";
import Categories from "./components/Categories/Categories";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/books" element={<Books />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/categories" element={<Categories />} />
        {/* yanlış rotalarda anasayfaya yonlendirme */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
