import { useRouter } from "next/router";
import useAuth from "../../../components/hooks/UseAuth";
import Container from "../../../components/layout/container/Container";
import styles from "../../styles/ListaPrescricao.module.css";
import Card from "../../../components/layout/card/Card";
import Image from "next/image";
import imageAdicao from "../../../public/image/adicao.png";
import Link from "next/link";
import { useState,useEffect,useRef } from "react";
import Axios from "axios";
import { io, Socket } from "socket.io-client";
import RegistraPrescricao from "../../../components/layout/registra/RegistraPrescricao";
const ListaPrescricao = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [prescricoes, setPrescricoes] = useState([]);
  const [selectedPrescricao, setSelectedPrescricao] = useState(null);
  const [componentRegitra, setComponentRegitra] = useState(false);
  const socketRef = useRef(null);
  const fetchPrescricao = () => {
    Axios.get("http://localhost:5008/homepage/lista/prescricao")
      .then((response) => {
        console.log(response.data);
        setPrescricoes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar prescrições:", error);
      });
  };
  const abreNovaPrescricao = () => {
    setComponentRegitra(true);
  };
  const fechaNovaPrescricao = () => {
    setComponentRegitra(false);
  };
  useEffect(() => {
    fetchPrescricao();
    socketRef.current = io("http://localhost:5008");

    // Ouvir por mensagens do servidor
    socketRef.current.on("message", (msg) => {
      console.log(msg.name);
      setMessage(msg);
    });
    return () => {
      socketRef.current.off("message");
    };
  }, []);

  return (
    <Container>
      <div className={styles.lista}>
        
        <div className={styles.gridContainer}>
          <div className={styles.receita}>
            

            <Image
              onClick={abreNovaPrescricao}
              className={styles.image}
              title="Click para adicionar uma nova prescrição"
              src={imageAdicao}
              alt="Adicionar"
            />
            {componentRegitra && <RegistraPrescricao />}
          </div>
          {prescricoes.map((prescricao) => (
            <Card key={prescricao.prescricao_id} id={prescricao.prescricao_id} prescricao={prescricao} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ListaPrescricao;
