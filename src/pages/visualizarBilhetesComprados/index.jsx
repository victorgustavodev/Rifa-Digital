import Navbar from "../../globalComponents/navbar";
import asd from "../../assets/car.png";

function index() {
  return (
    <div>
      <Navbar />
      <h1 className="font-bold uppercase text-center text-2xl">
        Meus bilhetes
      </h1>
      <section className="grid grid-cols-3 p-4 gap-3 justify-center w-screen max-w-[1120px]">
        <div className="flex flex-col gap-3 bg-slate-200 p-3 lg:p-6 rounded-md">
          <div className="flex flex-col items-center gap-2">
            <img src={asd} alt="" className="w-24 lg:w-56" />
            <h1 className="font-bold lg:text-lg"> XRE 300 ou 20k no PIX </h1>
          </div>
          <h1>
            {" "}
            <span className="font-bold text-red-500">(23)</span> Bilhetes
            adquiridos: 6524, 9317, 8435, 5568, 4771, 3295, 6849, 8880, 3032,
            9921, 1592, 7458, 8640, 1156, 2381, 7097, 4683, 5140, 837, 197,
            6742, 3904, 2921{" "}
          </h1>
          <h1>
            {" "}
            <span className="font-bold text-red-500">(0)</span> Bilhetes
            premiados:{" "}
          </h1>
        </div>
        {/* --------- */}
      </section>
    </div>
  );
}

export default index;
