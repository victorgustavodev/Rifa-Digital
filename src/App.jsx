import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Item from "./pages/item/index";
import ItemFinalizado from "./pages/itemFinalizado/index";
import Checkout from "./pages/checkout/index";
import Shopping from "./pages/checkout/shopping";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/item-finalizado/:id" element={<ItemFinalizado />} />
        <Route path="/checkout/:id/:price" element={<Checkout />} />
        <Route path="/payments/:id/:phone/:price" element={<Shopping />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
