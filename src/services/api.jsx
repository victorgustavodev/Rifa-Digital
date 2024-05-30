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
    return response;
  },
  (error) => {
    

    // if (error.response.status === 401) {
    //   window.location.href = "/login";
    // }

    if (error.code === 502 || error.code === "ERR_NETWORK") {
      window.location.href = "/unavailable";
    }

    return Promise.reject(error); // Retorna o erro para tratamento posterior
  }
);

export default api;
