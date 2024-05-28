
import { useParams } from "react-router-dom";

export default function Shopping() {
  const { id,phone, price } = useParams();

  return (
    <div>
     <p>{id}</p>
     <p>{phone}</p>
     <p>{price}</p>
    </div>
  );
}
