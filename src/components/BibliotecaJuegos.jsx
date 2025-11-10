import TarjetaJuego from "./TarjetaJuego";
import FormularioJuego from "./FormularioJuego";

export default function BibliotecaJuegos({ juegos, recargar }) {
  return (
    <div>
      <h2>Mi biblioteca</h2>
      <FormularioJuego despuesDeGuardar={recargar} />
      <div
        style={{
          display: "grid",
          gap: "1rem",
          marginTop: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {juegos.map((juego) => (
          <TarjetaJuego key={juego._id} juego={juego} recargar={recargar} />
        ))}
      </div>
    </div>
  );
}
