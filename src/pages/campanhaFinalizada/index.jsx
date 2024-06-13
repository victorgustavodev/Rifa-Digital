import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../globalComponents/navbar";
import { Flag, Ticket } from "lucide-react";
import { BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import BtnWhatsapp from "./../../globalComponents/btnWhatsapp";
import Loading from "../../globalComponents/loading";
import Footer from "../../globalComponents/Footer";
import ConfettiPage from "../../globalComponents/confetti";

function Item() {
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/findproducts/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProduct();
  }, [id]);
  return (
    <div>
      <ConfettiPage />

      <Navbar />
      {product?._id ? (
        <div className="py-6 px-2 bg-zinc-100 justify-center flex">
          <div className="w-[420px] lg:w-[700px]">
            <div className="flex flex-col gap-8 justify-center">
              <div className="flex flex-col gap-2 bg-white rounded-md">
                <div className="flex gap-5">
                  <img className="rounded-md lg:w-full object-cover max-h-96" src={product.image} />
                </div>
                <div className="flex flex-col gap-3 h-1/2 font-semibold border-zinc-400 p-3">
                  <p className="font-bold lg:text-3xl overflow-hidden border-b-[1px] border-zinc-300 p-2 lg:p-4">
                    {product.name}
                  </p>
                  <span className="flex gap-3 text-gray-500 items-center px-2 lg:px-4">
                    Por apenas
                    <span className="text-black w-[73px] h-[26px] flex items-center">
                      {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-center font-bold">Compartilhar</span>
                <div className="flex gap-2 items-center">
                  <a href="" className="hover:scale-90">
                    <BsWhatsapp color="green" size={24} />
                  </a>
                  <a href="" className="hover:scale-90">
                    <FaFacebookSquare color="#3B579D" size={24} />
                  </a>
                  <a href="" className="hover:scale-90">
                    <PiTelegramLogo size={24} />
                  </a>
                  <a href="" className="hover:scale-90">
                    <BsTwitterX size={24} />
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-5 bg-white p-6 md:p-10 rounded-md justify-around items-center text-center">
                <div className="flex flex-col gap-5 ">
                  <div className="flex gap-1 justify-center">
                    <Flag />
                    <p className="font-semibold">Campanha Finalizada</p>
                  </div>
                  <div className="flex gap-1 justify-center">
                    <Ticket />
                    <p className="font-semibold">Bilhetes</p>
                  </div>

                  <p className="text-zinc-400">Esta campanha foi sorteada!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <BtnWhatsapp />
      <Footer />
    </div>
  );
}

export default Item;
