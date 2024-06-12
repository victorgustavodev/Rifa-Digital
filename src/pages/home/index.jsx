import Navbar from "../../globalComponents/navbar";
import BtnWhatsapp from "../../globalComponents/btnWhatsapp";
import { useState, useEffect } from "react";
import api from "./../../services/api";
import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "lucide-react";
import { TbClover } from "react-icons/tb";
import Loading from "../../globalComponents/loading";
import Footer from "./../../globalComponents/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getproducts/3");
        setProducts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-zinc-100">
      <Navbar />

      <div>
        {products.length > 0 ? (
          products.slice(0, 1).map((item) => (
            <section
              key={item._id}
              className="w-screen flex flex-col items-center justify-center py-5"
            >
              <div className="max-w-[1000px] flex flex-col justify-center">
                <div className="flex flex-col lg:flex-row gap-5">
                  <div>
                    <img
                      className="w-[345px] h-[250px] sm:w-[424px] rounded-md lg:w-[660px] lg:h-[385px]"
                      src={item.image}
                      alt="Product"
                    />
                  </div>
                  <div className="flex flex-col gap-5 items-center">
                    <div className="flex flex-col gap-3 p-5 shadow-md rounded-md bg-white w-full">
                      <p className="font-bold lg:text-3xl overflow-hidden border-b-[1px] border-zinc-300 p-2 lg:p-4">
                        {item.name}
                      </p>
                      <span className="flex gap-3 text-gray-500 items-center p-2 lg:p-4">
                        Por apenas
                        <span className="bg-black bg-opacity-10 text-black w-[73px] h-[26px] flex justify-center items-center rounded-md text-sm">
                          {item.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </span>
                      <Link key={item._id} to={`/item/${item._id}`}>
                        <button className="bg-green-500 flex gap-3 justify-center items-center w-full text-white rounded-md p-3 text-md transition-all hover:bg-green-600">
                          <ShoppingBagIcon className="h-5 w-5" /> Participar da
                          Campanha
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
        ) : (
          <section className="w-screen flex flex-col items-center justify-center py-5">
            <div className="max-w-[1000px] flex flex-col justify-center">
              <div className="flex flex-col lg:flex-row gap-5">
                <img className="w-[345px] h-[250px] sm:w-[424px] lg:w-[660px] lg:h-[385px] bg-zinc-300 rounded-md" />
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3 h-1/2 lg:min-w-[408px] lg:min-h-64 border-[1px] border-zinc-400 rounded-md">
                    <div className="flex justify-center pt-10">
                      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                    </div>
                    <span className="flex gap-3 text-gray-500 items-center p-2 lg:p-4">
                      <span className="bg-black bg-opacity-10 text-black w-[73px] h-[26px] flex justify-center items-center rounded-md text-sm"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <>
        <div className="flex gap-2 items-center justify-center">
          <div className="120px] lg:min-w-[1000px] flex gap-1 items-center">
            <TbClover size={24} />
            <p className="font-medium text-xl py-5">Últimos Sorteios</p>
          </div>
        </div>
        <div className="flex justify-center">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1120px] lg:min-w-[1000px] p-4">
              {products.map((item) => (
                <Link
                  key={item._id}
                  to={item.status ? `/item/${item._id}` : `/finalizada/${item._id}`}
                  className="relative hover:bg-zinc-200 transition-all flex flex-col sm:gap-1 bg-white border-zinc-200 max-w-[300px] rounded-md overflow-hidden"
                >
                  <div
                    className={`absolute top-2 left-2 py-2 px-4 rounded-md font-semibold text-white text-sm ${
                      item.status ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {item.status ? "Ativo" : "Finalizado"}
                  </div>

                  <img
                    className="w-full h-48 object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="flex flex-col gap-1 p-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold sm:text-lg">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <h3 className="text-sm font-semibold sm:text-lg">
                        {item.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </>

      <BtnWhatsapp />
      <Footer />
    </div>
  );
}
