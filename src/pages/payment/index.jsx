import { useState, useEffect } from "react";
import { Clock, Copy } from "lucide-react";
import { BsQrCodeScan } from "react-icons/bs";
import Code from "../../assets/qrcode.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LuAlarmClock } from "react-icons/lu";
import "../../App.css";

export default function Shopping() {
  const { phone, name, email } = useParams();
  const navigate = useNavigate();
  const [time, setTime] = useState(3600); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleFocus = (event) => {
    event.target.blur();
  };

  const handleCancel = () => {
    // You can add any other cleanup logic here if needed
    navigate("/"); // Redirect to the homepage or any other page
  };

  return (
    <div>
      <div className="flex justify-between p-4 items-center min-h-[77px] max-w-[1120px] w-full h-full">
        <Link to={"/"}>
          <span className="uppercase text-lg font-bold">dujão du corte</span>
        </Link>
        <div className="flex items-center font-bold gap-1 text-sm w-16 h-6">
          <LuAlarmClock size={15} />
          {formatTime(time)}
        </div>
      </div>
      <div className="h-screen">
        <div className="bg-[#51a716] flex items-center justify-center flex-col p-8 gap-3">
          <div className="relative rounded-2xl flex items-center justify-center mx-auto p-2 bg-white w-14 h-14">
            <span
              className="inline-block w-[5px] h-[5px] rounded-full mx-[2.5px] animate-bounce"
              style={{ animationDelay: "0s", backgroundColor: "#51a716" }}
            ></span>
            <span
              className="inline-block w-[5px] h-[5px] rounded-full mx-[2.5px] animate-bounce"
              style={{ animationDelay: "0.25s", backgroundColor: "#51a716" }}
            ></span>
            <span
              className="inline-block w-[5px] h-[5px] rounded-full mx-[2.5px] animate-bounce"
              style={{ animationDelay: "0.5s", backgroundColor: "#51a716" }}
            ></span>
          </div>
          <h1 className="font-semibold text-white text-xl">Quase lá!</h1>
          <p className="text-center text-sm text-white font-medium">
            Efetue o pagamento do seu pedido para garantir a sua participação
          </p>
        </div>

        <div className="flex flex-col gap-4 p-8 border-b-[1px] border-zinc-300 ">
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
                <div className="bg-zinc-300 rounded-md min-w-6 h-6 flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <span>
                  Escolha pagar via Pix, e clique em código copia e cola.
                </span>
              </li>
              <li className="flex gap-2 items-center mt-2">
                <div className="bg-zinc-300 rounded-md w-6 h-6 flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <span>Cole o código abaixo:</span>
              </li>
            </ol>
            <div className="flex justify-between items-center border-[1px] border-black p-2 rounded-md mt-5">
              <input
                readOnly
                onFocus={handleFocus}
                className="appearance-none outline-none no-caret"
                type="text"
                value="00020126440014br.gov.bcb.pix0122pitangamel25@gmail.com52040000530398654040.105802BR5925LOURENCOWESIVANIA202310136009Sao Paulo62240520mpqrinter794586687616304FA06"
              />

              <button className="flex items-center gap-2 bg-[#51a716] p-2 rounded-md text-white">
                <Copy size={15} /> <span className="text-xs">Copiar</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-8 border-b-[1px] border-zinc-300">
          <div className="flex gap-2 items-center">
            <BsQrCodeScan />
            <p className="font-bold">Ou escaneie o QR code</p>
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
                <div className="bg-zinc-300 rounded-md min-w-6 h-6 flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <span>
                  Escolha pagar via Pix, escanear QR code e escaneie o código
                  abaixo.
                </span>
              </li>
            </ol>
            <div className="flex flex-col gap-5 justify-center items-center my-8">
              <img src={Code} alt="QR Code" />
              <div className="flex gap-2 items-center">
                <Clock size={15} />
                <p className="text-sm">Pague e será creditado na hora!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-8 border-b-[1px] border-zinc-300">
          <div className="flex gap-3">
            <Copy />
            <p className="font-bold">Detalhes do pedido</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 border-b-[1px] border-dashed border-zinc-300 p-2 text-sm">
              <h1 className="font-bold">Comprador(a):</h1>
              <p>{name}</p>
            </div>
            <div className="flex gap-2 border-b-[1px] border-dashed border-zinc-300 p-2 text-sm">
              <h1 className="font-bold">Email:</h1>
              <p>{email}</p>
            </div>
            <div className="flex gap-2 border-b-[1px] border-dashed border-zinc-300 p-2 text-sm">
              <h1 className="font-bold">Telefone:</h1>
              <p>{phone}</p>
            </div>
            <div className="flex gap-2 border-b-[1px] border-dashed border-zinc-300 p-2 text-sm">
              <h1 className="font-bold">Status:</h1>
              <p>Aguardando pagamento</p>
            </div>
            <div className="flex gap-2 border-b-[1px] border-dashed border-zinc-300 p-2 text-sm">
              <h1 className="font-bold pr-3">Bilhetes:</h1>
              <p className="">Disponível somente após realizar o pagamento</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <button 
            className="bg-red-500 text-white p-2 rounded-md w-full"
            onClick={handleCancel}
          >
            Cancelar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
