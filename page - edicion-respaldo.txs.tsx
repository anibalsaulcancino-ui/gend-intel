"use client";

import { useState, useEffect } from "react";

type Registro = {
  id: number;
  titulo: string;
  categoria: string;
  fecha: string;
  descripcion: string;
};

export default function Home() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [montado, setMontado] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("General");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Cargar registros e inicializar fecha al montar en el navegador
  useEffect(() => {
    setMontado(true);
    setFecha(new Date().toISOString().slice(0, 10));

    try {
      const guardados = localStorage.getItem("gend-intel-registros");
      if (guardados) {
        setRegistros(JSON.parse(guardados));
      }
    } catch {
      console.error("Error al leer de localStorage");
    }
  }, []);

  // Guardar en localStorage cuando cambie la lista de registros
  useEffect(() => {
    if (montado) {
      localStorage.setItem("gend-intel-registros", JSON.stringify(registros));
    }
  }, [registros, montado]);

  function registrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!titulo.trim() || !descripcion.trim()) {
      setMensaje("Completá el título y la descripción.");
      return;
    }

    const nuevo: Registro = {
      id: Date.now(),
      titulo: titulo.trim(),
      categoria,
      fecha,
      descripcion: descripcion.trim(),
    };

    setRegistros((actuales) => [nuevo, ...actuales]);
    setTitulo("");
    setCategoria("General");
    setFecha(new Date().toISOString().slice(0, 10));
    setDescripcion("");
    setMensaje("Registro agregado correctamente.");
  }

  const resultados = registros.filter((registro) => {
    const texto = (
      registro.titulo +
      " " +
      registro.categoria +
      " " +
      registro.descripcion
    ).toLowerCase();

    return texto.includes(busqueda.toLowerCase());
  });

  function eliminar(id: number) {
    setRegistros((actuales) =>
      actuales.filter((registro) => registro.id !== id)
    );
    setMensaje("Registro eliminado.");
  }

  const campo = {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "11px",
    border: "1px solid #cbd5e1",
    borderRadius: "7px",
    marginTop: "6px",
    fontSize: "15px",
    background: "#ffffff",
    color: "#172033",
  };

  const boton = {
    padding: "11px 16px",
    border: "none",
    borderRadius: "7px",
    background: "#174c3a",
    color: "#ffffff",
    fontWeight: "bold" as const,
    cursor: "pointer",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        color: "#172033",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          background: "#12352b",
          color: "white",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "auto" }}>
          <h1 style={{ margin: 0, fontSize: "28px" }}>GEND-INTEL</h1>
          <p style={{ marginBottom: 0 }}>
            Sistema de registro de información
          </p>
        </div>
      </header>

      <section
        style={{
          maxWidth: "1000px",
          margin: "auto",
          padding: "24px",
        }}
      >
        <h2>Módulo de investigación</h2>
        <p style={{ color: "#475569" }}>
          Registrá y consultá información de prueba.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            alignItems: "start",
          }}
        >
          <section
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px #00000010",
            }}
          >
            <h3>Nuevo registro</h3>

            <form onSubmit={registrar}>
              <label htmlFor="titulo">Título</label>
              <input
                id="titulo"
                style={campo}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej.: Informe de prueba"
                required
              />

              <label
                htmlFor="categoria"
                style={{ display: "block", marginTop: "14px" }}
              >
                Categoría
              </label>
              <select
                id="categoria"
                style={campo}
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option>General</option>
                <option>Documentación</option>
                <option>Antecedentes</option>
                <option>Seguimiento</option>
                <option>Otro</option>
              </select>

              <label
                htmlFor="fecha"
                style={{ display: "block", marginTop: "14px" }}
              >
                Fecha
              </label>
              <input
                id="fecha"
                type="date"
                style={campo}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />

              <label
                htmlFor="descripcion"
                style={{ display: "block", marginTop: "14px" }}
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                style={{ ...campo, minHeight: "110px", resize: "vertical" }}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Escribí una descripción de prueba..."
                required
              />

              <button
                type="submit"
                style={{ ...boton, width: "100%", marginTop: "16px" }}
              >
                Guardar registro
              </button>
            </form>

            {mensaje && (
              <p role="status" style={{ color: "#174c3a" }}>
                {mensaje}
              </p>
            )}
          </section>

          <section
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px #00000010",
            }}
          >
            <h3>Registros cargados</h3>

            <label htmlFor="busqueda">Buscar por palabra</label>
            <input
              id="busqueda"
              style={campo}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar en los registros..."
            />

            <p style={{ color: "#475569", fontSize: "14px" }}>
              Resultados: {resultados.length}
            </p>

            {!montado ? (
              <p style={{ color: "#64748b" }}>Cargando registros...</p>
            ) : resultados.length === 0 ? (
              <p style={{ color: "#64748b" }}>
                Todavía no hay registros para mostrar.
              </p>
            ) : (
              <div>
                {resultados.map((registro) => (
                  <article
                    key={registro.id}
                    style={{
                      borderTop: "1px solid #e2e8f0",
                      padding: "14px 0",
                    }}
                  >
                    <h4 style={{ margin: "4px 0 8px" }}>
                      {registro.titulo}
                    </h4>
                    <p style={{ fontSize: "13px", color: "#64748b" }}>
                      {registro.categoria} · {registro.fecha}
                    </p>
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {registro.descripcion}
                    </p>
                    <button
                      type="button"
                      onClick={() => eliminar(registro.id)}
                      style={{
                        ...boton,
                        background: "#9f2929",
                        fontSize: "13px",
                      }}
                    >
                      Eliminar
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "24px" }}>
          Prototipo local de prueba. Los registros se guardan automáticamente en el navegador.
          No ingresar información real, personal ni reservada.
        </p>
      </section>
    </main>
  );
}