import "@/styles/globals.css";
import ConteudoPrincipal from "../../components/layout/conteudoPrincipal/ConteudoPrincipal";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function App({ Component, pageProps }) {
  return (
      <ConteudoPrincipal>
          <Component {...pageProps} />

      </ConteudoPrincipal>
  )
}
