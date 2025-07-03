import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import  { store } from "../redux/store";
import Navbar from "../components/Navbar";
import dynamic from 'next/dynamic'; 
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
const Chatbot = dynamic(() => import('../components/Chatbot'), {
  ssr: false,
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Navbar />
        <Chatbot/>
        <Component {...pageProps} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#4CAF50',
              color: '#fff',
              fontSize: '16px',
            },
          }}
        />
        <Footer/>
      </Provider>
    </SessionProvider>
  );
}
