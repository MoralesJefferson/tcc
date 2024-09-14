import styles from "../../../src/styles/Footer.module.css"
const Footer = ({statusFot}) => {
    return (
        <footer className={`${styles.Footer} ${styles[statusFot]}`}>
            <p> RECEITA JÁ &copy; 2024</p>
        </footer>
    );
}

export default Footer;