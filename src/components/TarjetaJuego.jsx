export default function TarjetaJuego({ juego, recargar }) {
  const toggleCompletado = async () => {
    try {
      await fetch(`http://localhost:4000/api/juegos/${juego._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...juego, completado: !juego.completado }),
      });
      recargar?.();
    } catch (error) {
      console.error("Error al cambiar estado", error);
    }
  };

  const eliminar = async () => {
    if (!confirm("¿Seguro que quieres eliminar este juego?")) return;
    try {
      await fetch(`http://localhost:4000/api/juegos/${juego._id}`, {
        method: "DELETE",
      });
      recargar?.();
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: "8px",
        padding: "0.5rem",
        background: "#1e1e1e",
      }}
    >
      {juego.imagenPortada && (
        <img
          src={juego.imagenPortada}
          alt={juego.titulo}
          style={{ maxWidth: "100%", borderRadius: "6px" }}
        />
      )}
      <h4>{juego.titulo}</h4>
      <p>Plataforma: {juego.plataforma}</p>
      <p>Género: {juego.genero}</p>
      <p>Horas jugadas: {juego.horasJugadas}</p>
      <p>Puntuación: {juego.puntuacion} ⭐</p>
      <p>Estado: {juego.completado ? "Completado ✅" : "Pendiente ⏳"}</p>
      <button onClick={toggleCompletado}>
        Marcar como {juego.completado ? "pendiente" : "completado"}
      </button>
      <button onClick={eliminar} style={{ marginLeft: "0.5rem" }}>
        Eliminar
      </button>
    </div>
  );
}
