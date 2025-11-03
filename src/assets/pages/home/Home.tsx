import ListaProduto from "../../../components/produto/listaProdutos/ListaProdutos";
import ModalProduto from "../../../components/produto/modalProduto/ModalProduto";

function Home() {
  return (
    <>
      <div className="bg-indigo-900 flex justify-center">
        <div className="container grid grid-cols-2 text-white">
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-5xl font-bold">Seja Bem Vinde!</h2>
            <p className="text-xl">Compre aqui seus produtinhos!</p>

            <div className="flex justify-around gap-4">
              <ModalProduto />
            </div>
          </div>
          <div className="flex justify-center ">
            <img
              src="https://i.imgur.com/fyfri1v.png"
              alt="Imagem Página Home"
              className="w-2/3"
            />
          </div>
        </div>
      </div>
      <ListaProduto />
    </>
  );
}

export default Home;