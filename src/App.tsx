import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./assets/pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListaCategorias from "./components/categoria/listaCategorias/ListaCategorias";
import DeletarCategoria from "./components/categoria/deletarCategoria/deletarCategoria";
import FormCategoria from "./components/categoria/formularioCategorias/FormularioCategorias";
import DeletarProduto from "./components/produto/deletarProduto/DeletarProduto";
import FormProduto from "./components/produto/formProduto/FormProduto";
import ListaProdutos from "./components/produto/listaProdutos/ListaProdutos";
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route
              path="/deletarcategoria/:id"
              element={<DeletarCategoria />}
            />
            <Route path="/postagens" element={<ListaProdutos />} />
            <Route path="/cadastrarpostagem" element={<FormProduto />} />
            <Route path="/editarpostagem/:id" element={<FormProduto />} />
            <Route path="/deletarpostagem/:id" element={<DeletarProduto />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
