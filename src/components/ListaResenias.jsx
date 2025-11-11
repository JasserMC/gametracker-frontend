export default function ListaReseñas({ reseñas }) {
  if (!reseñas || reseñas.length === 0) {
    return <p>No hay reseñas aún. ¡Sé el primero en opinar!</p>;
  }

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <h4>Reseñas</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {reseñas.map((r) => (
          <li
            key={r._id}
            style={{
              border: "1px solid #444",
              borderRadius: "6px",
              padding: "0.5rem",
              marginBottom: "0.4rem",
              background: "#252525",
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold" }}>
              {r.autor || "Anónimo"} – {r.puntuacion}⭐
            </p>
            <p style={{ margin: "0.2rem 0 0 0" }}>{r.texto}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
