import styles from "../../../src/styles/PaginaDesconectada.module.css"
import logo from "../../../public/image/logo.png"
import Image from "next/image";

const PaginaDesconectada = ({children}) => {
    return (
        <main className = {styles.paginaDesconectada}>
            <div className={styles.ladoEsquerdo}>
                <Image className={styles.logo} src={logo} alt='Logo Do Site' title='Logo Do Site'/>
            </div>
            <div className={styles.ladoDireito}>
                {children}        
            </div>
      
        </main>
    );
}

export default PaginaDesconectada;