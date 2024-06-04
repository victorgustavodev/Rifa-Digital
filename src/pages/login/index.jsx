// src/pages/Login.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // Atualize o caminho conforme necessário

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const Auth = async () => {
      const token = localStorage.getItem("authToken");
      const response = await api.post("/auth", {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        return navigate("/admin");
      } else {
        navigate("/login");
      }
    };
    Auth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { username, password });
      localStorage.setItem("authToken", response.data.token);
      navigate("/admin");
    } catch (error) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-white p-10 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            {error && <p className="text-red-500 mt-2 mb-4">{error}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all w-full"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
