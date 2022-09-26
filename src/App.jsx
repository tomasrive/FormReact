import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home.jsx';

import {
  FormCreateMatriceria,
  FormCreateArmado,
  FormCreateInyectoras,
  FormCreateEdilicio,
} from './pages';

import {
  CompTableArmado,
  CompTableEdilicio,
  CompTableInyectoras,
  CompTableMatriceria,
} from './pages';

import { FormReparar, FormVerificado, FormVisualizar } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/FormCreateMatriceria'
          element={<FormCreateMatriceria />}
        />
        <Route
          path='/FormCreateInyectoras'
          element={<FormCreateInyectoras />}
        />
        <Route path='/FormCreateArmado' element={<FormCreateArmado />} />
        <Route path='/FormCreateEdilicio' element={<FormCreateEdilicio />} />

        <Route path='/CompTableMatriceria' element={<CompTableMatriceria />} />
        <Route path='/CompTableInyectoras' element={<CompTableInyectoras />} />
        <Route path='/CompTableEdilicio' element={<CompTableEdilicio />} />
        <Route path='/CompTableArmado' element={<CompTableArmado />} />

        <Route path='/FormVisualizar/:tabla/:id' element={<FormVisualizar />} />

        <Route path='/FormReparar/:tabla/:id' element={<FormReparar />} />

        <Route path='/FormVerificado/:tabla/:id' element={<FormVerificado />} />
      </Routes>
    </BrowserRouter>
  );
}
