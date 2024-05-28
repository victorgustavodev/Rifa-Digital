import { Pencil, Trash } from "lucide-react";
import { BsPerson } from "react-icons/bs";

function dashboardBtn() {
  return (
    <div>
      {/* <div className="py-10 flex justify-around bg-zinc-300 rounded-md items-center"> */}
      <div className="grid bg-zinc-300 grid-cols-6 items-center justify-center p-4 rounded-md ">
        <div className="flex gap-2 items-center">
          <BsPerson />
          <p>Nome do produto</p>
        </div>
        <p>R$0,30</p>
        <p>323</p>
        <span>Ativo</span>
        <p>23-03-2023 16:03</p>
        <div className="flex gap-5 items-center">
          <button>
            <Pencil />
          </button>
          <button>
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default dashboardBtn;
