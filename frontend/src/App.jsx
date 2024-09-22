import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Welcome from "./components/Welcome/Welcome";
import Books from "./components/Books/Books";
import Navbar from './components/Navbar/Navbar';
import Publishers from "./components/Publishers/Publishers";
import Categories from "./components/Categories/Categories";
import BookDetail from "./components/Books/BookDetail.jsx";
import BookEdit from './components/Books/BookEdit.jsx';
import PublisherDetail from './components/Publishers/PublisherDetail.jsx';
import PublisherEdit from './components/Publishers/PublisherEdit.jsx';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/edit/:id" element={<BookEdit />} />
          <Route path="/publishers" element={<Publishers />} />
          <Route path="/publishers/:id" element={<PublisherDetail />} />
          <Route path="/publishers/edit/:id" element={<PublisherEdit />} />
          <Route path="/categories" element={<Categories />} />
          {/* yanlış rotalarda anasayfaya yonlendirme */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
