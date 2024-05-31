import { IoHourglassOutline } from "react-icons/io5";
import Navbar from "./../../globalComponents/navbar";
import { Copy } from "lucide-react";

function index() {
  return (
    <div>
      <Navbar />
      <div className="h-screen">
        <div className="bg-zinc-400 flex items-center justify-center flex-col p-8 gap-3">
          <IoHourglassOutline
            size={50}
            color="white"
            className="bg-black rounded-md p-2"
          />
          <h1 className="font-semibold text-white text-xl">Quase lá!</h1>
          <p className="text-center text-sm text-white font-medium">
            Efetue o pagamento do seu pedido para garantir a sua participação
          </p>
        </div>

        <div className="flex flex-col gap-4 p-8 border-b-[1px] border-zinc-300">
          <div className="flex gap-3">
            <Copy />
            <p className="font-bold">Copie o código para pagar</p>
          </div>
          <div>
            <ol className="text-[14px]">
              <li className="flex gap-2 items-center">
                <div className="bg-zinc-300 rounded-md w-6 h-6 flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
                <span>Abra o aplicativo do seu banco.</span>
              </li>
              <li className="flex gap-2 items-center mt-2">
                <div className="bg-zinc-300 rounded-md w-6 h-6 flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <span>Escolha pagar via Pix, e clique em código copia e cola.</span>
              </li>
              <li className="flex gap-2 items-center mt-2">
                <div className="bg-zinc-300 rounded-md w-6 h-6 flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <span>Cole o código abaixo:</span>
              </li>
            </ol>
            <div className="flex justify-between items-center border-[1px] border-black p-2 rounded-md mt-5">
              <p>00020126440014br.gov.bcb</p>
              <button className="flex items-center gap-2 bg-black p-2 rounded-md text-white">
                <Copy size={15} /> <span className="text-xs">Copiar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
