import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-indigo-400 text-white">
        <div className="container flex justify-between text-lg mx-8">
          <Link to="/home" className="font-bold text-2xl">
            Farmacinha
          </Link>
          <div className="flex gap-4">
            <Link to="/produtos" className="hover:underline">
              Produtos
            </Link>
            <Link to="/categorias" className="hover:underline">
              Categorias
            </Link>
            <Link to="/cadastrarcategoria" className="hover:underline">
              Cadastrar categoria
            </Link>
            <Link to="/cadastrarproduto" className="hover:underline">
              Cadastrar produto
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
