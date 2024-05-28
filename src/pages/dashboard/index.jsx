import { IoHomeSharp } from "react-icons/io5";
import api from "../../services/api";
import Loading from "../../globalComponents/loading";
import { useEffect, useState } from "react";
import { Crown, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

function Index() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [creatingCampaign, setCreatingCampaign] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    totalBilhetes: "",
    status: true,
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getproducts/all");
        setProducts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await api.delete(`/deleteproduct/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      totalBilhetes: product.totalBilhetes,
      status: product.status,
      image: null,
    });
  };

  const updateProduct = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("totalBilhetes", formData.totalBilhetes);
    formDataToSend.append("status", formData.status);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await api.put(`/updateproduct/${editingProduct._id}`, formDataToSend);
      setProducts(products.map((product) => (product._id === editingProduct._id ? response.data : product)));
      setEditingProduct(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createCampaign = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("totalBilhetes", formData.totalBilhetes);
    formDataToSend.append("status", formData.status);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await api.post("/createproduct", formDataToSend);
      setProducts([...products, response.data]);
      setCreatingCampaign(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-[#0A0125] h-screen text-white flex">
      <div className="w-1/4 h-full flex flex-col border-r-2">
        <header className="p-10 w-screen border-b-2">
          <Link to={"/"}>
            <h1 className="text-[30px] uppercase font-bold">Dujão do corte</h1>
          </Link>
        </header>

        <nav className="p-10">
          <ul className="flex flex-col gap-5">
            <li className="flex gap-3 items-center text-[20px] font-semibold uppercase">
              <IoHomeSharp /> Dashboard
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-3/4">
        <header className="flex w-full justify-between items-center p-10 border-b-2">
          <h1 className="text-[30px] uppercase font-bold">Dashboard admin</h1>
          <Crown size={40} />
        </header>
        <main className="p-10 text-black flex flex-col gap-3">
          <div className="flex gap-5 items-center justify-between">
            <h1 className="text-[30px] text-white">Minhas campanhas</h1>
            <button
              className="text-md font-semibold uppercase bg-violet-800 px-5 py-3 rounded-md text-white transition-all hover:bg-violet-500"
              onClick={() => setCreatingCampaign(true)}
            >
              Criar campanha
            </button>
          </div>

          <div className="grid text-white grid-cols-6">
            <p>Campanha</p>
            <p>Valor</p>
            <p>Números vendidos</p>
            <p>Status</p>
            <p>Data</p>
          </div>

          {products.length > 0 ? (
            products.map((item) => (
              <section key={item._id}>
                <div className="grid bg-zinc-300 grid-cols-6 items-center justify-center p-4 rounded-md ">
                  <div className="flex gap-2 items-center">
                    <img src={item.image} className="w-10 rounded-sm" alt="" />
                    <p className="text-xs">{item.name}</p>
                  </div>
                  <p>
                    {item.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p>
                    {item.BilhetesVendidos} de {item.totalBilhetes}
                  </p>
                  <span>{item.status ? "Ativo" : "Finalizado"}</span>
                  <p>23-03-2023 16:03</p>
                  <div className="flex gap-5 items-center">
                    <button onClick={() => editProduct(item)}>
                      <Pencil />
                    </button>
                    <button onClick={() => deleteProduct(item._id)}>
                      <Trash />
                    </button>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <Loading />
          )}
        </main>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-10 rounded-md text-black w-1/2">
            <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Preço</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Total de Bilhetes</label>
                <input
                  type="number"
                  value={formData.totalBilhetes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalBilhetes: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Imagem</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {creatingCampaign && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-10 rounded-md text-black w-1/2">
            <h2 className="text-xl font-bold mb-4">Criar Nova Campanha</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createCampaign();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Preço</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Total de Bilhetes</label>
                <input
                  type="number"
                  value={formData.totalBilhetes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalBilhetes: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Imagem</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setCreatingCampaign(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
