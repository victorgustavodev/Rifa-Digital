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
  const [imageURL, setImageURL] = useState(null);
  const [maxImageSize] = useState(70000); // Tamanho máximo em bytes (70KB)
  const [currentImageSize, setCurrentImageSize] = useState(null);
  
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);

  const handleImageClick = (image) => {
    setClickedImage(image);
    setIsImageOpen(true);
  };

  const handleCloseClick = () => {
    setIsImageOpen(false);
    setClickedImage(null);
  };

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    totalBilhetes: "",
    status: true,
    image: null,
  });

  const clearFormFields = () => {
    setFormData({
      name: "",
      price: "",
      totalBilhetes: "",
      status: true,
      image: null,
    });
    setImageURL(null);
    setCurrentImageSize(null);
  };

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
    formDataToSend.append("status", formData.status);

    if (formData.image) {
      const reader = new FileReader();
      if (formData.image.size > 70000) {
        return;
      }

      reader.readAsDataURL(formData.image);
      reader.onloadend = async () => {
        const base64Image = reader.result;
        formDataToSend.append("image", base64Image);
        try {
          const response = await api.put(
            `/updateproduct/${editingProduct._id}`,
            formDataToSend
          );
          setProducts(
            products.map((product) =>
              product._id === editingProduct._id ? response.data : product
            )
          );
          clearFormFields();
          setEditingProduct(null);
        } catch (error) {
          console.log(error.message);
        }
      };
    } else {
      try {
        const response = await api.put(
          `/updateproduct/${editingProduct._id}`,
          formDataToSend
        );
        setProducts(
          products.map((product) =>
            product._id === editingProduct._id ? response.data : product
          )
        );
        setEditingProduct(null);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const createCampaign = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", parseFloat(formData.price).toFixed(2));
    formDataToSend.append("totalBilhetes", formData.totalBilhetes);
    formDataToSend.append("status", formData.status);

    if (formData.image) {
      const reader = new FileReader();
      if (formData.image.size > 70000) {
        return;
      }

      reader.readAsDataURL(formData.image);
      reader.onloadend = async () => {
        const base64Image = reader.result;
        formDataToSend.append("image", base64Image);
        try {
          const response = await api.post("/createproduct", formDataToSend);
          setProducts([...products, response.data]);
          setCreatingCampaign(false);
          clearFormFields();
        } catch (error) {
          console.log(error.message);
        }
      };
    } else {
      try {
        const response = await api.post("/createproduct", formDataToSend);
        setProducts([...products, response.data]);
        setCreatingCampaign(false);
      } catch (error) {
        console.log(error.message);
      }
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
              <IoHomeSharp className="text-green-200 hover:text-green-100 transition-all" />{" "}
              <Link to={"/admin"}>
                <p className="select-none cursor-pointer hover:text-zinc-400 transition-all">
                  Dashboard
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-3/4">
        <header className="flex w-full justify-between items-center p-10 border-b-2">
          <h1 className="text-[30px] uppercase font-bold">Dashboard admin</h1>
          <Crown
            size={40}
            className="cursor-pointer hover:text-yellow-600 transition-all"
          />
        </header>
        <main className="p-10 text-black flex flex-col gap-3">
          <div className="flex gap-5 items-center justify-between">
            <h1 className="text-[30px] text-white">Minhas campanhas</h1>
            <button
              className="select-none text-md font-semibold uppercase bg-violet-800 px-5 py-3 rounded-md text-white transition-all hover:bg-violet-500"
              onClick={() => setCreatingCampaign(true)}
            >
              Criar campanha
            </button>
          </div>

          <div className="grid text-white grid-cols-6 select-none">
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
                    <img
                      src={item.image}
                      className="w-10 rounded-sm cursor-pointer"
                      alt={item.name}
                      onClick={() => handleImageClick(item.image)}
                    />
                    <p className="text-xs">{item.name}</p>
                  </div>

                  {isImageOpen && clickedImage === item.image && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md z-50">
                      <div className="relative bg-white rounded-md">
                        <img
                          src={clickedImage}
                          className="w-[800px] h-[500px] rounded-md"
                          alt={item.name}
                        />
                        <button
                          className="absolute top-2 right-2 text-white text-2xl bg-black rounded-full px-2"
                          onClick={handleCloseClick}
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  )}
                  <p>
                    {Number(item.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p>
                    {item.BilhetesVendidos} de{" "}
                    {Number(item.totalBilhetes).toLocaleString("pt-BR")}
                  </p>
                  <span
                    className={`select-none w-14 h-5 sm:w-20 sm:h-5 lg:w-28 lg:h-6 flex text-white items-center justify-center rounded-md text-[8px] sm:text-sm ${
                      item.status ? "bg-green-400" : "bg-red-400"
                    }`}
                  >
                    {item.status ? "Ativo" : "Finalizado"}
                  </span>
                  <p>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }) +
                        " " +
                        new Date(item.createdAt).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </p>
                  <div className="flex gap-5 items-center">
                    <button onClick={() => editProduct(item)}>
                      <Pencil className="hover:text-green-600 transition-all" />
                    </button>
                    <button onClick={() => deleteProduct(item._id)}>
                      <Trash className="hover:text-red-400 transition-all" />
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
                <label className="block text-sm font-bold mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value === "true",
                    })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="true">Ativo</option>
                  <option value="false">Encerrado</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Imagem</label>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .jfif, image/jpeg, image/png, image/jfif"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      const validTypes = ["image/jpeg", "image/png"];
                      if (validTypes.includes(selectedFile.type)) {
                        setFormData({
                          ...formData,
                          image: selectedFile,
                        });
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImageURL(reader.result);
                        };
                        setCurrentImageSize(selectedFile.size);
                        reader.readAsDataURL(selectedFile);
                      } else {
                        // Aqui você pode mostrar uma mensagem de erro informando que apenas imagens JPEG e PNG são aceitas
                      }
                    } else {
                      setCurrentImageSize(null);
                    }
                  }}
                  className="w-full p-2 border rounded"
                />
                {currentImageSize !== null && (
                  <p
                    className={`text-xs mt-2 ${
                      currentImageSize > maxImageSize ? "text-red-400" : ""
                    }`}
                  >
                    Tamanho atual:{" "}
                    {Math.round(Number(currentImageSize) / 1024).toFixed(2)} KB
                    / {Math.round(maxImageSize / 1024)} KB
                  </p>
                )}
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Preview"
                    className="mt-4 w-full max-h-80 h-auto"
                  />
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    clearFormFields();
                  }}
                  className="bg-red-400 text-white px-4 py-2 rounded mr-2 hover:bg-red-500 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
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
                <label className="block text-sm font-bold mb-2">
                  Total de Bilhetes
                </label>
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
                  accept=".jpg, .jpeg, .png, .jfif, image/jpeg, image/png, image/jfif"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      const validTypes = ["image/jpeg", "image/png"];
                      if (validTypes.includes(selectedFile.type)) {
                        setFormData({
                          ...formData,
                          image: selectedFile,
                        });
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImageURL(reader.result);
                        };
                        setCurrentImageSize(selectedFile.size);
                        reader.readAsDataURL(selectedFile);
                      } else {
                        // Aqui você pode mostrar uma mensagem de erro informando que apenas imagens JPEG e PNG são aceitas
                      }
                    } else {
                      setCurrentImageSize(null);
                    }
                  }}
                  className="w-full p-2 border rounded"
                />
                {currentImageSize !== null && (
                  <p
                    className={`text-xs mt-2 ${
                      currentImageSize > maxImageSize ? "text-red-400" : ""
                    }`}
                  >
                    Tamanho atual:{" "}
                    {Math.round(Number(currentImageSize) / 1024).toFixed(2)} KB
                    / {Math.round(maxImageSize / 1024)} KB
                  </p>
                )}

                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Preview"
                    className="mt-4 w-full max-h-80 h-auto"
                  />
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setCreatingCampaign(null);
                    clearFormFields();
                  }}
                  className="bg-red-400 text-white px-4 py-2 rounded mr-2 hover:bg-red-500 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
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
