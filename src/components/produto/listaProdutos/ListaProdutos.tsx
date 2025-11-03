import { useEffect, useState } from "react";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../assets/services/service";
import CardProduto from "../cardProduto/CardProduto";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from "../../../assets/utils/ToastAlerta";

function ListaProdutos() {
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
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && produtos.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum produto foi encontrado!
            </span>
          )}

          <div
            className="grid grid-cols-1 md:grid-cols-2 
                            lg:grid-cols-3 gap-8"
          >
            {produtos.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProdutos;
