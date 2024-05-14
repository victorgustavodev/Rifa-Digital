import { FaWhatsapp } from "react-icons/fa";

function BtnWhatsapp() {
  return (
    <div>
      <a href="https://api.whatsapp.com/send?phone=SEU_NUMERO_DE_TELEFONE_AQUI" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp className="text-green-600 fixed bottom-5 right-4 md:bottom-8 md:right-6 text-3xl md:text-3xl lg:text-5xl transition-all hover:translate-y-[-5px]" />
      </a>
    </div>
  );
}

export default BtnWhatsapp;
