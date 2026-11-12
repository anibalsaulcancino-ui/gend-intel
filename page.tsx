"use client";

import { useState, useEffect } from "react";

type NivelAlerta = "Informativo" | "Moderado" | "Alto" | "Crítico";

type Registro = {
  id: number;
  titulo: string;
  subtitulo?: string;
  puntosClave?: string;
  categoria: string;
  fecha: string;
  descripcion: string;
  fuente?: string;
  url?: string;
  ubicacion?: string;
  latitud?: number;
  longitud?: number;
  imagen?: string;
  alerta?: NivelAlerta;
};

type ItemRSS = {
  title: string;
  pubDate: string;
  link: string;
  description: string;
  author?: string;
  thumbnail?: string;
  enclosure?: { link?: string };
  fuenteNombre?: string;
};

const CATEGORIAS_OSINT = [
  "Inteligencia y seguridad",
  "Delitos transnacionales",
  "Fronteras y transporte",
  "Justicia y jurisprudencia",
  "Gobierno y política",
  "Geopolítica e internacional",
  "Ambiente y emergencias",
  "Intereses estratégicos",
  "Otro",
];

const NIVELES_ALERTA: NivelAlerta[] = ["Informativo", "Moderado", "Alto", "Crítico"];

const UBICACIONES_REFERENCIA = [
  { nombre: "Corrientes / Paraguay (Paso Ituzaingó)", lat: -27.5852, lng: -56.6853 },
  { nombre: "Puerto Iguazú (Paso Tancredo Neves)", lat: -25.5973, lng: -54.5781 },
  { nombre: "Vaca Muerta (Neuquén)", lat: -38.5411, lng: -68.7831 },
  { nombre: "La Quiaca, Jujuy", lat: -22.1023, lng: -65.5982 },
  { nombre: "Paso de los Libres, Corrientes", lat: -29.7161, lng: -57.0864 },
  { nombre: "Posadas, Misiones", lat: -27.3671, lng: -55.8961 },
  { nombre: "Bariloche, Río Negro", lat: -41.1335, lng: -71.3103 },
  { nombre: "Buenos Aires, CABA", lat: -34.6037, lng: -58.3816 },
];

const TEMAS_OSINT_SUGERIDOS = [
  "Drones",
  "Inteligencia Artificial",
  "Ciberterrorismo",
  "Triple Frontera",
  "Narcotráfico",
  "Contrabando",
  "Seguridad Fronteriza",
  "Hezbollah",
  "Vaca Muerta",
  "Movimiento Mapuche",
  "Resistencia Ancestral Mapuche",
  "Antifascistas",
  "LAVADO DE ACTIVOS",
];

const BANCO_IMAGENES = [
  "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80",
];

const NOTICIAS_SEMILLA: Registro[] = [
  {
    id: 101,
    titulo: "Detección de Vuelos de Drones No Autorizados en Zonas Operativas de Frontera",
    subtitulo: "Incursiones aéreas registradas en pasos estables de Jujuy y Salta",
    puntosClave: "• Drones no identificados en franja limítrofe.\n• Activación de sensores de radar táctico.\n• Refuerzo de puestos de control terrestre.",
    categoria: "Inteligencia y seguridad",
    fecha: "2026-10-19",
    descripcion: "Sistemas de vigilancia y radar de alerta temprana registraron incursiones aéreas no identificadas en franjas fronterizas limítrofes. Se intensifican los controles en pasos estratégicos y patrullajes de prevención coordinados.",
    fuente: "Monitor OSINT GEND-INTEL",
    ubicacion: "La Quiaca, Jujuy",
    latitud: -22.1023,
    longitud: -65.5982,
    imagen: BANCO_IMAGENES[0],
    alerta: "Alto",
  },
  {
    id: 102,
    titulo: "Refuerzo Operativo en Pasos Internacionales de la Triple Frontera",
    subtitulo: "Medidas coordinadas de fiscalización en confluencia fluvial",
    puntosClave: "• Inspección aduanera y migratoria.\n• Monitoreo de pasos no habilitados.\n• Enlace de datos de inteligencia abierta.",
    categoria: "Delitos transnacionales",
    fecha: "2026-10-19",
    descripcion: "Alertas de inteligencia abierta indican un incremento en los patrullajes e inspecciones de fiscalización aduanera en la confluencia entre Argentina, Brasil y Paraguay a fin de prevenir actividades de contrabando y tráfico ilícito.",
    fuente: "Fuentes Abiertas Regionales",
    ubicacion: "Puerto Iguazú (Misiones)",
    latitud: -25.5973,
    longitud: -54.5781,
    imagen: BANCO_IMAGENES[1],
    alerta: "Moderado",
  },
];

