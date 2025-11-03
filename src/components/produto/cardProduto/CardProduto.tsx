import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
  return (
    <div className="border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col">
      <header className="bg-indigo-600 text-white text-2xl font-bold p-4">
        {produto.nome}
      </header>

      <div className="p-4 flex-1 bg-slate-100">
        <p className="text-lg mb-2">
          <strong>Preço:</strong> R$ {produto.preco?.toFixed(2)}
        </p>
        <p className="text-lg mb-2">
          <strong>Categoria:</strong> {produto.categoria?.descricao}
        </p>
        <p className="text-sm text-gray-600">
          <strong>ID:</strong> {produto.id}
        </p>
      </div>

      <div className="flex">
        <Link
          to={`/editarProduto/${produto.id}`}
          className="text-slate-100 bg-indigo-400 hover:bg-indigo-600 w-full text-center py-2 font-semibold transition-colors duration-200"
        >
          Editar
        </Link>
        <Link
          to={`/deletarProduto/${produto.id}`}
          className="text-slate-100 bg-red-400 hover:bg-red-600 w-full text-center py-2 font-semibold transition-colors duration-200"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardProduto;
