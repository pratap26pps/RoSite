import LoginModal from "../components/Auth/ LoginModal";
import { useDispatch } from "react-redux";
import { AuthModel } from "@/src/redux/slices/authSlice";
export default function Home() {
const dispatch=useDispatch();
  return (
    <div>
      <LoginModal />
      <h1 className="text-3xl font-bold text-center mt-10">Welcome to RO Store</h1>
      <button onClick={()=>dispatch(AuthModel(true))}> OPEN BOX</button>
    </div>
  );
}
