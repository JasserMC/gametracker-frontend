export default function EstadisticasPersonales({ juegos }) {
  const total = juegos.length;
  const completados = juegos.filter((j) => j.completado).length;
  const promedio =
    total === 0
      ? 0
      : (
          juegos.reduce((acc, j) => acc + (j.puntuacion || 0), 0) / total
        ).toFixed(1);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2>Estadísticas personales</h2>
      <p>Total de juegos: {total}</p>
      <p>Completados: {completados}</p>
      <p>Puntuación promedio: {promedio}</p>
    </div>
  );
}
