import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import "./confirmarAgendamento.css";
import { useParams, useNavigate } from "react-router-dom";

export default function ConfirmarAgendamento() {
  const { barberId, serviceId } = useParams();
  const navigate = useNavigate();

  const [barber, setBarber] = useState(null);
  const [service, setService] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    loadBarber();
    loadService();
  }, []);

  const loadBarber = async () => {
    const { data, error } = await supabase
      .from("barbers")
      .select("*")
      .eq("id", barberId)
      .single();

    if (!error) setBarber(data);
  };

  const loadService = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .single();

    if (!error) setService(data);
  };

  const createAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Escolha a data e o horário!");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const finalDate = `${selectedDate}T${selectedTime}:00`;

    const { data, error } = await supabase.from("appointments").insert([
      {
        client_id: currentUser?.id,
        barber_id: barberId,
        service_id: serviceId,
        scheduled_at: finalDate,
        status: "scheduled",
      },
    ]);

    if (!error) {
      alert("Agendamento realizado!");
      navigate("/home");
    }
  };

  return (
    <div className="confirm-page">
      <h2>Confirmar Agendamento</h2>

      {barber && service && (
        <div className="confirm-card">
          <div className="confirm-barber-info">
            <img
              src={barber.profile_image || "https://via.placeholder.com/150"}
              className="confirm-img"
              alt="Barbeiro"
            />

            <div className="confirm-barber-text">
              <h3>{barber.name}</h3>
              <p className="confirm-service">{service.name}</p>
              <p className="confirm-price">R$ {service.price}</p>
            </div>
          </div>

          <div className="confirm-section">
            <label>Escolha a data:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="confirm-section">
            <label>Escolha o horário:</label>

            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
            </select>
          </div>

          <button className="confirm-btn" onClick={createAppointment}>
            Confirmar Agendamento
          </button>
        </div>
      )}
    </div>
  );
}
