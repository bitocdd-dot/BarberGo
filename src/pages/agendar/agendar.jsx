import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useSearchParams } from "react-router-dom";
import "./agendar.css";

export default function Agendar() {
  const [params] = useSearchParams();
  const barberId = params.get("barber_id");

  const [barber, setBarber] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");

  const availableHours = [
    "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00",
    "18:00"
  ];

  useEffect(() => {
    loadBarber();
    loadServices();
  }, []);

  async function loadBarber() {
    const { data } = await supabase
      .from("barbers")
      .select("*")
      .eq("id", barberId)
      .single();
    setBarber(data);
  }

  async function loadServices() {
    const { data } = await supabase.from("services").select("*");
    setServices(data);
  }

  async function confirmarAgendamento() {
    if (!selectedService || !selectedDate || !selectedHour) {
      alert("Selecione serviço, data e horário");
      return;
    }

    const horarioCompleto = selectedDate + " " + selectedHour + ":00";

    const { error } = await supabase.from("appointments").insert({
      client_id: 1, // depois vamos puxar do login
      barber_id: barberId,
      service_id: selectedService,
      scheduled_at: horarioCompleto,
      status: "scheduled"
    });

    if (error) {
      console.log(error);
      alert("Erro ao criar agendamento");
      return;
    }

    alert("Agendado com sucesso!");
  }

  if (!barber) return <div className="loading">Carregando...</div>;

  return (
    <div className="agendar-container">
      <h2>Agendar com {barber.name}</h2>

      <h3>Escolha o serviço</h3>
      <div className="service-list">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={
              selectedService == service.id
                ? "service-box selected"
                : "service-box"
            }
          >
            <p>{service.name}</p>
            <strong>R$ {service.price}</strong>
          </div>
        ))}
      </div>

      <h3>Escolha a data</h3>
      <input
        type="date"
        className="data-input"
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <h3>Escolha o horário</h3>
      <div className="hours-list">
        {availableHours.map((hour) => (
          <button
            key={hour}
            className={
              selectedHour === hour ? "hour-btn selected" : "hour-btn"
            }
            onClick={() => setSelectedHour(hour)}
          >
            {hour}
          </button>
        ))}
      </div>

      <button className="btn-confirmar" onClick={confirmarAgendamento}>
        Confirmar Agendamento
      </button>
    </div>
  );
}