export default function Home() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [montado, setMontado] = useState(false);
  const [reloj, setReloj] = useState<string>("");

  const [noticiaAmpliada, setNoticiaAmpliada] = useState<Registro | null>(null);

  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [puntosClave, setPuntosClave] = useState("");
  const [categoria, setCategoria] = useState("Inteligencia y seguridad");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fuente, setFuente] = useState("");
  const [url, setUrl] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [latitud, setLatitud] = useState<string>("");
  const [longitud, setLongitud] = useState<string>("");
  const [imagen, setImagen] = useState("");
  const [alerta, setAlerta] = useState<NivelAlerta>("Informativo");

  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroAlerta, setFiltroAlerta] = useState("");

  const [palabraClaveOSINT, setPalabraClaveOSINT] = useState("Fronteras");
  const [itemsRSS, setItemsRSS] = useState<ItemRSS[]>([]);
  const [cargandoRSS, setCargandoRSS] = useState(false);
  const [errorRSS, setErrorRSS] = useState("");

  useEffect(() => {
    const actualizarReloj = () => {
      const ahora = new Date();
      setReloj(ahora.toLocaleString("es-AR", { dateStyle: "medium", timeStyle: "medium" }));
    };
    actualizarReloj();
    const interval = setInterval(actualizarReloj, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMontado(true);
    setFecha(new Date().toISOString().slice(0, 10));

    try {
      const guardados = localStorage.getItem("gend-intel-registros-v8");
      if (guardados && JSON.parse(guardados).length > 0) {
        setRegistros(JSON.parse(guardados));
      } else {
        setRegistros(NOTICIAS_SEMILLA);
      }
    } catch (e) {
      setRegistros(NOTICIAS_SEMILLA);
    }
  }, []);

  useEffect(() => {
    if (!montado) return;
    const intervaloAutoSondeo = setInterval(() => {
      consultarGoogleNoticiasArg("Seguridad Fronteriza");
    }, 10 * 60 * 1000);

    return () => clearInterval(intervaloAutoSondeo);
  }, [montado]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    if (!document.getElementById("leaflet-js")) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => inicializarMapa();
      document.head.appendChild(script);
    } else {
      inicializarMapa();
    }
  }, [registros, montado]);

  useEffect(() => {
    if (montado) {
      localStorage.setItem("gend-intel-registros-v8", JSON.stringify(registros));
    }
  }, [registros, montado]);

  function inicializarMapa() {
    if (typeof window === "undefined" || !(window as any).L) return;
    const L = (window as any).L;
    const container = document.getElementById("mapa-osint");
    if (!container) return;

    if ((container as any)._leaflet_id) {
      (container as any)._leaflet_id = null;
      container.innerHTML = "";
    }

    const map = L.map("mapa-osint").setView([-38.4161, -63.6167], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '© OpenStreetMap | <strong>GEND-INTEL Operativo - Autor: A.S.C. 187</strong>',
    }).addTo(map);

    const obtenerColor = (a?: NivelAlerta) => {
      switch (a) {
        case "Crítico": return "#dc2626";
        case "Alto": return "#ea580c";
        case "Moderado": return "#ca8a04";
        default: return "#16a34a";
      }
    };

    registros.forEach((reg) => {
      if (reg.latitud && reg.longitud) {
        const color = obtenerColor(reg.alerta);
        const customIcon = L.divIcon({
          className: "custom-pin",
          html: `<div style="background-color:${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        const popupContent = `
          <div style="font-family: Arial, sans-serif; font-size: 12px; width: 210px;">
            ${reg.imagen ? `<img src="${reg.imagen}" style="width:100%; height:90px; object-fit:cover; border-radius:4px; margin-bottom:6px;"/>` : ""}
            <strong style="color:#0f172a; font-size:13px;">${reg.titulo}</strong>
            <p style="margin:4px 0; color:#475569;">${reg.descripcion.slice(0, 80)}...</p>
            <div style="margin-top:6px; font-size:11px; color:#64748b;">
              📍 ${reg.ubicacion || "Ubicación Geográfica"}<br/>
              🚨 Alerta: <strong>${reg.alerta || "Informativo"}</strong>
            </div>
            ${reg.url ? `<a href="${reg.url}" target="_blank" style="display:inline-block; margin-top:6px; color:#0284c7; font-weight:bold;">Fuente 🔗</a>` : ""}
          </div>
        `;

        L.marker([reg.latitud, reg.longitud], { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent);
      }
    });
  }

  async function consultarGoogleNoticiasArg(palabraOverride?: string) {
    const termino = palabraOverride !== undefined ? palabraOverride : palabraClaveOSINT;
    setCargandoRSS(true);
    setErrorRSS("");
    setItemsRSS([]);

    const googleRssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(termino)}&hl=es-419&gl=AR&ceid=AR:es-419`;

    try {
      const apiEndpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(googleRssUrl)}`;
      const res = await fetch(apiEndpoint);
      const data = await res.json();

      if (data.status === "ok" && data.items && data.items.length > 0) {
        const mapeados = data.items.map((it: any) => ({
          title: it.title,
          pubDate: it.pubDate,
          link: it.link,
          description: it.description,
          author: it.author || "Google Noticias Arg",
          fuenteNombre: "Google Noticias Arg",
          thumbnail: it.thumbnail || "",
        }));
        setItemsRSS(mapeados);
      } else {
        setErrorRSS(`No se encontraron registros para "${termino}".`);
      }
    } catch {
      setErrorRSS("Error al consultar fuentes externas.");
    } finally {
      setCargandoRSS(false);
    }
  }

  function obtenerImagenUnica(id: number, texto: string): string {
    const t = texto.toLowerCase();
    if (t.includes("dron")) return BANCO_IMAGENES[0];
    if (t.includes("triple") || t.includes("iguazú") || t.includes("rio") || t.includes("frontera")) return BANCO_IMAGENES[1];
    if (t.includes("ciber") || t.includes("hack") || t.includes("inteligencia")) return BANCO_IMAGENES[2];
    if (t.includes("petroleo") || t.includes("vaca muerta") || t.includes("combustible")) return BANCO_IMAGENES[3];
    if (t.includes("policia") || t.includes("gendarmeria") || t.includes("control") || t.includes("operativo")) return BANCO_IMAGENES[4];

    const indice = Math.abs(id) % BANCO_IMAGENES.length;
    return BANCO_IMAGENES[indice];
  }

  function determinarNivelAlerta(texto: string): NivelAlerta {
    const t = texto.toLowerCase();
    if (t.includes("ataque") || t.includes("atentado") || t.includes("urgente")) return "Crítico";
    if (t.includes("dron") || t.includes("hezbollah") || t.includes("incautacion")) return "Alto";
    if (t.includes("alerta") || t.includes("control") || t.includes("operativo")) return "Moderado";
    return "Informativo";
  }

  function extraerResumenReal(description: string, title: string): string {
    if (!description) return title;
    
    const textoLimpio = description
      .replace(/<[^>]*>?/gm, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&quot;/g, '"')
      .trim();

    if (textoLimpio.length > 30) {
      return textoLimpio.length > 220 ? textoLimpio.slice(0, 220) + "..." : textoLimpio;
    }
    
    return title;
  }

  function publicarDirectoDesdeRSS(item: ItemRSS) {
    const idUnico = Date.now() + Math.floor(Math.random() * 10000);
    const resumenReal = extraerResumenReal(item.description, item.title);
    const imgUrl = item.thumbnail && item.thumbnail.startsWith("http") 
      ? item.thumbnail 
      : obtenerImagenUnica(idUnico, item.title + " " + item.description);
    
    const nivelAlertaCalculado = determinarNivelAlerta(item.title + " " + item.description);

    let catAsignada = "Inteligencia y seguridad";
    const t = (item.title + " " + item.description).toLowerCase();
    if (t.includes("dron") || t.includes("inteligencia artificial") || t.includes("ciber")) {
      catAsignada = "Inteligencia y seguridad";
    } else if (t.includes("mapuche") || t.includes("ram") || t.includes("antifa")) {
      catAsignada = "Gobierno y política";
    } else if (t.includes("hezbollah") || t.includes("frontera") || t.includes("paraguay") || t.includes("triple")) {
      catAsignada = "Delitos transnacionales";
    }

    let lat: number | undefined = undefined;
    let lng: number | undefined = undefined;
    let ub = "Zona de Cobertura Nacional";

    if (t.includes("triple") || t.includes("iguazú")) {
      ub = "Puerto Iguazú (Misiones)";
      lat = -25.5973;
      lng = -54.5781;
    } else if (t.includes("quiaca") || t.includes("jujuy")) {
      ub = "La Quiaca, Jujuy";
      lat = -22.1023;
      lng = -65.5982;
    }

    const nuevaNoticia: Registro = {
      id: idUnico,
      titulo: item.title || "Reporte sin título",
      subtitulo: "",
      puntosClave: "",
      categoria: catAsignada,
      fecha: item.pubDate ? new Date(item.pubDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      descripcion: resumenReal,
      fuente: item.fuenteNombre || "Google Noticias Arg",
      url: item.link || "",
      ubicacion: ub,
      latitud: lat,
      longitud: lng,
      imagen: imgUrl,
      alerta: nivelAlertaCalculado,
    };

    setRegistros((actuales) => [nuevaNoticia, ...actuales]);
    setMensaje(`Reporte integrado exitosamente al sistema.`);
  }

  function registrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!titulo.trim() || !descripcion.trim()) {
      setMensaje("Completá el título y la descripción del reporte.");
      return;
    }

    const idNuevo = Date.now();
    const lat = latitud ? parseFloat(latitud) : undefined;
    const lng = longitud ? parseFloat(longitud) : undefined;
    const imgFinal = imagen.trim() ? imagen.trim() : obtenerImagenUnica(editandoId || idNuevo, titulo + " " + descripcion);

    if (modoEdicion && editandoId !== null) {
      setRegistros((actuales) =>
        actuales.map((reg) =>
          reg.id === editandoId
            ? {
                ...reg,
                titulo: titulo.trim(),
                subtitulo: subtitulo.trim(),
                puntosClave: puntosClave.trim(),
                categoria,
                fecha,
                descripcion: descripcion.trim(),
                fuente: fuente.trim(),
                url: url.trim(),
                ubicacion: ubicacion.trim(),
                latitud: lat,
                longitud: lng,
                imagen: imgFinal,
                alerta,
              }
            : reg
        )
      );
      setMensaje("Reporte actualizado correctamente.");
    } else {
      const nuevo: Registro = {
        id: idNuevo,
        titulo: titulo.trim(),
        subtitulo: subtitulo.trim(),
        puntosClave: puntosClave.trim(),
        categoria,
        fecha,
        descripcion: descripcion.trim(),
        fuente: fuente.trim(),
        url: url.trim(),
        ubicacion: ubicacion.trim(),
        latitud: lat,
        longitud: lng,
        imagen: imgFinal,
        alerta,
      };
      setRegistros((actuales) => [nuevo, ...actuales]);
      setMensaje("Reporte registrado en la plataforma.");
    }

    limpiarFormulario();
  }

  function limpiarFormulario() {
    setTitulo("");
    setSubtitulo("");
    setPuntosClave("");
    setCategoria("Inteligencia y seguridad");
    setFecha(new Date().toISOString().slice(0, 10));
    setDescripcion("");
    setFuente("");
    setUrl("");
    setUbicacion("");
    setLatitud("");
    setLongitud("");
    setImagen("");
    setAlerta("Informativo");
    setEditandoId(null);
    setModoEdicion(false);
  }

  function seleccionarReferencia(ref: { nombre: string; lat: number; lng: number }) {
    setUbicacion(ref.nombre);
    setLatitud(ref.lat.toString());
    setLongitud(ref.lng.toString());
  }

  function iniciarEdicion(reg: Registro) {
    setEditandoId(reg.id);
    setModoEdicion(true);
    setTitulo(reg.titulo);
    setSubtitulo(reg.subtitulo || "");
    setPuntosClave(reg.puntosClave || "");
    setCategoria(reg.categoria);
    setFecha(reg.fecha);
    setDescripcion(reg.descripcion);
    setFuente(reg.fuente || "");
    setUrl(reg.url || "");
    setUbicacion(reg.ubicacion || "");
    setLatitud(reg.latitud ? reg.latitud.toString() : "");
    setLongitud(reg.longitud ? reg.longitud.toString() : "");
    setImagen(reg.imagen || "");
    setAlerta(reg.alerta || "Informativo");
  }

  function cancelarEdicion() {
    limpiarFormulario();
  }

  function eliminar(id: number) {
    if (window.confirm("¿Confirma la eliminación de este registro operativo?")) {
      setRegistros((actuales) => actuales.filter((reg) => reg.id !== id));
      if (editandoId === id) limpiarFormulario();
    }
  }

  const resultados = registros.filter((reg) => {
    const texto = (
      reg.titulo + " " + (reg.subtitulo || "") + " " + (reg.puntosClave || "") + " " + reg.categoria + " " + reg.descripcion + " " + (reg.fuente || "") + " " + (reg.ubicacion || "")
    ).toLowerCase();

    return (
      texto.includes(busqueda.toLowerCase()) &&
      (filtroCategoria ? reg.categoria === filtroCategoria : true) &&
      (filtroFecha ? reg.fecha === filtroFecha : true) &&
      (filtroAlerta ? (reg.alerta || "Informativo") === filtroAlerta : true)
    );
  });

  function obtenerBadgeAlerta(nivel: NivelAlerta = "Informativo") {
    switch (nivel) {
      case "Crítico": return { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" };
      case "Alto": return { bg: "#fff7ed", color: "#c2410c", border: "#ffedd5" };
      case "Moderado": return { bg: "#fefce8", color: "#854d0e", border: "#fef08a" };
      default: return { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0" };
    }
  }

  const campoEstilo = {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "9px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
    marginTop: "4px",
    fontSize: "13px",
    background: "#ffffff",
    color: "#0f172a",
  };

  const botonInstitucional = {
    padding: "9px 14px",
    border: "none",
    borderRadius: "4px",
    background: "#14362b",
    color: "#ffffff",
    fontWeight: "bold" as const,
    cursor: "pointer",
    fontSize: "13px",
  };

  const botonGris = {
    padding: "9px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
    background: "#f1f5f9",
    color: "#334155",
    fontWeight: "bold" as const,
    cursor: "pointer",
    fontSize: "13px",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f4f6f8", fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", color: "#1e293b" }}>
      
      {/* ENCABEZADO INSTITUCIONAL */}
      <header style={{ background: "#0c231d", color: "#ffffff", borderBottom: "3px solid #14362b", boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ background: "#14362b", color: "#4ade80", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", border: "1px solid #1e5643" }}>
                SISTEMA OSINT
              </span>
              <h1 translate="no" style={{ margin: 0, fontSize: "22px", fontWeight: "700", letterSpacing: "0.5px", color: "#ffffff" }}>
                GEND-INTEL
              </h1>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#94a3b8" }}>
              Plataforma Autónoma de Monitoreo Estratégico y Análisis de Inteligencia
            </p>
          </div>
          
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "12px", color: "#fef08a", fontWeight: "600", background: "#081914", padding: "5px 12px", borderRadius: "4px", border: "1px solid #14362b", display: "inline-block", marginBottom: "4px" }}>
              🕒 {reloj || "Sincronizando reloj..."}
            </span>
            <div style={{ fontSize: "11px", color: "#4ade80" }}>
              ● Módulo Operativo Activo (Autor: A.S.C. 187)
            </div>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", display: "flex", flex: 1, padding: "20px", gap: "24px" }}>
        
        {/* PANEL LATERAL */}
        <aside style={{ width: "240px", flexShrink: 0 }}>
          <div style={{ background: "#ffffff", padding: "16px", borderRadius: "6px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", position: "sticky", top: "20px" }}>
            <h3 style={{ margin: "0 0 10px", fontSize: "12px", textTransform: "uppercase", color: "#64748b", letterSpacing: "0.5px", fontWeight: "700" }}>Módulos del Sistema</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "6px" }}>
                <a href="#feed-registros" style={{ display: "block", padding: "8px 10px", background: "#f0fdf4", color: "#166534", textDecoration: "none", borderRadius: "4px", fontWeight: "600", fontSize: "13px", borderLeft: "3px solid #16a34a" }}>
                  📋 Panel de Reportes
                </a>
              </li>
              <li style={{ marginBottom: "6px" }}>
                <a href="#mapa-seccion" style={{ display: "block", padding: "8px 10px", background: "#f8fafc", color: "#334155", textDecoration: "none", borderRadius: "4px", fontSize: "13px" }}>
                  🗺️ Mapa Táctico
                </a>
              </li>
              <li style={{ marginBottom: "6px" }}>
                <a href="#modulo-ingesta" style={{ display: "block", padding: "8px 10px", background: "#f8fafc", color: "#334155", textDecoration: "none", borderRadius: "4px", fontSize: "13px" }}>
                  🌐 Ingesta Externa RSS
                </a>
              </li>
              <li style={{ marginBottom: "6px" }}>
                <a href="#modulo-investigacion" style={{ display: "block", padding: "8px 10px", background: "#f8fafc", color: "#334155", textDecoration: "none", borderRadius: "4px", fontSize: "13px" }}>
                  ✍️ Registro Manual
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* SECCIÓN DE REPORTES / NOTICIAS */}
