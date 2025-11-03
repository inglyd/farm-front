import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Produto from "../../../models/Produto";
import type Categoria from "../../../models/Categoria";
import { buscar, cadastrar, atualizar } from "../../../assets/services/service";
import { ToastAlerta } from "../../../assets/utils/ToastAlerta";

function FormProduto() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    descricao: "",
    nome: "",
  });

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    descricao: "",
    preco: 0,
    foto: "",
    categoria: null,
  });

  const { id } = useParams<{ id: string }>();

  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, (data: Produto) => {
        setProduto({
          ...data,
          categoria: data.categoria ?? null,
        });
        if (data.categoria) setCategoria(data.categoria);
      });
    } catch (error: any) {
      console.error("Erro ao buscar produto por ID:", error);
      ToastAlerta("Erro ao carregar produto.", "erro");
    }
  }

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
    } catch (error: any) {
      console.error("Erro ao buscar categorias:", error);
      ToastAlerta("Erro ao carregar categorias.", "erro");
    }
  }

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: name === "preco" ? Number(value) : value,
    }));
  }

  function handleChangeCategoria(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    const idSelecionado = Number(value);
    const cat = categorias.find((c) => c.id === idSelecionado);
    if (cat) {
      setCategoria(cat);
      setProduto((prev) => ({ ...prev, categoria: cat }));
    } else {
      setCategoria({ id: 0, descricao: "", nome: "" });
      setProduto((prev) => ({ ...prev, categoria: null }));
    }
  }

  function retornar() {
    navigate("/produtos");
  }

  async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!produto.categoria || produto.categoria.id === 0) {
        ToastAlerta("Selecione uma categoria.", "info");
        return;
      }

      if (id !== undefined) {
        // Atualização: usar endpoint com ID
        await atualizar(`/produtos/${id}`, produto, () => {});
        ToastAlerta("Produto atualizado com sucesso", "sucesso");
      } else {
        await cadastrar(`/produtos`, produto, (data: Produto) =>
          setProduto(data)
        );
        ToastAlerta("Produto cadastrado com sucesso", "sucesso");
      }

      retornar();
    } catch (error: any) {
      if (id !== undefined) {
        ToastAlerta("Erro ao atualizar o produto.", "erro");
      } else {
        ToastAlerta("Erro ao cadastrar o produto.", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const carregandoCategoria = categoria.descricao === "";

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Produto" : "Cadastrar Novo Produto"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome do produto</label>
          <input
            id="nome"
            type="text"
            placeholder="Ex: Paracetamol"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={produto.nome}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do produto</label>
          <input
            id="descricao"
            type="text"
            placeholder="Detalhes, dosagem ou indicações"
            name="descricao"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={produto.descricao}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="preco">Preço do produto</label>
          <input
            id="preco"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex: 19.90"
            name="preco"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={Number.isFinite(produto.preco) ? produto.preco : 0}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="categoria">Categoria do produto</label>
          <select
            name="categoria"
            id="categoria"
            className="border p-2 border-slate-800 rounded"
            onChange={handleChangeCategoria}
            value={categoria.id || 0}
          >
            <option value={0} disabled>
              Selecione uma Categoria
            </option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
          text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
          disabled={carregandoCategoria || isLoading}
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={20} />
          ) : (
            <span>
              {id === undefined ? "Cadastrar Produto" : "Atualizar Produto"}
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormProduto;
