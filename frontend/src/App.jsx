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
import CategoryDetail from './components/Categories/CategoryDetail.jsx';
import CategoryEdit from './components/Categories/CategoryEdit.jsx';
import Authors from "./components/Authors/Authors";
import AuthorDetail from './components/Authors/AuthorDetail.jsx';
import AuthorEdit from './components/Authors/AuthorEdit.jsx';
import Borrows from "./components/Borrows/Borrows";
import BorrowDetail from './components/Borrows/BorrowDetail.jsx';
import BorrowEdit from './components/Borrows/BorrowEdit.jsx';


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* book routes */}
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/edit/:id" element={<BookEdit />} />
          {/* borrow routes */}
          <Route path="/borrows" element={<Borrows />} />
          <Route path="/borrows/:id" element={<BorrowDetail />} />
          <Route path="/borrows/edit/:id" element={<BorrowEdit />} />
          {/* publishers routes */}
          <Route path="/publishers" element={<Publishers />} />
          <Route path="/publishers/:id" element={<PublisherDetail />} />
          <Route path="/publishers/edit/:id" element={<PublisherEdit />} />
          {/* categories routes */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/categories/edit/:id" element={<CategoryEdit />} />
          {/* authors routes */}
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:id" element={<AuthorDetail />} />
          <Route path="/authors/edit/:id" element={<AuthorEdit />} />
          {/* yanlış rotalarda anasayfaya yonlendirme */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;