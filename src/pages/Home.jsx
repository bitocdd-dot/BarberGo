import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export default function Home() {
  const [barbeiros, setBarbeiros] = useState([]);

  useEffect(() => {
    const fetchBarbeiros = async () => {
      const { data, error } = await supabase
        .from('barbers')
        .select(`
          *,
          ratingfrombarbers(rating_from_barbers),
          services(nome_servico)
        `);
      if (error) return console.error(error);
      setBarbeiros(data);
    };

    fetchBarbeiros();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Barbeiros</h2>
      {barbeiros.map(b => (
        <div key={b.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
          <strong>{b.nome}</strong> - {b.telefone} <br />
          Endereço: {b.endereco} <br />
          Avaliação: {b.ratingfrombarbers?.[0]?.rating_from_barbers || 'Sem avaliação'} <br />
          Serviços: {b.services?.map(s => s.nome_servico).join(', ') || 'Sem serviços'}
        </div>
      ))}
    </div>
  );
}
