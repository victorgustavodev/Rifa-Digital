import { useState } from "react";
import Navbar from "../../globalComponents/navbar";
import api from "../../services/api";
import Loading from "../../globalComponents/loading";
import { ChevronDown, ChevronUp } from "lucide-react";

function Index() {
  const [numbersUser, setNumberUser] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const handlePhoneNumberChange = (e) => {
    let input = e.target.value;
    // Remove todos os caracteres que não sejam dígitos
    input = input.replace(/\D/g, "");
    // Limita a 11 caracteres
    input = input.substring(0, 11);
    // Adiciona parênteses, espaço e hífen
    if (input.length > 2) {
      input = `(${input.substring(0, 2)}) ${input.substring(2)}`;
    }
    if (input.length > 9) {
      input = `${input.substring(0, 10)}-${input.substring(10)}`;
    }
    setPhoneNumber(input);
  };

  const handleSubmit = async () => {
    if (phoneNumber) {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/getnumbers/${phoneNumber}`);
        setNumberUser(data);
      } catch (error) {
        console.error("Erro ao buscar número:", error);
      }
      setIsLoading(false);
    }
  };

  const toggleExpand = (index) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center mt-8">
        <h1 className="font-bold uppercase text-2xl mb-4 text-gray-700">
          Meus bilhetes
        </h1>
        <div className="w-full flex gap-3 max-w-lg p-6 bg-white shadow-md lg:shadow-lg rounded-lg">
          <input
            type="tel"
            placeholder="(00) 12345-6789"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            maxLength="15"
          />
          <button
            className="bg-blue-500 text-white rounded-lg py-2 w-1/2 hover:bg-blue-600 transition duration-300"
            onClick={handleSubmit}
          >
            Buscar
          </button>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          numbersUser.length > 0 && (
            <div className="w-full max-w-screen-lg mt-8 rounded-lg p-6 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {numbersUser.map((num, index) => (
                  <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                      {num.numbers.length}
                    </div>
                    <div className="flex flex-col items-center gap-4 mb-4">
                      <img
                        src={num.image}
                        alt="Car Image"
                        className="w-24 lg:w-full pt-3 lg:pt-0 rounded-md shadow-sm"
                      />
                      <h1 className="font-bold text-lg text-gray-700 px-4 ">
                        {num.name}
                      </h1>
                    </div>
                    <div className="flex flex-col justify-between px-4 py-2">
                      <div className="flex items-center justify-between w-full">
                        <h2 className="text-gray-600">
                          <span className="font-bold text-blue-500">
                            Minhas rifas: 
                          </span>
                        </h2>
                        <button onClick={() => toggleExpand(index)}>
                          {expanded === index ? (
                            <ChevronUp className="text-gray-600" />
                          ) : (
                            <ChevronDown className="text-gray-600" />
                          )}
                        </button>
                      </div>
                      {expanded === index && (
                        <p className="text-gray-600 mt-2">
                          {num.numbers.join(", ")}
                        </p>
                      )}
                      <h2 className="text-gray-600 mt-2">
                        <span>
                          <p className="font-bold text-blue-500">
                            Bilhetes premiados:
                          </p>
                          {num.premiedNumbers.length > 0
                            ? num.premiedNumbers.join(", ")
                            : "Nenhum bilhete premiado"}
                        </span>
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Index;
