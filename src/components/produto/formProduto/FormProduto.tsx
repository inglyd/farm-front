import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Produto from "../../../models/Produto";
import type Categoria from "../../../models/Categoria";
import { buscar, cadastrar, atualizar } from "../../../assets/services/service";
import { ToastAlerta } from "../../../assets/utils/ToastAlerta";

function FormProduto() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Produto>({} as Produto);

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
    } catch (error: any) {
      ToastAlerta("Erro ao carregar categorias.", "erro");
    }
  }

  async function buscarPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto);
    } catch (error: any) {
      ToastAlerta("Erro ao carregar produto.", "erro");
    }
  }

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "categoria") {
      // Busca o objeto categoria pelo id selecionado
      const categoriaSelecionada = categorias.find(
        (cat) => cat.id === Number(value)
      );
      setProduto({
        ...produto,
        categoria: categoriaSelecionada || ({} as Categoria),
      });
    } else if (name === "preco") {
      setProduto({
        ...produto,
        preco: Number(value),
      });
    } else {
      setProduto({
        ...produto,
        [name]: value,
      });
    }
  }

  async function salvarProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (produto.nome.trim() === "") {
      ToastAlerta("Preencha o nome do produto.", "erro");
      setIsLoading(false);
      return;
    }

    if (!produto.categoria?.id) {
      ToastAlerta("Selecione uma categoria.", "erro");
      setIsLoading(false);
      return;
    }

    if (produto.preco <= 0) {
      ToastAlerta("Informe um preço válido.", "erro");
      setIsLoading(false);
      return;
    }

    try {
      if (id !== undefined) {
        await atualizar(`/produtos`, produto, setProduto);
        ToastAlerta("Produto atualizado com sucesso!", "sucesso");
      } else {
        await cadastrar(`/produtos`, produto, setProduto);
        ToastAlerta("Produto cadastrado com sucesso!", "sucesso");
      }
      navigate("/produtos");
    } catch (error: any) {
      ToastAlerta("Erro ao salvar o produto.", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Produto" : "Editar Produto"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={salvarProduto}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome do Produto</label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            name="nome"
            className="border-2 border-slate-700 rounded p-2"
            value={produto.nome}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="preco">Preço</label>
          <input
            type="number"
            placeholder="Digite o preço"
            name="preco"
            className="border-2 border-slate-700 rounded p-2"
            value={produto.preco}
            onChange={atualizarEstado}
            step="0.01"
            min="0"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="categoria">Categoria</label>
          <select
            name="categoria"
            className="border-2 border-slate-700 rounded p-2"
            value={produto.categoria?.id || ""}
            onChange={atualizarEstado}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormProduto;
