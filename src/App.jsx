import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Campanhas from "./pages/campanhas/index";
import CampanhaAtiva from "./pages/campanhaAtiva/index";
import CampanhaFinalizada from "./pages/campanhaFinalizada/index";
import BilhetesComprados from "./pages/visualizarBilhetesComprados";
import Checkout from "./pages/checkout/index";
import NotFound from "./pages/NotFound/index";
import Admin from "./pages/dashboard/index";
import Login from "./pages/login/index"; // Importe o componente de Login
import ProtectedRoute from "./pages/protectedRoute/index"; // Importe o componente de rota protegida
import Unavailable from "./pages/unavailable/index";
import Payment from "./pages/payment/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<CampanhaAtiva />} />
        <Route path="/checkout/:id/:ammount" element={<Checkout />} />
        <Route path="/payments/:encodedParams" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/finalizada/:id" element={<CampanhaFinalizada />}></Route>
        <Route path="/meusbilhetes" element={<BilhetesComprados />}></Route>
        <Route path="/campanhas" element={<Campanhas />}></Route>

        {/* Adicione a rota de login */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/unavailable" element={<Unavailable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
