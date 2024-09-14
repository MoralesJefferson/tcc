import Link from "next/link";
import { useState } from "react";
import styles from "../../../src/styles/NavBar.module.css";
import setaMenu from "../../../public/angle-right.svg"

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
                        <Link className={styles.a} href="/">home</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href="/prescricao" onClick={(e) => { e.preventDefault(); toggleSubMenu('prescricao'); }}>   
                            Prescrição <Image className={`${styles.arrow} ${subMenuOpen.prescricao ? styles.rotate : ''}`} src={setaMenu} alt="" />
                        </Link>
                        <div className={`${styles.subMenu} ${subMenuOpen.prescricao ? styles.show : ''}`}>
                            <ul className={styles.subPrescricao}>
                                <li className={styles.li}><Link className={styles.a} href="#pre">Prescrever</Link></li>
                                <li className={styles.li}><Link className={styles.a} href="#edit">Editar</Link></li>
                                <li className={styles.li}><Link className={styles.a} href="#excl">Excluir</Link></li>
                                <li className={styles.li}><Link className={styles.a} href="/prescricao/listaPrescricao">Lista</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href="/sobre">sobre</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href="/vantagens" onClick={(e) => { e.preventDefault(); toggleSubMenu('vantagens'); }}>
                            Vantagens <Image className={`${styles.arrow} ${subMenuOpen.vantagens ? styles.rotate : ''}`} src={setaMenu} alt="" />
                        </Link>
                        <div className={`${styles.subMenu} ${subMenuOpen.vantagens ? styles.show : ''}`}>
                            <ul className={styles.subVantagens}>
                                <li className={styles.li}><Link className={styles.a} href="#benefit1">Benefício 1</Link></li>
                                <li className={styles.li}><Link className={styles.a} href="#benefit2">Benefício 2</Link></li>
                                <li className={styles.li}><Link className={styles.a} href="#benefit3">Benefício 3</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href="/contato">contato</Link>
                    </li>
                </ul>
            </div>
        </>
        /****************************************************************************************************************************************<>
            <nav className={styles.nav}>
                <button className={styles.btn} onClick={toggleSidebar}>
                    <p className={styles.icon}>{sidebarOpen ? '×' : '☰'}</p>
                </button>
                <h1>Receita já</h1>
                <span>je@gmail.com</span>
            </nav>
            <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
                <ul className={styles.ulP}>
                    <li className={styles.li}>
                        <a className={styles.a} href="/home">home</a>
                    </li>
                    <li className={styles.li}>
                        <a className={styles.a} href="/prescricao" onClick={(e) => { e.preventDefault(); toggleSubMenu('prescricao'); }}>
                            Prescrição <img className={`${styles.arrow} ${subMenuOpen.prescricao ? styles.rotate : ''}`} src="/angle-right.svg" alt="" />
                        </a>
                        {subMenuOpen.prescricao && (
                            <div className={styles.subMenu}>
                                <ul className={styles.subPrescricao}>
                                    <li className={styles.li}><a className={styles.a} href="#pre">Prescrever</a></li>
                                    <li className={styles.li}><a className={styles.a} href="#edit">Editar</a></li>
                                    <li className={styles.li}><a className={styles.a} href="#excl">Excluir</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li className={styles.li}>
                        <a className={styles.a} href="/sobre">sobre</a>
                    </li>
                    <li className={styles.li}>
                        <a className={styles.a} href="/vantagens" onClick={(e) => { e.preventDefault(); toggleSubMenu('vantagens'); }}>
                            Vantagens <img className={`${styles.arrow} ${subMenuOpen.vantagens ? styles.rotate : ''}`} src="/angle-right.svg" alt="" />
                        </a>
                        {subMenuOpen.vantagens && (
                            <div className={styles.subMenu}>
                                <ul className={styles.subVantagens}>
                                    <li className={styles.li}><a className={styles.a} href="#benefit1">Benefício 1</a></li>
                                    <li className={styles.li}><a className={styles.a} href="#benefit2">Benefício 2</a></li>
                                    <li className={styles.li}><a className={styles.a} href="#benefit3">Benefício 3</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li className={styles.li}>
                        <a className={styles.a} href="/contato">contato</a>
                    </li>
                </ul>
            </div>
        </>*/
        /*******************************************************************************************************************************************<>
        <nav className={`${styles[statusNav]}`}>
        <button className={styles.btn} onClick={menuNav}>&#9776;</button>
        <h1>Receita já</h1>
        <span>je@gmail.com</span>
    </nav>
    <div className={styles.sidebar}>
        <ul class={styles.ulPrincipal}>
            <li className={styles.opcao}>
                <a className={styles.link} href="home">home</a>
            </li>
            <li className={styles.opcao}>
                <a className={styles.link} href="Prescricao" onClick={subMenu}>Prescrição <Image className={styles.arrow} src={setaMenu} alt="subMenu"/></a>
                <div className={styles.subMenu}>
                    <ul class={styles.subPrescricao}>
                        <li className={styles.opcao}>
                            <a className={styles.link} href="#pre">Prescrever</a>
                        </li>
                        <li className={styles.opcao}>
                            <a className={styles.link} href="#edit">Editar</a>
                        </li>
                        <li className={styles.opcao}>
                            <a className={styles.link} href="#excl">Excluir</a>
                        </li>
                    </ul>
                </div>
            </li>
            <li className={styles.opcao}>
                <a className={styles.link} href="sobre">sobre</a>
            </li>
            <li className={styles.opcao}>
                <a className={styles.link} href="vantagens"  onclick="subMenu(event)">Vantagens <Image className={styles.arrow} src={setaMenu} alt="subMenu"/></a>
                <div className={styles.subMenu}>
                    <ul class="subVantagens">
                        <li className={styles.opcao}>
                            <a href="#benefit1">Benefício 1</a>
                        </li>
                        <li className={styles.opcao}>
                            <a href="#benefit2">Benefício 2</a>
                        </li>
                        <li className={styles.opcao}>
                            <a href="#benefit3">Benefício 3</a>
                        </li>
                    </ul>
                </div>
            </li>
            <li className={styles.opcao}>
                <a className={styles.link} href="contato">contato</a>
            </li>
        </ul>
    </div>
        </>*/
        
    }
      
    </>
  );
};

export default NavBar;
