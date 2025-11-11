import { useEffect, useState } from "react";

export default function FormularioJuego({ juegoEditando, despuesDeGuardar, cancelarEdicion }) {
  const [form, setForm] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    horasJugadas: 0,
    puntuacion: 0,
    imagenPortada: "",
  });

  // Cuando cambia el juego a editar, llenamos el formulario
  useEffect(() => {
    if (juegoEditando) {
      setForm({
        titulo: juegoEditando.titulo || "",
        plataforma: juegoEditando.plataforma || "",
        genero: juegoEditando.genero || "",
        horasJugadas: juegoEditando.horasJugadas || 0,
        puntuacion: juegoEditando.puntuacion || 0,
        imagenPortada: juegoEditando.imagenPortada || "",
      });
    } else {
      setForm({
        titulo: "",
        plataforma: "",
        genero: "",
        horasJugadas: 0,
        puntuacion: 0,
        imagenPortada: "",
      });
    }
  }, [juegoEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cuerpo = { ...form };
    const esEdicion = !!juegoEditando;

    const url = esEdicion
      ? `http://localhost:4000/api/juegos/${juegoEditando._id}`
      : "http://localhost:4000/api/juegos";

    const method = esEdicion ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
      });

      if (!esEdicion) {
        setForm({
          titulo: "",
          plataforma: "",
          genero: "",
          horasJugadas: 0,
          puntuacion: 0,
          imagenPortada: "",
        });
      }

      despuesDeGuardar?.();
    } catch (error) {
      console.error("Error al guardar juego", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
    >
      <input
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
      />
      <input
        name="plataforma"
        placeholder="Plataforma"
        value={form.plataforma}
        onChange={handleChange}
      />
      <input
        name="genero"
        placeholder="Género"
        value={form.genero}
        onChange={handleChange}
      />
      <input
        name="horasJugadas"
        type="number"
        placeholder="Horas jugadas"
        value={form.horasJugadas}
        onChange={handleChange}
      />
      <input
        name="puntuacion"
        type="number"
        min="0"
        max="5"
        placeholder="Puntuación"
        value={form.puntuacion}
        onChange={handleChange}
      />
      <input
        name="imagenPortada"
        placeholder="URL portada"
        value={form.imagenPortada}
        onChange={handleChange}
      />
      <button type="submit">
        {juegoEditando ? "Guardar cambios" : "Guardar"}
      </button>
      {juegoEditando && (
        <button type="button" onClick={cancelarEdicion}>
          Cancelar
        </button>
      )}
    </form>
  );
}
