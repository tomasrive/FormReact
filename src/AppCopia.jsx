import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FormEdit } from './pages/FormEdit.jsx';
import { Home } from './pages/Home.jsx';
import FormCreateMatriceria from './pages/FormCreateMatriceria';
import FormCreateInyectoras from './pages/FormCreateManInyectoras';
import FormCreateEdilicio from './pages/FormCreateManEdilicio';
import FormCreateArmado from './pages/FormCreateManArmado';

export default function AppCopia() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/FormCreateMatriceria"
          element={<FormCreateMatriceria />}
        />
        <Route
          path="/FormCreateInyectoras"
          element={<FormCreateInyectoras />}
        />
        <Route path="/FormCreateArmado" element={<FormCreateArmado />} />
        <Route path="/FormCreateEdilicio" element={<FormCreateEdilicio />} />

        <Route path="/FormEdit" element={<FormEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
