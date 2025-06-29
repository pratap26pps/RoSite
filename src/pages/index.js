import LoginModal from "../components/Auth/ LoginModal";
import { useDispatch } from "react-redux";
import { AuthModel } from "@/src/redux/slices/authSlice";
export default function Home() {
const dispatch=useDispatch();
  return (
    <div>
      <LoginModal />
      <div className="text-3xl font-bold text-center mt-20">
        <p>Welcome to RO Store</p>
        <button onClick={()=>dispatch(AuthModel(true))}>open modal</button>
      </div>     
     </div>
  );
}
