import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import Loading from "../../globalComponents/loading";

function Index() {
  const [number, setNumber] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const onChangeInput = async (e) => {
    let number = e.target.value;
    setNumber(number);
  };

  const handleSubmit = async () => {
    if (number) {
      try {
        setloading(true);
        setError(null)
        const response = await api.get(`/findnumber/${number}`);
        setloading(false);
        setData(response.data);
      } catch (error) {
        setloading(false)
        setError(error.response.status);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error && error === 404 ? (
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
                onChange={onChangeInput}
                type="text"
                className="w-full p-2 border rounded text-black border-none"
                placeholder="Digite o número da rifa"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
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
            <div className="mt-4 w-full text-center">
              <p>
                <span className="font-bold">Bilhete não adquirido.</span>
              </p>
            </div>
        </div>
      </div>
      ) : (
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
                  onChange={onChangeInput}
                  type="text"
                  className="w-full p-2 border rounded text-black border-none"
                  placeholder="Digite o número da rifa"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
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
            {data && (
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Dados do usuário:</h3>
                <p>
                  <span className="font-bold">Nome: </span>
                  {data.name}
                </p>
                <p>
                  <span className="font-bold">Número: </span>
                  {data.phone}
                </p>
                <p>
                  <span className="font-bold">Email: </span>
                  {data.email}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
