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
import { useUser } from "../../../context/UserContext";

const ListaPrescricao = () => {
  const {setTipoUser, tipoUser } = useUser()
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [prescricoes, setPrescricoes] = useState([]);
  //const [selectedPrescricao, setSelectedPrescricao] = useState(null);
  const [novaPrescricao, setNovaPrescricao] = useState(false);
  
  const socketRef = useRef(null);
  
  const fetchPrescricao = () => {
    Axios.get("http://localhost:5008/homepage/lista/prescricao")
      .then((response) => {
        console.log(response.data);
        setPrescricoes(response.data);
        console.log(prescricoes)
      })
      .catch((error) => {
        console.error("Erro ao buscar prescrições:", error);
      });
  };
  const abreNovaPrescricao = () => {
    setNovaPrescricao(true);
  };
  const closePrescricao = () => {
    setNovaPrescricao(false);
  };
  useEffect(() => {
    fetchPrescricao();

    socketRef.current = io("http://localhost:5008");

    socketRef.current.on("message", (msg) => {
      setMessage(msg)
      setPrescricoes((prevPrescricoes) => {
        return [msg, ...prevPrescricoes]; 
      });

    });
    return () => {
      socketRef.current.off("message");
    };
  },[]);

  return (
    <Container>
      <div className={styles.lista}>
        
        <div className={styles.gridContainer}>
          { tipoUser === 'Medico'?
            <div className={styles.receita}>
                <Image onClick={abreNovaPrescricao} className={styles.image} title="Click para adicionar uma nova prescrição" src={imageAdicao} alt="Adicionar"/>
                {novaPrescricao && <RegistraPrescricao closePrescricao = {closePrescricao}/>}
            </div>:<></>
          }
          {prescricoes.map((prescricao) => (
              prescricao && prescricao.status ?(
                prescricao.status ==='Entregue'?<></>:<Card key={prescricao.prescricao_id} prescricao={prescricao} fetchPrescricao={fetchPrescricao} />
              
              ) :(<></>)
              /*prescricao.status ==='Entregue'?
               <></>:<>{prescricao.status}</>
              /*prescricao.status === 'Entregue'?<>{prescricao.status}</>:
              <Card key={prescricao.prescricao_id} prescricao={prescricao} fetchPrescricao={fetchPrescricao} />*/
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ListaPrescricao;
