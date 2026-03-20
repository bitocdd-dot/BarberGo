import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../services/supabase';
import '../index.css';

export default function Mapa() {
  const [barbeiros, setBarbeiros] = useState([]);

  useEffect(() => {
    async function fetchBarbeiros() {
      const { data, error } = await supabase.from('barbers').select('*');
      if (error) console.log(error);
      else setBarbeiros(data);
    }
    fetchBarbeiros();
  }, []);

  return (
    <div className="mapa-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }}>
      <h1>Mapa de Barbeiros</h1>
      <MapContainer center={[-22.9, -43.2]} zoom={12} style={{ height: '500px', width: '90%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {barbeiros.map(b => (
          <Marker key={b.id} position={[b.lat, b.lng]}>
            <Popup>{b.nome}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
