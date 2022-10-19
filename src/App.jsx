import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './Components/Home.jsx';

import { FormCreateMatriceria, FormCreateInyectoras } from './Components/pages';

import { CompTableInyectoras, CompTableMatriceria } from './Components/pages';

import {
  FormReparar,
  FormVerificado,
  FormVisualizar,
} from './Components/pages/edit';
import { OrdenDetallada, UnknownPage } from './Components';

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

        <Route path='/CompTableMatriceria' element={<CompTableMatriceria />} />
        <Route path='/CompTableInyectoras' element={<CompTableInyectoras />} />

        <Route path='/FormVisualizar/:tabla/:id' element={<FormVisualizar />} />

        <Route path='/FormReparar/:tabla/:id' element={<FormReparar />} />

        <Route path='/FormVerificado/:tabla/:id' element={<FormVerificado />} />

        <Route path='/OrdenDetallada/:tabla/:id' element={<OrdenDetallada />} />

        <Route path='*' element={<UnknownPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
