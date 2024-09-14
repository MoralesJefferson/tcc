import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/404.module.css"

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para a página de login após 3 segundos
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    // Limpar o timer se o componente for desmontado
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.backError}>
      <div className={styles.pError}>
        <h1>404 - Página Não Encontrada</h1>
        <p>Redirecionando para a página de login...</p>
      </div>
    </div>
  );
};

export default Custom404;