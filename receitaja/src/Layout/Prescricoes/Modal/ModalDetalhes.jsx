import React from 'react';
import './ModalDetalhes.css';

const ModalDetalhes = ({ data, onClose, onDelete, onUpdate }) => {
  if (!data) return null;

  return (
    <div className="modal-overlay">
      <div className="box-modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Detalhes da Prescrição</h2>
        <p><strong>Funcionário:</strong> {data.funcionario_nome}</p>
        <p><strong>Paciente:</strong> {data.paciente_nome}</p>
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>Data:</strong> {data.data_prescricao}</p>
        <h3>Medicamentos</h3>
        {data.medicamentos.map((med, index) => (
          <div key={index} className="medicamento-item">
            <p><strong>Nome:</strong> {med.nome} <strong>Quantidade:</strong> {med.quantidade}</p>
            <p><strong>Forma de usar:</strong> {med.forma_de_usar}</p>
          </div>
        ))}
        <div className="btn-group">
          <button className="btn btn-outline-secondary" onClick={onDelete}>Apagar</button>
          <button className="btn btn-outline-primary" onClick={onUpdate}>Alterar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalhes;
