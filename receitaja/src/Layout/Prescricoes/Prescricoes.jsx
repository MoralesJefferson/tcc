import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ModalDetalhes from './Modal/ModalDetalhes';
import "./Prescricoes.css"

const Prescricoes = () => {
  const [data, setData] = useState([]);
  const [selectedPrescricao, setSelectedPrescricao] = useState(null);

  const fetchPrescricao = () => {
    Axios.get('http://localhost:5008/homepage/lista/prescricao')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar prescrições:', error);
      });
  };

  const handleDelete = (prescricao) => {
    // Lógica para apagar a prescrição
    console.log('Apagar prescrição:', prescricao);
    setSelectedPrescricao(null);
  };

  const handleUpdate = (prescricao) => {
    // Lógica para alterar a prescrição
    console.log('Alterar prescrição:', prescricao);
    setSelectedPrescricao(null);
  };

  useEffect(() => {
    fetchPrescricao();
  }, []);

  return (
    <div className="container boxGrid">
      <div className="row">
        {data.map((item, index) => (
          <div className="col-md-3" key={index}>
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title text-center">{item.funcionario_nome}</h5>
                <p className="card-text">Paciente: {item.paciente_nome}</p>
                <p className="card-text">Status: {item.status}</p>
                <p className="card-text">Data: {item.data_prescricao}</p>
                <button className="btn btn-outline-success d-flex justify-content-center align-items-center" onClick={() => setSelectedPrescricao(item)}>Detalhes</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedPrescricao && (
        <ModalDetalhes
          data={selectedPrescricao}
          onClose={() => setSelectedPrescricao(null)}
          onDelete={() => handleDelete(selectedPrescricao)}
          onUpdate={() => handleUpdate(selectedPrescricao)}
        />
      )}
    </div>
  );
}

export default Prescricoes;
