import { useState } from "react";
import TarjetaJuego from "./TarjetaJuego";
import FormularioJuego from "./FormularioJuego";

export default function BibliotecaJuegos({ juegos, recargar }) {
  const [juegoEditando, setJuegoEditando] = useState(null);

  const empezarEdicion = (juego) => {
    setJuegoEditando(juego);
  };

  const limpiarEdicion = () => {
    setJuegoEditando(null);
  };

  return (
    <div>
      <h2>Mi biblioteca</h2>
      <FormularioJuego
        juegoEditando={juegoEditando}
        despuesDeGuardar={() => {
          recargar();
          limpiarEdicion();
        }}
        cancelarEdicion={limpiarEdicion}
      />
      <div
        style={{
          display: "grid",
          gap: "1rem",
          marginTop: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {juegos.map((juego) => (
          <TarjetaJuego
            key={juego._id}
            juego={juego}
            recargar={recargar}
            onEditar={empezarEdicion}
          />
        ))}
      </div>
    </div>
  );
}
