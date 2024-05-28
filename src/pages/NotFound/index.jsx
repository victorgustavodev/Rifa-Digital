// import { SearchCode } from "lucide-react";
import Navbar from "../../globalComponents/navbar";
import Image from "../../assets/not-found.jpeg";

function index() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <img src={Image} className="w-[700px]"/>
      </div>
    </div>
  );
}

export default index;
