import Navbar from "../../components/navbar";
import { Ticket, Star } from "lucide-react";
import Carro from "../../assets/car.png";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  const getInfo = async () => {
    try {
      const response = await api.get("/products/getproducts");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="px-4 flex flex-col gap-6">
      <Navbar />
      <div className="flex gap-4">
        {" "}
        <Ticket /> <p>Campanhas</p>
      </div>
      <div>
        <img src={Carro} alt="" />
      </div>
      <div className="flex gap-4">
        <Star /> <p>Últimos Sorteios</p>
      </div>
      <div></div>

      {products.length > 0 &&
        products?.map((item) => (
          <img key={item._id} src={item.Image} alt="Imagem teste" />
        ))}
    </div>
  );
}
