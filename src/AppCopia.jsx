import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FormEdit } from './pages/FormEdit.jsx';
import { Home } from './pages/Home.jsx';
import FormCreate from './pages/FormCreate.jsx';

export default function AppCopia() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FormCreate" element={<FormCreate />} />
        <Route path="/FormEdit" element={<FormEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
