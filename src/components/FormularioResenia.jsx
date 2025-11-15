// src/components/FormularioResenia.jsx
import { useState } from "react";

export default function FormularioResenia({ juegoId, despuesDeGuardar }) {
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [puntuacion, setPuntuacion] = useState(5);
  const [enviando, setEnviando] = useState(false);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return alert("Escribe al menos un comentario 🙂");

    try {
      setEnviando(true);
      console.log("Enviando reseña a backend...", {
        juegoId,
        autor,
        texto,
        puntuacion,
      });

      const res = await fetch("http://localhost:4000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          juegoId,
          autor: autor || "Anónimo",
          texto,
          puntuacion: Number(puntuacion),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error en respuesta del backend:", errorText);
        alert("El backend devolvió un error al guardar la reseña");
        return;
      }

      const data = await res.json();
      console.log("Reseña guardada correctamente:", data);

      // limpiar formulario
      setTexto("");
      setAutor("");
      setPuntuacion(5);

      // recargar reseñas en la tarjeta
      despuesDeGuardar?.();
    } catch (error) {
      console.error("Error al guardar reseña", error);
      alert("Ocurrió un error al guardar la reseña");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={manejarSubmit}
      style={{
        marginTop: "0.5rem",
        borderTop: "1px solid #333",
        paddingTop: "0.5rem",
      }}
    >
      <h5>Agregar reseña</h5>

      <div style={{ marginBottom: "0.25rem" }}>
        <input
          type="text"
          placeholder="Tu nombre (opcional)"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          style={{ width: "100%", padding: "0.25rem" }}
        />
      </div>

      <div style={{ marginBottom: "0.25rem" }}>
        <textarea
          placeholder="¿Qué te pareció el juego?"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: "0.25rem", resize: "vertical" }}
        />
      </div>

      <div style={{ marginBottom: "0.25rem" }}>
        <label>
          Puntuación:
          <select
            value={puntuacion}
            onChange={(e) => setPuntuacion(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          ⭐
        </label>
      </div>

      <button type="submit" disabled={enviando}>
        {enviando ? "Guardando..." : "Guardar reseña"}
      </button>
    </form>
  );
}
