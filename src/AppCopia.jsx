import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FormEdit } from "./pages/FormEdit.jsx";
import FormCreate from "./pages/Layout.jsx";

export default function AppCopia() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <FormCreate />
      <br />

      <Routes>
        <Route path="/" />
        <Route path="/formCreate" element={<FormCreate />} />
        <Route path="/formEdit" element={<FormEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
