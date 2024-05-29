import axios from "axios";

// Cria uma instância do Axios com uma URL base e cabeçalhos padrão
const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token de autenticação nas requisições
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error); // Retorna o erro em caso de falha
  }
);

// Interceptor para tratar respostas da API
api.interceptors.response.use(
  (response) => {
    return response; // Retorna a resposta se estiver tudo certo
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se a resposta da API indicar que o token é inválido ou expirou, redireciona para a página de login
      window.location.href = "/login";
    }
    return Promise.reject(error); // Retorna o erro para tratamento posterior
  }
);

export default api;
