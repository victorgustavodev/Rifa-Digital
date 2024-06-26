import api from "../../services/api";
import Loading from "../../globalComponents/loading";
import { useEffect, useState } from "react";
import { LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z
    .string()
    .min(5, { message: "O nome da rifa deve conter no minímo 5 caractéres" }),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0.1, { message: "Informe um preço válido, maior que 0." })
  ),
  cota: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0.1, { message: "Informe uma cota válida, maior que 0." })
  ),
  totalBilhetes: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(1000, {
      message: "Informe um total de bilhetes, maior ou igual a 1000.",
    })
  ),
});

function Index() {
  const {
    reset,
    register,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const [products, setProducts] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [creatingCampaign, setCreatingCampaign] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [maxImageSize] = useState(200 * 1024); // Tamanho máximo em bytes (70KB)
  const [currentImageSize, setCurrentImageSize] = useState(null);
  const [token, setToken] = useState("");
  const [Autenticated, setAutenticated] = useState();

  const navigate = useNavigate();

  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size.toFixed(2)} B`;
    } else if (size >= 1024 && size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("authToken");
    setToken(jwt);
  }, [setToken]);

  const Logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await api.post(
          "/auth",
          {},
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (response.status === 200) {
          setAutenticated(true);
        }
      } catch (error) {
        if (error.response.status === 403) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
        setAutenticated(false);
      }
    };

    if (token && !Autenticated) {
      authenticateUser();
    }
  }, [token, Autenticated, setAutenticated, navigate]);

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
    cota: "",
    totalBilhetes: "",
    status: true,
    image: null,
  });

  const clearFormFields = () => {
    setFormData({
      name: "",
      cota: "",
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
      const response = await api.delete(`/deleteproduct/${productId}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 403) {
        navigate("/login");
      } else if (response.status === 200) {
        setAutenticated(true);
      }
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      setAutenticated(false);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      cota: product.cotaPremiada,
      totalBilhetes: product.totalBilhetes,
      status: product.status,
      image: null,
    });
  };

  const updateProduct = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", parseFloat(formData.price).toFixed(2));
    formDataToSend.append("cota", parseFloat(formData.cota).toFixed(2));
    formDataToSend.append("status", formData.status);
    formDataToSend.append(
      "totalBilhetes",
      parseFloat(formData.totalBilhetes).toFixed(2)
    );

    if (formData.image) {
      if (formData.image.size > 200 * 1024) {
        return;
      }

      formDataToSend.append("image", formData.image);

      try {
        const response = await api.put(
          `/updateproduct/${editingProduct._id}`,
          formDataToSend,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 403) {
          navigate("/login");
        } else if (response.status === 200) {
          setAutenticated(true);
        }

        setProducts(
          products.map((product) =>
            product._id === editingProduct._id ? response.data : product
          )
        );
        clearFormFields();
        setEditingProduct(null);
      } catch (error) {
        setAutenticated(false);
      }
    } else {
      try {
        const response = await api.put(
          `/updateproduct/${editingProduct._id}`,
          formDataToSend,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 403) {
          navigate("/login");
        } else if (response.status === 200) {
          setAutenticated(true);
        }

        setProducts(
          products.map((product) =>
            product._id === editingProduct._id ? response.data : product
          )
        );
        setEditingProduct(null);
      } catch (error) {
        setAutenticated(false);
      }
    }
  };

  const createCampaign = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", parseFloat(formData.price).toFixed(2));
    formDataToSend.append("cota", parseFloat(formData.cota).toFixed(2));
    formDataToSend.append(
      "totalBilhetes",
      parseFloat(formData.totalBilhetes).toFixed(2)
    );

    formDataToSend.append("status", formData.status);
    console.log(formDataToSend);

    if (formData.image) {
      if (formData.image.size > 200 * 1024) {
        return;
      }

      formDataToSend.append("image", formData.image);

      try {
        const response = await api.post("/createproduct", formDataToSend, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data", // Ajuste o cabeçalho aqui
          },
        });

        if (response.status === 403) {
          navigate("/login");
        } else if (response.status === 200) {
          setAutenticated(true);
        }

        setProducts([...products, response.data]);
        setCreatingCampaign(false);
        clearFormFields();
      } catch (error) {
        setAutenticated(false);
      }
    } else {
      try {
        const response = await api.post("/createproduct", formDataToSend, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setProducts([...products, response.data]);
        setCreatingCampaign(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    reset();
    clearErrors();
  };

  return (
    <div>
      {Autenticated === true ? (
        <div className="bg-[#0A0125] h-screen text-white flex">
          <div className="w-full">
            <header className="flex justify-center items-center py-4 border-b-[1px]">
              <div className="w-4/5 flex justify-between items-center">
                <Link to={"/"}>
                  <h1 className="text-md lg:text-lg">Dujão do corte</h1>
                </Link>
                <div className="flex gap-3 font-bold">
                  <Link to="/admin">Minhas campanhas</Link>
                  <Link to="/admin/ganhador">Dados Usuários</Link>
                </div>
                <LogOutIcon
                  onClick={Logout}
                  size={20}
                  className="cursor-pointer hover:text-red-400 transition-all"
                />
              </div>
            </header>
            <main className="p-4 text-black flex flex-col justify-center items-center">
              <div className="flex flex-col gap-5 w-4/5">
                <div className="flex gap-5 items-center justify-between">
                  <h1 className="text-lg text-white">Minhas campanhas</h1>
                  <button
                    className="select-none text-[8px] lg:text-xs font-semibold uppercase bg-violet-800 px-5 py-3 rounded-md text-white transition-all hover:bg-violet-500"
                    onClick={() => {
                      setCreatingCampaign(true);
                      reset();
                    }}
                  >
                    Criar campanha
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {products && products.length > 0 ? (
                    products.map((item) => (
                      <section
                        key={item._id}
                        className="text-[10px] text-start lg:text-base"
                      >
                        <div className="grid bg-zinc-300 grid-cols-1 gap-3 lg:gap-5 items-center p-4 rounded-md">
                          <div className="flex gap-2 items-center justify-center">
                            <img
                              src={item.image}
                              className="rounded-md cursor-pointer w-full h-[200px] object-cover"
                              alt={item.name}
                              onClick={() => handleImageClick(item.image)}
                            />
                          </div>

                          <div className="flex gap-2 items-center">
                            <p className="text-base font-bold ">
                              {" "}
                              Título da rifa: {item.name}
                            </p>
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
                          <p className="text-base font-bold ">
                            <span>Valor da rifa: </span>
                            {Number(item.price).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                          <p className="text-base font-bold ">
                            <span>Rifas vendidas: </span>
                            {item.BilhetesVendidos} de{" "}
                            {Number(item.totalBilhetes).toLocaleString("pt-BR")}
                          </p>
                          <p className="text-base font-bold ">
                            <span>Valor da cota: </span>
                            {Number(item.cotaPremiada).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                          <p className={`text-base font-bold`}>
                            <div className="flex gap-1">
                              <p>Status da rifa: </p>{" "}
                              <span
                                className={`${
                                  item.status
                                    ? "text-green-700"
                                    : "text-red-700"
                                }`}
                              >
                                {item.status ? "Ativa" : "Finalizada"}
                              </span>
                            </div>
                          </p>
                          <p className="text-base font-bold">
                            {" "}
                            <span>Criado em: </span>
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString(
                                  "pt-BR",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  }
                                ) +
                                " às " +
                                new Date(item.createdAt).toLocaleTimeString(
                                  "pt-BR",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                              : "N/A"}
                          </p>
                          <div className="flex gap-2 lg:gap-5 items-center pt-5 justify-end">
                            <button
                              className="text-base font-bold uppercase text-violet-950 hover:text-violet-900 transition-all"
                              onClick={() => {
                                editProduct(item);
                              }}
                            >
                              Editar
                            </button>
                            <button
                              className="text-base font-bold uppercase text-violet-950 hover:text-violet-900 transition-all"
                              onClick={() => deleteProduct(item._id)}
                            >
                              Deletar
                            </button>
                          </div>
                        </div>
                      </section>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <h1 className="text-center text-white text-3xl font-bold pt-10 uppercase">
                        {products ? "Nenhum produto cadastrado!" : <Loading />}
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>

          {editingProduct && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-10 rounded-md text-black  w-full lg:w-1/2">
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
                      {...register("name")}
                      type="text"
                      placeholder="Ex: Nome do produto"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                    {errors.name && (
                      <p className="text-red-500 mt-2">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Preço
                    </label>
                    <input
                      {...register("price")}
                      value={formData.price === null ? "" : formData.price}
                      type="number"
                      step="0.01"
                      placeholder="Ex: 0,20 = R$0,20"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price:
                            e.target.value === ""
                              ? null
                              : Number(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                    {errors.price && (
                      <p className="text-red-500 mt-2">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Cota premiada
                    </label>
                    <input
                      {...register("cota")}
                      type="number"
                      value={formData.cota === null ? "" : formData.cota}
                      step="0.01"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cota:
                            e.target.value === ""
                              ? null
                              : Number(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                    {errors.cota && (
                      <p className="text-red-500 mt-2">{errors.cota.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Total de Bilhetes
                    </label>
                    <input
                      {...register("totalBilhetes")}
                      type="number"
                      placeholder="Ex: 10000 = 10000 bilhetes disponíveis"
                      value={Number(formData.totalBilhetes)}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalBilhetes: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                    {errors.totalBilhetes && (
                      <p className="text-red-500 mt-2">
                        {errors.totalBilhetes.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Status
                    </label>
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
                      <option value="true">Ativa</option>
                      <option value="false">Encerrada</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Imagem
                    </label>
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
                        Tamanho atual: {formatFileSize(currentImageSize)} /{" "}
                        {formatFileSize(maxImageSize)}
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
                        reset();
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
              <div className="bg-white p-10 rounded-md text-black w-full lg:w-1/2">
                <h2 className="text-center lg:text-xl font-bold mb-4">
                  Criar Nova Campanha
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createCampaign();
                  }}
                >
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Nome</label>
                    <input
                      {...register("name")}
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                    {errors.name && (
                      <p className="text-red-500 mt-2">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Preço
                    </label>
                    <input
                      {...register("price")}
                      type="number"
                      step="0.01"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price:
                            e.target.value === ""
                              ? null
                              : Number(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                    {errors.price && (
                      <p className="text-red-500 mt-2">
                        {errors.price.message}
                      </p>
                    )}
                    <div className="mb-4"></div>
                    <label className="block text-sm font-bold mb-2">
                      Valor das cotas
                    </label>
                    <input
                      {...register("cota")}
                      type="number"
                      step="0.01"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cota:
                            e.target.value === ""
                              ? null
                              : Number(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                    {errors.cota && (
                      <p className="text-red-500 mt-2">{errors.cota.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Total de Bilhetes
                    </label>
                    <input
                      {...register("totalBilhetes")}
                      type="number"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalBilhetes: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                    {errors.totalBilhetes && (
                      <p className="text-red-500 mt-2">
                        {errors.totalBilhetes.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Imagem
                    </label>
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
                        Tamanho atual: {formatFileSize(currentImageSize)} /{" "}
                        {formatFileSize(maxImageSize)}
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
                        reset();
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
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Index;
