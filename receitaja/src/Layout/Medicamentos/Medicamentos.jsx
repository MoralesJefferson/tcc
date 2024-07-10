import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './Medicamento.css'

const Medicamentos = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [quantidadeInicial, setQuantidadeInicial] = useState('');
  const [farmaciaId, setFarmaciaId] = useState('');
  const [farmacias, setFarmacias] = useState([]);

  // Função para buscar as farmácias da API
  const fetchFarmacias = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5008/farmacia/lista/');
      setFarmacias(response.data);
    } catch (error) {
      console.error('Erro ao buscar farmácias:', error);
    }
  };

  useEffect(() => {
    fetchFarmacias();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novoMedicamento = {
      nome,
      descricao,
      fabricante,
      quantidadeInicial: parseInt(quantidadeInicial),
      farmaciaId: parseInt(farmaciaId),
    };

    console.log(novoMedicamento)

    try {
      const response = await axios.post('http://127.0.0.1:5008/medicamento/registro', novoMedicamento);
      console.log('Resposta da API:', response.data);

      setNome('');
      setDescricao('');
      setFabricante('');
      setQuantidadeInicial('');
      setFarmaciaId('');

    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <div className="medicamento_box  mt-5">
      <h2 className='d-flex justify-content-center align-items-center' >Cadastro de Medicamento</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNome">
          <Form.Label>Nome *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do medicamento"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Digite a descrição do medicamento"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFabricante">
          <Form.Label>Fabricante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o fabricante do medicamento"
            value={fabricante}
            onChange={(e) => setFabricante(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formQuantidadeInicial">
          <Form.Label>Quantidade Inicial *</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite a quantidade inicial"
            value={quantidadeInicial}
            onChange={(e) => setQuantidadeInicial(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFarmaciaId">
          <Form.Label>Selecione a Farmácia *</Form.Label>
          <Form.Control
            as="select"
            value={farmaciaId}
            onChange={(e) => setFarmaciaId(e.target.value)}
            required
          >
            <option value="">Selecione uma farmácia</option>
            {farmacias.map((farmacia) => (
              <option key={farmacia.farmacia_id} value={farmacia.farmacia_id}>
                {farmacia.nome}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="btn btn-success" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default Medicamentos;
