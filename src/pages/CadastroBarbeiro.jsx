import React, { useState } from 'react';
import { supabase } from '../services/supabase';

export default function CadastroBarbeiro() {
  const [nome, setNome] = useState('');       // Nome do barbeiro
  const [telefone, setTelefone] = useState(''); // Telefone
  const [endereco, setEndereco] = useState(''); // Endereço
  const [rating, setRating] = useState(5);      // Avaliação inicial padrão 5
  const [servicos, setServicos] = useState(['Corte', 'Barba']); // Serviços oferecidos

  const handleCadastro = async () => {
    // 1️⃣ Cadastrar barbeiro na tabela "barbers"
    const { data: barberData, error: barberError } = await supabase
      .from('barbers')
      .insert([{ nome, telefone, endereco }]);

    if (barberError) return alert('Erro ao cadastrar barbeiro: ' + barberError.message);

    const barberId = barberData[0].id; // Pega o ID gerado pelo Supabase

    // 2️⃣ Cadastrar avaliação na tabela "ratingfrombarbers"
    const numericRating = parseFloat(rating) || 5;
    const { error: ratingError } = await supabase
      .from('ratingfrombarbers')
      .insert([{ barber_id: barberId, rating_from_barbers: numericRating }]);

    if (ratingError) return alert('Erro ao cadastrar rating: ' + ratingError.message);

    // 3️⃣ Cadastrar serviços na tabela "services"
    const { error: servError } = await supabase
      .from('services')
      .insert(servicos.map(serv => ({ barber_id: barberId, nome_servico: serv })));

    if (servError) return alert('Erro ao cadastrar serviços: ' + servError.message);

    alert('Barbeiro cadastrado com sucesso!');

    // Limpar campos
    setNome('');
    setTelefone('');
    setEndereco('');
    setRating(5);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cadastro de Barbeiro</h2>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
      <input placeholder="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} />
      <input type="number" placeholder="Avaliação (Rating)" value={rating} onChange={e => setRating(e.target.value)} />
      <button onClick={handleCadastro}>Cadastrar Barbeiro</button>
    </div>
  );
}
