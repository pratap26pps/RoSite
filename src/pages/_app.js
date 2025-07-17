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
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { setProducts } from "../redux/slices/productSlice";

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

  
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (data.success && Array.isArray(data.products)) {
                    dispatch(setProducts(data.products));
                }
            } catch (err) {
                 console.log(err);
            }
        }
        fetchProducts();
    }, [dispatch]);
   





  return children;
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 cursor-pointer right-8 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-opacity duration-300 hover:bg-blue-700 focus:outline-none ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

function FloatingContactButtons() {
  return (
    <div className="fixed right-8 top-1/2 z-50 flex flex-col gap-4 -translate-y-1/2">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/8252590019"  
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.05C13.41 27.634 14.686 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.13 0-2.24-.188-3.29-.557l-.235-.08-4.65 1.22 1.24-4.53-.15-.23C7.3 18.13 6.5 16.6 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.07-7.75c-.28-.14-1.65-.82-1.9-.91-.25-.09-.43-.14-.61.14-.18.28-.7.91-.86 1.09-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.51-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 5.01 4.22.7.24 1.25.38 1.68.48.71.15 1.36.13 1.87.08.57-.06 1.75-.72 2-1.41.25-.69.25-1.28.18-1.41-.07-.13-.25-.2-.53-.34z" />
        </svg>
      </a>
      {/* Telephone Button */}
      <a
        href="tel:+8252590019"  
        className="p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
        aria-label="Call us"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.3 1.2a2 2 0 01-.45 1.95l-.7.7a16.001 16.001 0 006.586 6.586l.7-.7a2 2 0 011.95-.45l1.2.3A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C7.163 21 3 16.837 3 12V5z" />
        </svg>
      </a>
    </div>
  );
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
          <ScrollToTopButton />
          <FloatingContactButtons />
        </AuthSyncWrapper>
      </Provider>
    </SessionProvider>
  );
}
