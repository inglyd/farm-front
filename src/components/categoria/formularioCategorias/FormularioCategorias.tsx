import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../assets/services/service";
import { ToastAlerta } from "../../../assets/utils/ToastAlerta";

function FormCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Estado inicial tipado
  const initialCategoria: Categoria = useMemo(
    () => ({
      id: 0,
      nome: "",
      descricao: "",
      produto: null,
    }),
    []
  );

  const [categoria, setCategoria] = useState<Categoria>(initialCategoria);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  async function buscarPorId(categoriaId: string) {
    try {
      setIsFetching(true);
      await buscar(`/categorias/${categoriaId}`, (data: Categoria) => {
        // Garante que campos inexistentes venham com default
        setCategoria({
          id: data?.id ?? 0,
          nome: data?.nome ?? "",
          descricao: data?.descricao ?? "",
          produto: data?.produto ?? null,
        });
      });
    } catch (error: any) {
      // Trate 401 se necessário (ex.: redirecionar para login)
      ToastAlerta("Erro ao carregar a categoria.", "erro");
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    if (id) buscarPorId(id);
    else setCategoria(initialCategoria);
  }, [id, initialCategoria]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validar(): string[] {
    const erros: string[] = [];
    if (!categoria.nome?.trim()) erros.push("Nome é obrigatório.");
    if (!categoria.descricao?.trim()) erros.push("Descrição é obrigatória.");
    return erros;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    const erros = validar();
    if (erros.length) {
      erros.forEach((msg) => ToastAlerta(msg, "info"));
      return;
    }

    setIsSubmitting(true);
    try {
      if (id) {
        await atualizar(`/categorias`, categoria, (data: Categoria) =>
          setCategoria(data)
        );
        ToastAlerta("A categoria foi atualizada com sucesso!", "sucesso");
      } else {
        await cadastrar(`/categorias`, categoria, (data: Categoria) =>
          setCategoria(data)
        );
        ToastAlerta("A categoria foi cadastrada com sucesso!", "sucesso");
      }
      navigate("/categorias");
    } catch (error: any) {
      if (id) {
        ToastAlerta("Erro ao atualizar a categoria.", "erro");
      } else {
        ToastAlerta("Erro ao cadastrar a categoria.", "erro");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id ? "Editar categoria" : "Cadastrar categoria"}
      </h1>

      <form className="w-full max-w-xl flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className="font-medium">
            Nome da categoria
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Digite o nome da categoria"
            name="nome"
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.nome}
            onChange={atualizarEstado}
            disabled={isFetching || isSubmitting}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descricao" className="font-medium">
            Descrição da categoria
          </label>
          <textarea
            id="descricao"
            placeholder="Descreva aqui sua categoria"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2 min-h-[96px]"
            value={categoria.descricao}
            onChange={atualizarEstado}
            disabled={isFetching || isSubmitting}
            required
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            className="cursor-pointer rounded text-slate-100 bg-slate-500 hover:bg-slate-700 w-1/2 py-2"
            type="button"
            onClick={() => navigate("/categorias")}
            disabled={isFetching || isSubmitting}
          >
            Cancelar
          </button>

          <button
            className="cursor-pointer rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 flex justify-center items-center"
            type="submit"
            disabled={isFetching || isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>{id ? "Atualizar" : "Cadastrar"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormCategoria;
