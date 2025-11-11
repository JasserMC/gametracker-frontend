import { useState } from "react";

export default function FormularioReseña({ juegoId, despuesDeGuardar }) {
  const [form, setForm] = useState({
    autor: "",
    puntuacion: 0,
    texto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.texto || !form.puntuacion) {
      alert("Escribe un texto y una puntuación.");
      return;
    }

    try {
      await fetch("http://localhost:4000/api/reseñas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          juegoId, // se relaciona la reseña con el juego
        }),
      });

      setForm({
        autor: "",
        puntuacion: 0,
        texto: "",
      });

      despuesDeGuardar?.();
    } catch (error) {
      console.error("Error al crear reseña", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
      }}
    >
      <h4>Escribir reseña</h4>
      <input
        name="autor"
        placeholder="Tu nombre (opcional)"
        value={form.autor}
        onChange={handleChange}
      />
      <input
        name="puntuacion"
        type="number"
        min="0"
        max="5"
        placeholder="Puntuación (0 a 5)"
        value={form.puntuacion}
        onChange={handleChange}
      />
      <textarea
        name="texto"
        placeholder="Escribe tu opinión del juego"
        value={form.texto}
        onChange={handleChange}
        rows={3}
      />
      <button type="submit">Guardar reseña</button>
    </form>
  );
}
