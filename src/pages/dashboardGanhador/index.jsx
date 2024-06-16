import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../../services/api";

function index() {
  // const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const response = await api.get(`/findproducts/${id}`);
  //       setProduct(response.data);
        
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   getProduct();
  // }, [id]);

  return (
    <div className="bg-[#0A0125] h-screen text-white flex justify-center items-center">
      <div className="w-full max-w-md p-4 rounded-md bg-gray-900">
        <h2 className="text-xl font-bold mb-4 text-center">
          Verificar Dados dos Clientes
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 border-none">
              Número da Rifa:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded text-black border-none"
              placeholder="Digite o número da rifa"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all mr-2"
            >
              Verificar
            </button>
            <Link
              to="/admin"
              className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition-all"
            >
              Voltar
            </Link>
          </div>
        </form>
        {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Dados do Ganhador:</h3>
          <p>
            <span className="font-bold">Nome:</span> Victor Gustavo
          </p>
          <p>
            <span className="font-bold">Número:</span> 81 996512724
          </p>
          <p>
            <span className="font-bold">Email:</span> yVictory01@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default index;
