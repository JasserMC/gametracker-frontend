import { useEffect, useState } from "react";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import EstadisticasPersonales from "./components/EstadisticasPersonales";

function App() {
  const [juegos, setJuegos] = useState([]);

  const cargarJuegos = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/juegos");
      const data = await res.json();
      setJuegos(data);
    } catch (error) {
      console.error("Error al cargar juegos", error);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif", color: "#fff", background: "#121212", minHeight: "100vh" }}>
      <h1>GameTracker 🎮</h1>
      <EstadisticasPersonales juegos={juegos} />
      <BibliotecaJuegos juegos={juegos} recargar={cargarJuegos} />
    </div>
  );
}

export default App;
