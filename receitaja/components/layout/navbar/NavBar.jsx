import Link from "next/link";
import { useState } from "react";
import styles from "../../../src/styles/NavBar.module.css";
import setaMenu from "../../../public/angle-right.svg"
import Cookies from 'js-cookie';
import avatar from "../../../public/avatar.png"
import Image from "next/image";

const NavBar = ({ statusNav }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState({ prescricao: false, vantagens: false });

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleSubMenu = (menu) => {
        setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };
    
    const removeToken=()=>{
        Cookies.remove('token')
    }
    
  return (
    <>{statusNav === 'desconectado'?
        <nav className={`${styles[statusNav]}`}>
            <div className={styles.boxLink}>
                <Link className={styles.link} href="/">
                    Home
                </Link>
                <Link className={styles.link} href="/sobre">
                    Sobre
                </Link>
                <Link className={styles.link} href="/vantagens">
                    Vantagens
                </Link>
                <Link className={styles.link} href="/contato">
                    Contato
                </Link>
            
            </div>
        </nav> : <>
            <nav className={styles.nav}>
                <button className={styles.btn} onClick={toggleSidebar}>
                    <p className={styles.icon}>{!sidebarOpen && '☰'}</p>
                </button>
                <h1>Receita já</h1>
                <span>je@gmail.com</span>
            </nav>
            <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
                <ul className={styles.ulP}>
                <li className={styles.liIcone}>
                
                <Image className={styles.avatar} src={avatar} alt=""/>
                <button className={styles.btn} onClick={toggleSidebar}>
                    <p className={styles.iconFecha}>{sidebarOpen &&'×'}</p>
                </button>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href="/prescricao" onClick={(e) => { e.preventDefault(); toggleSubMenu('prescricao'); }}>   
                            Prescrição <Image className={`${styles.arrow} ${subMenuOpen.prescricao ? styles.rotate : ''}`} src={setaMenu} alt="" />
                        </Link>
                        <div className={`${styles.subMenu} ${subMenuOpen.prescricao ? styles.show : ''}`}>
                            <ul className={styles.subPrescricao}>
                                <li className={styles.li}><Link className={styles.a} href="/prescricao/listaPrescricao">Prescrever</Link></li>
                                <li className={styles.li}><Link className={styles.a} href="/prescricao/historyPrescricao">Histórico</Link></li>
                            </ul>
                        </div>
                    </li>
                    
                    <li className={styles.li}>
                        <Link className={styles.a} href="/paciente/ListaPaciente">Paciente</Link>
                    </li>

                    <li className={styles.li}>
                        <Link className={styles.a} href="/contato">contato</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} onClick={removeToken} href="/">Sair</Link>
                    </li>
                </ul>
            </div>
        </>
    }
      
    </>
  );
};

export default NavBar;
