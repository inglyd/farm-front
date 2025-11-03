import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FormProduto from "../formProduto/FormProduto";

function ModalProduto() {
  return (
    <>
      <Popup
        trigger={
          <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800 cursor-pointer">
            Novo produto
          </button>
        }
        modal
        contentStyle={{ borderRadius: "1rem", paddingBottom: "2rem" }}
      >
        <FormProduto />
      </Popup>
    </>
  );
}

export default ModalProduto;
