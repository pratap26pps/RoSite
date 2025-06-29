import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import  { store } from "../redux/store";
import Navbar from "../components/Navbar";
import dynamic from 'next/dynamic'; 

const Chatbot = dynamic(() => import('../components/Chatbot'), {
  ssr: false,
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Navbar />
        <Chatbot/>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
