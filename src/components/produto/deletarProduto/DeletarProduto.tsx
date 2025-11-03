import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../assets/services/service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../assets/utils/ToastAlerta";

function DeletarProduto() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Produto>({} as Produto);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar produto.", "erro");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarProduto() {
    setIsLoading(true);

    try {
      await deletar(`/produtos/${id}`);
      ToastAlerta("Produto apagado com sucesso!", "sucesso");
    } catch (error: any) {
      ToastAlerta("Erro ao apagar o produto.", "erro");
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/produtos");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Produto</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o produto a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          {produto.nome}
        </header>

        <div className="p-8 bg-slate-200 text-lg">
          <p>
            <strong>Preço:</strong> R$ {produto.preco?.toFixed(2)}
          </p>
          <p>
            <strong>Categoria:</strong> {produto.categoria?.descricao}
          </p>
        </div>

        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center"
            onClick={deletarProduto}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarProduto;
