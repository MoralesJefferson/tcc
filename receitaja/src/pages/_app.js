import "@/styles/globals.css";
import ConteudoPrincipal from "../../components/layout/conteudoPrincipal/ConteudoPrincipal";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "../../context/UserContext";
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ConteudoPrincipal>
          <Component {...pageProps} />

      </ConteudoPrincipal>
    </UserProvider>
  )
}
