import { BsPerson } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from './../../globalComponents/Footer';
import api from "../../services/api";

function Index() {
  const [phone, setPhone] = useState("");
  const { id, price } = useParams();
  const [product, setProduct] = useState(null);

  const handlePhoneChange = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, "");
    input = input.substring(0, 11);
    if (input.length > 2) {
      input = `(${input.substring(0, 2)}) ${input.substring(2)}`;
    }
    if (input.length > 9) {
      input = `${input.substring(0, 10)}-${input.substring(10)}`;
    }
    setPhone(input);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProduct();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center border-b-[1px] border-zinc-200 bg-white z-50">
        <div className="flex justify-between p-4 items-center min-h-[77px] max-w-[1120px] w-full h-full">
          <Link to={"/"}>
            <span className="uppercase text-lg font-bold">
              dujão du corte
            </span>
          </Link>
        </div>
      </div>

      <div className="flex-1">
        {product && (
          <div className="w-full flex flex-col md:flex-row">
            {/* left */}
            <div className="h-full lg:w-full bg-zinc-100 border-r-[1px] border-zinc-200 flex flex-col items-center gap-3 p-6 lg:p-20">
              <div className="bg-white p-10 rounded-xl border-[1px] border-zinc-200 flex flex-col gap-3 w-full">
                <span className="flex items-center gap-2 mb-5">
                  <BsPerson size={24} />
                  <h1 className="text-xl font-bold">Dados pessoais</h1>
                </span>

                <div className="flex flex-col gap-3">
                  <p>Nome Completo</p>
                  <input
                    type="text"
                    placeholder="Digite seu nome e sobrenome"
                    className="w-full bg-zinc-100 rounded-md p-2 mb-4"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <p>Telefone com DDD</p>
                  <input
                    type="tel"
                    placeholder="(81) 12345-6789"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full bg-zinc-100 rounded-md p-2 mb-4"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <p>Endereço de e-mail</p>
                  <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    className="w-full bg-zinc-100 rounded-md p-2 mb-4"
                  />
                </div>
              </div>
              <div className="pt-3 lg:pt-10 flex w-full justify-end">
                <button className="bg-[#1877F2] text-white w-full md:w-auto p-3 transition-all rounded-xl border border-zinc-300 hover:brightness-110">
                  Continuar
                </button>
              </div>
            </div>
            {/* right */}
            <div className="bg-white w-full flex flex-col gap-5 p-6 lg:p-20 lg:items-start">
              <div className="flex items-center rounded-xl w-full shadow-sm border-[1px] border-zinc-200">
                <img
                  src={product.image}
                  alt=""
                  className=""
                />
                <div className="p-3">
                  <p className="text-base leading-tight">
                    {product.name}
                  </p>
                  <p className="text-sm">
                    Quantidade: <span className="font-semibold">1</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-5 flex-col w-full">
                <div className="flex flex-col gap-3 items-center lg:items-end">
                  <p>Selecione a forma de pagamento :</p>
                  <img
                    src="https://logopng.com.br/logos/pix-106.svg"
                    alt=""
                    className="w-20 bg-white p-2 rounded-md border border-zinc-400 cursor-pointer"
                  />
                </div>

                <div className="flex justify-between w-full">
                  <span>Subtotal</span>
                  <span>R$ {product.price}</span>
                </div>
                <div className="flex justify-between w-full font-bold">
                  <span>Total</span>
                  <span>R$ {product.price}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

export default Index;
