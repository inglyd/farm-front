import ListaProduto from "../../../components/produto/listaProdutos/ListaProdutos";
import ModalProduto from "../../../components/produto/modalProduto/ModalProduto";

function Home() {
  return (
    <>
      <div className="bg-white-900 flex justify-center">
        <div className="container grid grid-cols-2 text-black">
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-5xl font-bold">Olá!</h2>
            <p className="text-xl">
              Organize aqui seus produtinhos farmacêuticos!
            </p>

            <div className="flex justify-around gap-4">
              <ModalProduto />
            </div>
          </div>
          <div className="flex justify-center ">
            <img
              src="https://i.imgur.com/f1RhV1y.jpeg"
              alt="Imagem de boas-vindas"
              className="w-800 h-80 "
            />
          </div>
        </div>
      </div>
      <ListaProduto />
    </>
  );
}

export default Home;
