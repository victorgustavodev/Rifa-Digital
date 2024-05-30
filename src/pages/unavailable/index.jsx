import { useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Unavailable() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyService = async () => {
      try {
        const response = await api.get("/helloworld");
        console.log(response.status);
        if (response.status === 200) {
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao verificar o status do serviço:", error);
      }
    };
    verifyService();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white to-blue-200">
      <h1 className="text-8xl md:text-9xl font-bold text-red-600 mb-4">502</h1>
      <h2 className="text-3xl text-gray-800 mb-4">Bad Gateway</h2>
      <p className="text-lg text-gray-700 mb-8 text-center px-4">
        Oops! Algo deu errado. Tente recarregar a página ou volte mais tarde.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Voltar para a Home
      </a>
    </div>
  );
}

export default Unavailable;
