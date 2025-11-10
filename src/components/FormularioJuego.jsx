import { useState } from "react";

export default function FormularioJuego({ despuesDeGuardar }) {
  const [form, setForm] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    horasJugadas: 0,
    puntuacion: 0,
    imagenPortada: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:4000/api/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({
        titulo: "",
        plataforma: "",
        genero: "",
        horasJugadas: 0,
        puntuacion: 0,
        imagenPortada: "",
      });

      despuesDeGuardar?.();
    } catch (error) {
      console.error("Error al crear juego", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
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
      <button type="submit">Guardar</button>
    </form>
  );
}

