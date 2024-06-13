import Navbar from "../../globalComponents/navbar";
import BtnWhatsapp from "../../globalComponents/btnWhatsapp";
import { useState, useEffect } from "react";
import api from "./../../services/api";
import { Link } from "react-router-dom";
import Loading from "../../globalComponents/loading";
import Footer from "./../../globalComponents/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState(""); // Estado para armazenar o texto do filtro

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getproducts/5");
        setProducts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value); // Atualiza o texto do filtro conforme o usuário digita
  };

  // Filtra os produtos com base no texto do filtro
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-zinc-100 min-h-screen">
      <Navbar />

      <div className="hidden lg:block ">
        {products.length > 0 ? (
          filteredProducts.slice(0, 1).map((item) => (
            <section
              key={item._id}
              className="w-screen flex flex-col items-center justify-center py-5"
            >
              <Link
                key={item._id}
                to={
                  item.status ? `/item/${item._id}` : `/finalizada/${item._id}`
                }
                className="relative hover:bg-zinc-200 transition-all flex flex-col sm:gap-1 bg-white border-zinc-200 lg:max-w-[1000px] lg:min-w-[1000px] rounded-md overflow-hidden"
              >
                <div
                  className={`absolute top-2 left-2 py-2 px-4 rounded-md font-semibold text-white text-sm ${
                    item.status ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {item.status ? "Ativo" : "Finalizado"}
                </div>

                <img
                  className="w-full max-h-[400px] object-cover"
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
        <div className="w-full justify-center flex my-5">
          <div className="flex justify-center w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Filtrar rifa"
                value={filterText}
                onChange={handleFilterChange}
                className="p-2 pl-10 pr-4 border border-gray-400 rounded focus:outline-none focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M10 21a8 8 0 100-16 8 8 0 000 16z"></path>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1000px] lg:min-w-[1000px] p-4">
              {filteredProducts.map((item) => (
                <Link
                  key={item._id}
                  to={
                    item.status
                      ? `/item/${item._id}`
                      : `/finalizada/${item._id}`
                  }
                  className="relative hover:bg-zinc-200 transition-all flex flex-col sm:gap-1 bg-white border-zinc-200 lg:max-w-[300px] lg:w-[300px]  w-full rounded-md overflow-hidden"
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
