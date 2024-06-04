import { useState, useEffect, useRef } from "react";
import { Check, Clock, Copy } from "lucide-react";
import { BsQrCodeScan } from "react-icons/bs";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LuAlarmClock } from "react-icons/lu";
import api from "../../services/api";

export default function Shopping() {
  const inputRef = useRef(null);
  const { encodedParams } = useParams({});
  const decodedParams = atob(encodedParams);
  const [id, amountRifas, price, phone, name, email] = decodedParams.split("/");
  const [showCheck, setShowCheck] = useState(false);

  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [data, setData] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  const handleCopy = () => {
    inputRef.current.select();
    const copyText = inputRef.current.value;
    navigator.clipboard.writeText(copyText).then(() => {
      setShowCheck(true);
      setTimeout(() => {
        setShowCheck(false);
      }, 1000);
    });
  };

  useEffect(() => {
    const CheckingStatus = async () => {
      try {
        const paymentInfo = localStorage.getItem(`${id}`);
        const { data } = await api.get(`/payment/check/${id}`);
        setStatus(data.status.toString().toLowerCase());
        if (paymentInfo) {
          setData(JSON.parse(paymentInfo));
        }

        if (data.status === "approved") {
          localStorage.removeItem(`${id}`);
          setStatus("approved");
        }
        
      } catch (error) {
        setStatus("Payment not found");
        localStorage.removeItem(`${id}`);
      }
    };
    CheckingStatus();
  }, [status, id]);

  useEffect(() => {
    const expirationTime = new Date(data.dateExpiration);
    const now = new Date();
    const diffInSeconds = Math.floor((expirationTime - now) / 1000);
    setTimeLeft(diffInSeconds > 0 ? diffInSeconds : 0);

    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleFocus = (event) => {
    event.target.blur();
  };

  const handleCancel = () => {
    navigate("/");
    localStorage.removeItem(`${id}`);
  };

  return (
    <div>
      {status === "pending" && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-between p-4 items-center min-h-[77px] lg:max-w-[552px] w-full h-full">
            <Link to={"/"}>
              <span className="uppercase text-lg font-bold">
                Dujão du corte
              </span>
            </Link>
            <div className="flex items-center font-bold gap-1 text-sm w-16 h-6">
              <LuAlarmClock size={15} />
              {formatTime(timeLeft)}
            </div>
          </div>
          <div>
            <div className="bg-[#51a716] flex items-center justify-center flex-col p-8 gap-3">
              <div className="relative rounded-2xl flex items-center justify-center mx-auto p-2 bg-white w-14 h-14">
                <span
                  className="inline-block w-[5px] h-[5px] rounded-full mx-[2.5px] animate-bounce"
                  style={{ animationDelay: "0s", backgroundColor: "#51a716" }}
                ></span>
                <span
                  className="inline-block w-[5px] h-[5px] rounded-full mx-[2.5px] animate-bounce"
                  style={{
                    animationDelay: "0.25s",
                    backgroundColor: "#51a716",
                  }}
                ></span>
                <span
                  className="inline-block w-[5px] h-[5px] rounded-full mx-[2.5px] animate-bounce"
                  style={{ animationDelay: "0.5s", backgroundColor: "#51a716" }}
                ></span>
              </div>
              <h1 className="font-semibold text-white text-xl">Quase lá!</h1>
              <p className="text-center text-sm text-white font-medium">
                Efetue o pagamento do seu pedido para garantir a sua
                participação
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
                    ref={inputRef}
                    readOnly
                    onFocus={handleFocus}
                    className="appearance-none w-full outline-none no-caret"
                    type="text"
                    value={data?.copyAndPate || ""}
                  />
                  <button
                    className="flex items-center gap-2 bg-[#51a716] p-2 w-5/12 lg:w-3/12 justify-center rounded-md text-white"
                    onClick={handleCopy}
                  >
                    {showCheck ? <Check size={15} /> : <Copy size={15} />}
                    <span className="text-xs">
                      {showCheck ? "Copiado" : "Copiar"}
                    </span>
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
                      Escolha pagar via Pix, escanear QR code e escaneie o
                      código abaixo.
                    </span>
                  </li>
                </ol>
                <div className="flex flex-col gap-5 justify-center items-center my-8">
                  {data.qrCode && (
                    <img
                      src={`data:image/png;base64,${data.qrCode}`}
                      alt="QR Code"
                      className="max-w-[250px] max-h-[250px]"
                    />
                  )}
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
                  <h1 className="font-bold">Sub Total:</h1>
                  <p>
                    {Number(price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
                <div className="flex gap-2 border-b-[1px] border-dashed border-zinc-300 p-2 text-sm">
                  <h1 className="font-bold">Total Rifas:</h1>
                  <p>{amountRifas}</p>
                </div>
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
                  <h1 className="font-bold">Data de compra:</h1>
                  <p>{new Date().toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white p-2 rounded-md w-[320px] mt-2"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === "approved" && (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-[36px] font-bold text-green-500">
              Pagamento Aprovado!
            </h1>
            <p className="text-lg mt-4">Obrigado por sua compra.</p>
            <Link to="/">
              <button className="bg-[#51a716] text-white p-2 rounded-md mt-4">
                Voltar para a página inicial
              </button>
            </Link>
          </div>
        </div>
      )}

      {status !== "pending" && status !== "approved" && (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-[36px] font-bold text-red-500">Erro</h1>
            <p className="text-lg mt-4">Ocorreu um erro com o pagamento.</p>
            <Link to="/">
              <button className="bg-[#51a716] text-white p-2 rounded-md mt-4">
                Voltar para a página inicial
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
