import { IoLogoWhatsapp } from "react-icons/io";

function BtnWhatsapp() {
  return (
    <div>
      <a
        href="https://api.whatsapp.com/send?phone=SEU_NUMERO_DE_TELEFONE_AQUI"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IoLogoWhatsapp color="#25d366" className="fixed bottom-5 right-4 md:bottom-8 md:right-6 z-10 text-3xl md:text-3xl lg:text-5xl transition-all hover:translate-y-[-5px]" />
      </a>
    </div>
  );
}

export default BtnWhatsapp;
