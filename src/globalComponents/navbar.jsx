import { Megaphone, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numbersUser, setNumberUser] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleModal = () => {
    if (openModal) {
      setNumberUser([]);
    }
    setOpenModal(!openModal);
  };

  const handlePhoneNumberChange = (e) => {
    let input = e.target.value;
    // Remove all characters except digits
    input = input.replace(/\D/g, "");
    // Limit to 11 characters
    input = input.substring(0, 11);
    // Add parentheses, space, and hyphen
    if (input.length > 2) {
      input = `(${input.substring(0, 2)}) ${input.substring(2)}`;
    }
    if (input.length > 9) {
      input = `${input.substring(0, 10)}-${input.substring(10)}`;
    }
    setPhoneNumber(input);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await api.get(`/getnumbers/${phoneNumber}`);
      setNumberUser(data);
    } catch (error) {
      console.error("Erro ao buscar número:", error);
    }
  };

  return (
    <div className="flex justify-center items-center border-b-[0.5px] border-gray-200 bg-white z-50">
      <div className="flex justify-between p-4 items-center min-h-[77px] max-w-[1120px] w-full h-full">
        <Link to={"/"}>
          <span className="uppercase text-lg font-bold">dujão du corte</span>
        </Link>
        <div className="sm:hidden">
          <button className="flex items-center" onClick={toggleMenu}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        <div className="hidden sm:block">
          <div className="flex gap-5">
            <div className="hidden sm:block">
              <Link
                to="/meusbilhetes"
                className="flex gap-2 text-black bg-zinc-200 rounded-xl p-3 text-sm font-semibold transition-all hover:bg-zinc-300"
              >
                <ShoppingCart size={20} /> Ver meus bilhetes
              </Link>
            </div>
            <div className="hidden sm:block">
              <Link
                to="/campanhas"
                className="flex gap-2 bg-zinc-200 rounded-xl p-3 text-sm font-semibold transition-all hover:bg-zinc-300"
              >
                <Megaphone size={20} /> Campanhas
              </Link>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="sm:hidden absolute right-0 top-[77px] bg-zinc-100 w-screen h-screen">
            <div className="flex flex-col items-center py-10 gap-5 h-3/5 px-10">
              <Link
                to="/meusbilhetes"
                className="flex gap-2 text-black bg-zinc-200 rounded-xl p-5 text-base font-semibold transition-all w-full hover:bg-zinc-300"
              >
                <ShoppingCart size={20} /> Ver meus bilhetes
              </Link>

              <Link
                to="/campanhas"
                className="flex gap-2 bg-zinc-200 rounded-xl p-5 text-base font-semibold transition-all w-full hover:bg-zinc-300"
              >
                <Megaphone size={20} /> Campanhas
              </Link>
            </div>
          </div>
        )}

        {/* Modal */}
        {openModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg max-w-[300px] md:max-w-none min-h-[200px] max-h-[80vh] overflow-y-auto lg:min-w-[477px]">
              <h2 className="text-2xl font-bold mb-4">Ver meus bilhetes</h2>
              <input
                type="tel"
                placeholder="(00) 12345-6789"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                maxLength="15"
              />

              {numbersUser.length > 0 && (
                <div>
                  <ul>
                    {numbersUser.map((num, index) => (
                      <li key={index}>
                        <div>
                          <span>Rifa: </span>
                          <p className="text-xl font-bold">{num.name}</p>
                          <h3>Números Adquiridos: </h3>
                          <p className="font-bold text-xl">
                            {num.numbers.join(", ")}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                className="mt-4 bg-zinc-200 text-black rounded-lg py-2 px-4 hover:bg-zinc-300"
                onClick={handleSubmit}
              >
                Buscar
              </button>
              <button
                className="ml-2 mt-4 bg-zinc-200 text-black rounded-lg py-2 px-4 hover:bg-zinc-300"
                onClick={toggleModal}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
