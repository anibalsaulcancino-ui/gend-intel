"use client";

import { useState, useEffect } from "react";

interface Noticia {
  id: number;
  region: string;
  provincia: string;
  dimension: string;
  titulo: string;
  resumen: string;
  fecha: string;
  ubicacion: string;
  url: string;
  imagenUrl?: string;
}

export default function Home() {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  const [vistaActiva, setVistaActiva] = useState<"feed" | "carga">("feed");
  const [filtroRegion, setFiltroRegion] = useState<string>("Todas");
  const [filtroDimension, setFiltroDimension] = useState<string>("Todas");
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null);

  const [formTitulo, setFormTitulo] = useState<string>("");
  const [formUrl, setFormUrl] = useState<string>("");
  const [formEtiqueta, setFormEtiqueta] = useState<string>("Información General");

  const [noticias, setNoticias] = useState<Noticia[]>([]);

  // Reloj Oficial Argentina GMT-3
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Argentina/Buenos_Aires",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentDateTime(new Intl.DateTimeFormat("es-AR", options).format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefreshFeed = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/noticias");
      if (res.ok) {
        const noticiasApi: Noticia[] = await res.json();
        
        const noticiasGuardadasLocales = localStorage.getItem("enfoque360_noticias_usuario");
        let listaUsuario: Noticia[] = [];

        if (noticiasGuardadasLocales) {
          const todasGuardadas: Noticia[] = JSON.parse(noticiasGuardadasLocales);
          const ahora = Date.now();
          const cincoDiasMs = 5 * 24 * 60 * 60 * 1000;

          listaUsuario = todasGuardadas.filter((n) => {
            if (n.id > 1000) {
              return (ahora - n.id) < cincoDiasMs;
            }
            return true;
          });

          localStorage.setItem("enfoque360_noticias_usuario", JSON.stringify(listaUsuario));
        }

        const idsExistentes = new Set(listaUsuario.map(n => n.id));
        const nuevasDeApi = noticiasApi.filter(n => !idsExistentes.has(n.id));

        const combinadas = [...listaUsuario, ...nuevasDeApi];
        setNoticias(combinadas);
      }
    } catch (error) {
      console.error("Error al sincronizar noticias:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    handleRefreshFeed();
  }, []);

  useEffect(() => {
    if (noticias.length > 0) {
      const deUsuario = noticias.filter(n => n.id > 1000);
      localStorage.setItem("enfoque360_noticias_usuario", JSON.stringify(deUsuario));
    }
  }, [noticias]);

  const handleAbrirLectura = (item: Noticia) => {
    setNoticiaSeleccionada(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEliminarNoticia = (idAEliminar: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (noticiaSeleccionada?.id === idAEliminar) {
      setNoticiaSeleccionada(null);
    }
    const nuevaLista = noticias.filter((item) => item.id !== idAEliminar);
    setNoticias(nuevaLista);

    const deUsuario = nuevaLista.filter(n => n.id > 1000);
    localStorage.setItem("enfoque360_noticias_usuario", JSON.stringify(deUsuario));
  };

  const handleSubmitNoticiaRapida = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitulo) {
      alert("Por favor ingrese el título de la novedad.");
      return;
    }

    let fuenteAuto = "Carga Móvil";
    let urlFinal = "";

    if (formUrl.trim() !== "") {
      urlFinal = formUrl;
      try {
        const hostname = new URL(formUrl).hostname.replace("www.", "");
        fuenteAuto = hostname.split(".")[0].toUpperCase();
      } catch {
        fuenteAuto = "Fuente Web";
      }
    } else {
      urlFinal = `https://www.google.com/search?q=${encodeURIComponent(formTitulo)}`;
    }

    const tUp = formTitulo.toUpperCase();
    const timestampUnico = Date.now();
    const etiquetaFinal = formEtiqueta.trim() !== "" ? formEtiqueta.toUpperCase() : "INFORMACIÓN GENERAL";
    
    let imagenDinamica = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80";
    
    if (tUp.includes("CORTE") || tUp.includes("TRANSITO") || tUp.includes("CALZADA") || tUp.includes("PUENTE") || tUp.includes("PIQUETE")) {
      imagenDinamica = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80";
    } else if (tUp.includes("DROGA") || tUp.includes("COCAINA") || tUp.includes("MARIHUANA") || tUp.includes("ALLANAMIENTO") || tUp.includes("SECUESTRO")) {
      imagenDinamica = "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80";
    } else if (tUp.includes("RUSIA") || tUp.includes("GUERRA") || tUp.includes("CONFLICTO") || tUp.includes("ESTADOS UNIDOS")) {
      imagenDinamica = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80";
    } else if (tUp.includes("REUNION") || tUp.includes("CONVENIO") || tUp.includes("FRONTERA") || tUp.includes("MINISTRO")) {
      imagenDinamica = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80";
    }

    const nuevaNoticia: Noticia = {
      id: timestampUnico,
      region: "Monitoreo Territorial",
      provincia: "Jurisdicción General",
      dimension: etiquetaFinal,
      titulo: tUp,
      resumen: `SÍNTESIS OPERATIVA: Reporte ingresado rápidamente desde dispositivo móvil (${fuenteAuto}) para evaluación de guardia y control de fuentes abiertas. (Vigencia: 5 días).`,
      fecha: new Date().toISOString().split("T")[0],
      ubicacion: fuenteAuto,
      url: urlFinal,
      imagenUrl: imagenDinamica,
    };

    const listaActualizada = [nuevaNoticia, ...noticias];
    setNoticias(listaActualizada);

    const deUsuario = listaActualizada.filter(n => n.id > 1000);
    localStorage.setItem("enfoque360_noticias_usuario", JSON.stringify(deUsuario));

    setFormTitulo("");
    setFormUrl("");
    setFormEtiqueta("Información General");
    setVistaActiva("feed");
  };

  const noticiasFiltradas = noticias.filter((item) => {
    const cumpleRegion = filtroRegion === "Todas" || item.region.includes(filtroRegion) || item.provincia.includes(filtroRegion);
    const cumpleDimension = filtroDimension === "Todas" || item.dimension === filtroDimension;
    return cumpleRegion && cumpleDimension;
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans pb-12">
      <header className="bg-[#0b291a] text-white p-3 sm:p-4 shadow-md sticky top-0 z-50 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-2">
          <div>
            <span className="bg-emerald-600 text-[10px] sm:text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wide">
              Monitoreo 24/7 • Explotación OSINT
            </span>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight mt-0.5">
              ENFOQUE 360
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setVistaActiva(vistaActiva === "carga" ? "feed" : "carga");
                setNoticiaSeleccionada(null);
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-md transition-colors shadow-sm"
            >
              {vistaActiva === "carga" ? "📋 Ver Feed" : "⚡ Carga Rápida"}
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-1 flex justify-end items-center text-[11px] text-emerald-300 font-mono">
          <span>📅 {currentDateTime || "Sincronizando..."}</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-3 sm:p-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-72 flex-shrink-0 bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-fit space-y-4">
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Dimensiones Informativas
            </h2>
            <nav className="flex flex-col gap-1.5 text-xs font-medium">
              <button
                onClick={() => setFiltroDimension("Todas")}
                className={`p-2 rounded text-left transition-colors border ${
                  filtroDimension === "Todas" ? "bg-emerald-800 text-white font-bold" : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                🌐 Todas las Dimensiones
              </button>
              <button
                onClick={() => setFiltroDimension("Alteración del Orden Público")}
                className={`p-2 rounded text-left transition-colors border ${
                  filtroDimension === "Alteración del Orden Público" ? "bg-red-700 text-white font-bold" : "bg-red-50 hover:bg-red-100 text-red-900 border-red-200"
                }`}
              >
                🚨 Alteración Orden Público / Protestas
              </button>
              <button
                onClick={() => setFiltroDimension("Narcotráfico y Droga")}
                className={`p-2 rounded text-left transition-colors border ${
                  filtroDimension === "Narcotráfico y Droga" ? "bg-amber-700 text-white font-bold" : "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200"
                }`}
              >
                🍃 Narcotráfico y Droga
              </button>
              <button
                onClick={() => setFiltroDimension("Organismos y Enlaces Externos")}
                className={`p-2 rounded text-left transition-colors border ${
                  filtroDimension === "Organismos y Enlaces Externos" ? "bg-blue-800 text-white font-bold" : "bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200"
                }`}
              >
                🔍 Organismos / Internacional / Rusia / EE.UU.
              </button>
            </nav>
          </div>

          <hr className="border-gray-200 hidden md:block" />

          <div className="hidden md:block">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Estructura Territorial (5 Regiones)
            </h2>
            <nav className="flex flex-col gap-1 text-xs font-medium text-gray-700">
              <button
                onClick={() => { setFiltroRegion("Todas"); setVistaActiva("feed"); setNoticiaSeleccionada(null); }}
                className="p-1.5 hover:bg-gray-50 rounded text-left truncate font-bold text-emerald-800"
              >
                🌐 Todas las Regiones
              </button>
              <button
                onClick={() => { setFiltroRegion("Región NOA"); setVistaActiva("feed"); setNoticiaSeleccionada(null); }}
                className="p-1.5 hover:bg-gray-50 rounded text-left truncate"
              >
                📍 Región NOA
              </button>
              <button
                onClick={() => { setFiltroRegion("Región NEA"); setVistaActiva("feed"); setNoticiaSeleccionada(null); }}
                className="p-1.5 hover:bg-gray-50 rounded text-left truncate"
              >
                📍 Región NEA
              </button>
              <button
                onClick={() => { setFiltroRegion("Región Centro"); setVistaActiva("feed"); setNoticiaSeleccionada(null); }}
                className="p-1.5 hover:bg-gray-50 rounded text-left truncate"
              >
                📍 Región Centro (AMBA)
              </button>
              <button
                onClick={() => { setFiltroRegion("Región Cuyo"); setVistaActiva("feed"); setNoticiaSeleccionada(null); }}
                className="p-1.5 hover:bg-gray-50 rounded text-left truncate"
              >
                📍 Región Cuyo
              </button>
              <button
                onClick={() => { setFiltroRegion("Región Patagonia"); setVistaActiva("feed"); setNoticiaSeleccionada(null); }}
                className="p-1.5 hover:bg-gray-50 rounded text-left truncate"
              >
                📍 Región Patagonia
              </button>
              <button
                onClick={() => { setFiltroRegion("Módulo Internacional"); setVistaActiva("feed"); setNoticiaSeleccionada(null); }}
                className="p-1.5 text-blue-800 font-semibold hover:bg-blue-50 rounded text-left truncate"
              >
                🌐 Módulo Internacional
              </button>
            </nav>
          </div>
        </aside>

        {/* Sección Principal */}
        <section className="flex-1 min-w-0 bg-white p-3 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          {vistaActiva === "feed" ? (
            <div>
              {noticiaSeleccionada ? (
                /* VISTA DE LECTURA AMPLIADA */
                <article className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b pb-3 mb-4">
                    <button
                      onClick={() => setNoticiaSeleccionada(null)}
                      className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-md border border-emerald-200 transition-colors"
                    >
                      ← Volver al Feed General
                    </button>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-gray-100 text-gray-800 border border-gray-300">
                      {noticiaSeleccionada.dimension}
                    </span>
                  </div>

                  <header className="mb-4">
                    <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-tight mb-2">
                      {noticiaSeleccionada.titulo}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
                      <span>📍 {noticiaSeleccionada.region} ({noticiaSeleccionada.provincia})</span>
                      <span>•</span>
                      <span>📅 Fecha: {noticiaSeleccionada.fecha}</span>
                      <span>•</span>
                      <span>🌐 Ubicación / Fuente: <strong className="text-gray-700">{noticiaSeleccionada.ubicacion}</strong></span>
                    </div>
                  </header>

                  <div className="w-full h-56 sm:h-80 rounded-lg overflow-hidden bg-gray-100 mb-4 border border-gray-200 shadow-inner">
                    <img
                      src={noticiaSeleccionada.imagenUrl || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"}
                      alt={noticiaSeleccionada.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="bg-emerald-50/50 p-4 sm:p-5 rounded-lg border border-emerald-200 mb-6 space-y-2">
                    <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      📄 Minuta Informativa y Resumen Ampliado:
                    </h3>
                    <p className="text-sm text-gray-800 leading-relaxed font-normal">
                      {noticiaSeleccionada.resumen}
                    </p>
                  </div>

                  <footer className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-gray-500 text-center sm:text-left">
                      Redirección directa al canal de origen o consulta oficial:
                    </span>
                    {noticiaSeleccionada.url ? (
                      <a
                        href={noticiaSeleccionada.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto text-center bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        🔗 Ver Noticia en la Web Oficial →
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Sin enlace directo disponible</span>
                    )}
                  </footer>
                </article>
              ) : (
                /* FEED PRINCIPAL */
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 mb-4">
                    <div>
                      <h2 className="text-base sm:text-xl font-bold text-gray-800">
                        📊 MONITOR TÁCTICO DE FUENTES ABIERTAS (OSINT)
                      </h2>
                      <p className="text-xs text-gray-500">
                        Mostrando {noticiasFiltradas.length} registros analizados (Persistencia de 5 días activa)
                      </p>
                    </div>

                    <button
                      onClick={handleRefreshFeed}
                      disabled={isRefreshing}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-1.5"
                    >
                      {isRefreshing ? "🔄 Sincronizando..." : "🔄 Sincronizar OSINT"}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {noticiasFiltradas.length > 0 ? (
                      noticiasFiltradas.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleAbrirLectura(item)}
                          className="border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row gap-3 hover:shadow-md transition-all cursor-pointer relative bg-gray-50 border-gray-200 items-center"
                        >
                          <div className="w-full sm:w-44 h-28 flex-shrink-0 rounded-md overflow-hidden bg-gray-200 shadow-sm border border-gray-300">
                            <img
                              src={item.imagenUrl || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"}
                              alt={item.titulo}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded truncate max-w-[220px] bg-gray-200 text-gray-800">
                                  {item.dimension}
                                </span>
                                <button
                                  onClick={(e) => handleEliminarNoticia(item.id, e)}
                                  title="Descartar noticia"
                                  className="text-gray-400 hover:text-red-600 p-1 rounded text-xs font-bold"
                                >
                                  ❌
                                </button>
                              </div>
                              <h3 className="font-bold text-xs sm:text-base text-gray-900 leading-snug hover:text-emerald-700 transition-colors">
                                {item.titulo}
                              </h3>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                {item.resumen}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-gray-500">
                              <span className="truncate">📍 Fuente: {item.ubicacion}</span>
                              <span className="text-emerald-700 font-bold hover:underline whitespace-nowrap ml-2">
                                📖 Ver Minuta Completa &rarr;
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 text-center py-8">
                        No hay registros disponibles para los filtros seleccionados.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* CARGA RÁPIDA MÓVIL */
            <div>
              <div className="border-b pb-3 mb-4">
                <h2 className="text-base sm:text-xl font-bold text-gray-800">
                  ⚡ CARGA RÁPIDA DESDE DISPOSITIVO MÓVIL
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Ingrese cualquier tipo de información u otro contenido. La fotografía profesional se asignará de forma inteligente según el tema.
                </p>
              </div>

              <form onSubmit={handleSubmitNoticiaRapida} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    1. Etiqueta / Tipo de Información (Opcional):
                  </label>
                  <input
                    type="text"
                    value={formEtiqueta}
                    onChange={(e) => setFormEtiqueta(e.target.value)}
                    placeholder="Ej: INFORMACIÓN GENERAL, OPERATIVO VIAL, INSTITUCIONAL..."
                    className="w-full p-3 border rounded-md text-sm font-medium bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Puedes escribir cualquier categoría o dejarla por defecto para agilizar la carga.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    2. Título de la Novedad:
                  </label>
                  <input
                    type="text"
                    placeholder="TÍTULO DE LA NOTICIA O HECHO..."
                    value={formTitulo}
                    onChange={(e) => setFormTitulo(e.target.value)}
                    required
                    className="w-full p-3 border rounded-md text-sm font-medium uppercase bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-700 uppercase mb-1">
                    3. Enlace Directo (URL - Opcional):
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.medio.com/noticia..."
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    className="w-full p-3 border rounded-md text-sm bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setVistaActiva("feed")}
                    className="px-4 py-2.5 bg-gray-200 text-gray-700 text-xs font-bold rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-md hover:bg-emerald-800 transition-colors shadow-sm"
                  >
                    ⚡ Registrar e Integrar al Feed
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
