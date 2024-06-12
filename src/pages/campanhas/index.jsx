import Navbar from "../../globalComponents/navbar";
import BtnWhatsapp from "../../globalComponents/btnWhatsapp";
import { useState, useEffect } from "react";
import api from "./../../services/api";
import { Link } from "react-router-dom";
import Loading from "../../globalComponents/loading";
import Footer from "./../../globalComponents/Footer";

export default function Campanhas() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getproducts/all");
        setProducts(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-zinc-100">
      <Navbar />
      <>
        <div className="flex gap-2 items-center justify-center">
          <div className="120px] lg:min-w-[1000px] flex gap-2 items-center justify-center">
            <p className="text-3xl font-semibold py-5">Campanhas</p>
          </div>
        </div>
        <div className="flex justify-center">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[1120px] lg:min-w-[1000px] p-4">
              {products.map((item) => (
                <Link
                  key={item._id}
                  to={item.status ? `/item/${item._id}` : `/finalizada/${item._id}`}
                  className="relative hover:bg-zinc-200 transition-all flex flex-col sm:gap-1 bg-white border-zinc-200 max-h-[300px] rounded-md overflow-hidden"
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
