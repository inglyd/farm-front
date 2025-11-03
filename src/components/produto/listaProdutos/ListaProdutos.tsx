import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../assets/services/service";
import CardProduto from "../cardProduto/CardProduto";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../assets/utils/ToastAlerta";

function ListaProduto() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function buscarProdutos() {
    try {
      await buscar("/produtos", setProdutos);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar produtos.", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className="container mx-auto my-8 flex flex-col items-center">
      <div className="flex justify-between items-center w-3/4 mb-6">
        <h1 className="text-4xl font-bold text-center text-indigo-600">
          Lista de Produtos
        </h1>
        <Link
          to="/cadastrarProduto"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
        >
          + Novo Produto
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#4f46e5" size={40} />
        </div>
      ) : produtos.length === 0 ? (
        <p className="text-xl text-gray-600">
          Nenhum produto cadastrado ainda.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4">
          {produtos.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaProduto;
