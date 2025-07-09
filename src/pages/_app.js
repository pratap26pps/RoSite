import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "../components/Navbar";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import AOS from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
 


const Chatbot = dynamic(() => import("../components/Chatbot"), {
  ssr: false,
});

 
function AuthSyncWrapper({ children }) {
  const { data: sessionData, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        console.log("User from /api/me:", res.data.user);
        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(setUser(null));
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (status === "authenticated" && sessionData?.user) {
      dispatch(
        setUser({
          name: sessionData.user.name,
          email: sessionData.user.email,
          image: sessionData.user.image,
          role: sessionData.user.role,
          id: sessionData.user.id,
        })
      );
    } else if (status === "unauthenticated") {
      dispatch(setUser(null));
    }
  }, [status, sessionData]);

  return children;
}

export default function App({ Component, pageProps: { session: sessionProp, ...pageProps } }) {
  return (
    <SessionProvider session={sessionProp}>
      <Provider store={store}>
        <AuthSyncWrapper>
          <Navbar />
          <Chatbot />
          <Component {...pageProps} />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                background: "#4CAF50",
                color: "#fff",
                fontSize: "16px",
              },
            }}
          />
          <Footer />
        </AuthSyncWrapper>
      </Provider>
    </SessionProvider>
  );
}
