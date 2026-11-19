"use client";

import React, { useState, useEffect } from "react";

type Registro = {
  id: number;
  titulo: string;
  subtitulo?: string;
  puntosClave?: string;
  categoria: string;
  regionRIP?: string;
  jurisdiccion?: string;
  fecha: string;
  descripcion: string;
  que?: string;
  quien?: string;
  cuando?: string;
  como?: string;
  donde?: string;
  fuente?: string;
  url?: string;
  ubicacion?: string;
  imagen?: string;
};

const DIMENSIONES_INFORMATIVAS = [
  "Todas las Dimensiones",
  "Narcotráfico",
  "Terrorismo",
  "Geopolítica",
  "Alteración Orden Público / Protestas",
];

const ESTRUCTURA_TERRITORIAL = [
  "Todas las Regiones",
  "Región Noreste",
  "Región Noroeste",
  "Región Centro",
  "Región Cuyo",
  "Región Patagónica",
  "CABA y Provincia de Buenos Aires",
  "Ámbito Nacional",
  "Ámbito Externo",
];

const UBICACIONES_REFERENCIA = [
  { nombre: "Misiones — General Urquiza", region: "Región Noreste", jur: "MISIONES" },
  { nombre: "Misiones — Posadas", region: "Región Noreste", jur: "MISIONES" },
  { nombre: "Misiones — Puerto Iguazú", region: "Región Noreste", jur: "MISIONES" },
  { nombre: "Chaco — Sáenz Peña", region: "Región Noreste", jur: "CHACO" },
  { nombre: "Jujuy — RN 9 / RN 34", region: "Región Noroeste", jur: "JUJUY" },
  { nombre: "Tucumán — Límite con Santiago del Estero", region: "Región Noroeste", jur: "TUCUMÁN" },
  { nombre: "Santa Fe — Rafaela (RN 34)", region: "Región Centro", jur: "SANTA FE" },
  { nombre: "Mendoza — Ciudad", region: "Región Cuyo", jur: "MENDOZA" },
  { nombre: "Neuquén — Centenario / Villa La Angostura", region: "Región Patagónica", jur: "NEUQUÉN" },
  { nombre: "CABA — Barrio Zavaleta / Belgrano", region: "CABA y Provincia de Buenos Aires", jur: "CABA" },
  { nombre: "Ámbito Nacional — Argentina", region: "Ámbito Nacional", jur: "ARGENTINA" },
  { nombre: "Ámbito Externo — Frontera / Internacional", region: "Ámbito Externo", jur: "EXTERIOR" },
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
];

const NOTICIAS_SEMILLA: Registro[] = [
  {
    id: 301,
    titulo: "DOS HOMBRES FUERON SORPRENDIDOS MIENTRAS CARGABAN MARIHUANA EN ZONA RIBEREÑA",
    categoria: "Narcotráfico",
    regionRIP: "Región Noreste",
    jurisdiccion: "MISIONES",
    fecha: "2026-11-19",
    descripcion:
      "Efectivos dependientes del Escuadrón en zonas aledañas al río secuestraron bultos con marihuana que fueron abandonados por dos personas que, al advertir la presencia de los uniformados, se deshicieron de la carga y huyeron.",
    que: "Secuestro de bultos con marihuana abandonados tras un control ribereño.",
    quien: "Dos personas no identificadas que escaparon y personal de control operativo.",
    cuando: "19 de noviembre de 2026.",
    como: "Abandonaron la carga al notar la presencia de los uniformados durante un patrullaje.",
    donde: "General Urquiza, Misiones (zona cercana al río).",
    fuente: "Monitor ENFOQUE 360",
    url: "https://misionesonline.net/",
    ubicacion: "General Urquiza, Misiones",
    imagen: BANCO_IMAGENES[4],
  },
  {
    id: 302,
    titulo: "SECUESTRAN CARGAMENTO DE COCAÍNA OCULTO EN TRANSPORTE DE CARGA SOBRE RUTA NACIONAL",
    categoria: "Narcotráfico",
    regionRIP: "Región Noroeste",
    jurisdiccion: "TUCUMÁN",
    fecha: "2026-11-19",
    descripcion:
      "En el límite interprovincial, efectivos de control vial junto a unidades operativas detuvieron al conductor de un camión y a su acompañante, secuestrando paquetes de cocaína acondicionados en compartimentos ocultos del rodado.",
    que: "Detención de dos ocupantes de un camión y secuestro de paquetes de cocaína.",
    quien: "Conductor del camión, acompañante y efectivos de control vial.",
    cuando: "19 de noviembre de 2026.",
    como: "Ocultando la sustancia en compartimentos escondidos dentro del transporte de carga.",
    donde: "Límite entre Tucumán y Santiago del Estero, sobre ruta nacional.",
    fuente: "Monitor ENFOQUE 360",
    url: "https://www.lanacion.com.ar/",
    ubicacion: "Límite Tucumán / Santiago del Estero",
    imagen: BANCO_IMAGENES[6],
  },
  {
    id: 303,
    titulo: "REFUERZAN CONTROLES Y COOPERACIÓN REGIONAL ANTE RIESGOS DE FINANCIAMIENTO Y TERRORISMO",
    categoria: "Terrorismo",
    regionRIP: "Ámbito Externo",
    jurisdiccion: "FRONTERA REGIONAL",
    fecha: "2026-11-19",
    descripcion:
      "Organismos de seguridad y unidades de investigación ampliaron el intercambio de información sobre redes transnacionales sospechadas de captación, movimientos financieros irregulares y vínculos con grupos extremistas en la región.",
    que: "Ampliación de controles e intercambio de información sobre redes transnacionales y extremismo.",
    quien: "Organismos de seguridad, equipos de investigación y redes transnacionales bajo seguimiento.",
    cuando: "19 de noviembre de 2026.",
    como: "Mediante coordinación regional, seguimiento de movimientos financieros y controles en pasos y zonas sensibles.",
    donde: "Zona fronteriza regional y ámbito externo.",
    fuente: "Fuentes Abiertas",
    url: "https://www.lanacion.com.ar/el-mundo/",
    ubicacion: "Zona Fronteriza Regional",
    imagen: BANCO_IMAGENES[2],
  },
  {
    id: 304,
    titulo: "REACOMODAMIENTO GEOPOLÍTICO EN RUTAS MARÍTIMAS, ENERGÍA Y CADENAS DE SUMINISTRO",
    categoria: "Geopolítica",
    regionRIP: "Ámbito Externo",
    jurisdiccion: "ESCENARIO INTERNACIONAL",
    fecha: "2026-11-19",
    descripcion:
      "Distintos bloques y potencias aceleraron acuerdos comerciales, de defensa y de provisión energética ante tensiones regionales y cambios en el comercio global que impactan en los precios y la logística internacional.",
    que: "Nuevos acuerdos comerciales, energéticos y de defensa frente a tensiones internacionales.",
    quien: "Países, bloques regionales y actores del comercio y la energía global.",
    cuando: "19 de noviembre de 2026.",
    como: "A través de negociaciones diplomáticas, reordenamiento de rutas y cambios en la provisión de insumos y energía.",
    donde: "Escenario internacional y corredores marítimos y energéticos.",
    fuente: "Prensa Internacional",
    url: "https://www.cronista.com/",
    ubicacion: "Escenario Internacional",
    imagen: BANCO_IMAGENES[5],
  },
  {
    id: 305,
    titulo: "DECOMISAN ENCOMIENDAS CON MERCADERÍA DE CONTRABANDO SOBRE RUTA NACIONAL 34",
    categoria: "Narcotráfico",
    regionRIP: "Región Centro",
    jurisdiccion: "SANTA FE",
    fecha: "2026-11-18",
    descripcion:
      "Personal de seguridad vial realizó el control y apertura de encomiendas transportadas en un vehículo de carga, hallando mercadería de origen extranjero sin aval aduanero, valuada en decenas de millones de pesos.",
    que: "Decomiso de encomiendas con mercadería extranjera sin aval aduanero.",
    quien: "Personal de seguridad vial y responsables del traslado de la carga.",
    cuando: "18 de noviembre de 2026.",
    como: "Durante un control vehicular y revisión de encomiendas transportadas en ruta.",
    donde: "Rafaela, Santa Fe, sobre Ruta Nacional 34.",
    fuente: "Portal Oficial",
    url: "https://www.argentina.gob.ar/",
    ubicacion: "Rafaela, Santa Fe",
    imagen: BANCO_IMAGENES[1],
  },
  {
    id: 306,
    titulo: "MONITOREO DE CORTE PARCIAL EN ACCESO VIAL POR RECLAMO DE ORGANIZACIONES",
    categoria: "Alteración Orden Público / Protestas",
    regionRIP: "CABA y Provincia de Buenos Aires",
    jurisdiccion: "BUENOS AIRES",
    fecha: "2026-11-18",
    descripcion:
      "Grupos de manifestantes realizaron una interrupción parcial del tránsito sobre un acceso principal con desvíos ordenados y despliegue preventivo para resguardar la circulación.",
    que: "Interrupción parcial del tránsito y ordenamiento de desvíos viales.",
    quien: "Grupos de manifestantes y personal de prevención y tránsito.",
    cuando: "18 de noviembre de 2026.",
    como: "Ocupando parcialmente calzada en un acceso vial mientras se habilitaban rutas alternativas.",
    donde: "Provincia de Buenos Aires (acceso vial).",
    fuente: "Monitoreo Urbano",
    url: "https://www.argentina.gob.ar/seguridad",
    ubicacion: "Provincia de Buenos Aires",
    imagen: BANCO_IMAGENES[7],
  },
];

function formatearFechaLargaES(fechaISO: string): string {
  if (!fechaISO) return "";
  const partes = fechaISO.split("-");
  if (partes.length !== 3) return fechaISO;
  const anio = parseInt(partes[0], 10);
  const mesIdx = parseInt(partes[1], 10) - 1;
  const dia = parseInt(partes[2], 10);
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const fechaObj = new Date(anio, mesIdx, dia);
  if (isNaN(fechaObj.getTime())) return fechaISO;
  return `${dia} de ${meses[mesIdx]} de ${anio}`;
}

function completarInterrogantesPorDefecto(
  reg: Partial<Registro> & { titulo: string; descripcion: string; fecha: string }
): { que: string; quien: string; cuando: string; como: string; donde: string } {
  const lugar = reg.ubicacion || reg.jurisdiccion || "Ámbito nacional";
  const fechaTexto = formatearFechaLargaES(reg.fecha) || reg.fecha;
  return {
    que: reg.que?.trim() || reg.titulo,
    quien: reg.quien?.trim() || "Actores y organismos mencionados en la noticia.",
    cuando: reg.cuando?.trim() || fechaTexto,
    como: reg.como?.trim() || reg.descripcion,
    donde: reg.donde?.trim() || lugar,
  };
}

export default function Home() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [montado, setMontado] = useState(false);
  const [reloj, setReloj] = useState<string>("");

  const [solapaActiva, setSolapaActiva] = useState<"monitor" | "subir">("monitor");

  const [noticiaAmpliada, setNoticiaAmpliada] = useState<Registro | null>(null);
  const [reportesParaRIP, setReportesParaRIP] = useState<Registro[] | null>(null);
  const [fechaParteRIP, setFechaParteRIP] = useState<string>("");

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Narcotráfico");
  const [regionRIP, setRegionRIP] = useState("Región Noreste");
  const [jurisdiccion, setJurisdiccion] = useState("MISIONES");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [que, setQue] = useState("");
  const [quien, setQuien] = useState("");
  const [cuando, setCuando] = useState("");
  const [como, setComo] = useState("");
  const [donde, setDonde] = useState("");
  const [fuente, setFuente] = useState("");
  const [url, setUrl] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [imagen, setImagen] = useState("");

  const [dimensionCargaRapida, setDimensionCargaRapida] = useState("Narcotráfico");
  const [regionCargaRapida, setRegionCargaRapida] = useState("Región Noreste");
  const [jurisdiccionCargaRapida, setJurisdiccionCargaRapida] = useState("MISIONES");
  const [ubicacionCargaRapida, setUbicacionCargaRapida] = useState("Ámbito Nacional");
  const [urlCargaRapida, setUrlCargaRapida] = useState("");
  const [textoPegadoRapido, setTextoPegadoRapido] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [filtroDimension, setFiltroDimension] = useState("");
  const [filtroRegion, setFiltroRegion] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

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
      const guardados = localStorage.getItem("enfoque-360-rip-v4");
      if (guardados && JSON.parse(guardados).length > 0) {
        setRegistros(JSON.parse(guardados));
      } else {
        setRegistros(NOTICIAS_SEMILLA);
      }
    } catch {
      setRegistros(NOTICIAS_SEMILLA);
    }
  }, []);

  useEffect(() => {
    if (montado) {
      localStorage.setItem("enfoque-360-rip-v4", JSON.stringify(registros));
    }
  }, [registros, montado]);

  function obtenerImagenUnica(id: number, texto: string): string {
    const t = texto.toLowerCase();
    if (t.includes("dron")) return BANCO_IMAGENES[0];
    if (t.includes("triple") || t.includes("iguazú") || t.includes("rio") || t.includes("frontera")) {
      return BANCO_IMAGENES[1];
    }
    if (t.includes("terror") || t.includes("hezbollah") || t.includes("ciber")) {
      return BANCO_IMAGENES[2];
    }
    if (t.includes("geopol") || t.includes("internacional") || t.includes("energ")) {
      return BANCO_IMAGENES[5];
    }
    if (t.includes("droga") || t.includes("narco") || t.includes("cocaina") || t.includes("marihuana")) {
      return BANCO_IMAGENES[4];
    }

    const indice = Math.abs(id) % BANCO_IMAGENES.length;
    return BANCO_IMAGENES[indice];
  }

  function manejarSubidaArchivoSimple(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    const nombreLimpio = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
    const idNuevo = Date.now();
    const fechaHoy = new Date().toISOString().slice(0, 10);

    reader.onload = (event) => {
      try {
        const contenido = event.target?.result as string;
        if (file.name.toLowerCase().endsWith(".json")) {
          const parsed = JSON.parse(contenido);
          if (Array.isArray(parsed)) {
            const normalizados = parsed.map((item: Registro, idx: number) => {
              const base: Registro = {
                id: item.id || idNuevo + idx,
                titulo: (item.titulo || "NOVEDAD IMPORTADA").toUpperCase(),
                categoria: item.categoria || dimensionCargaRapida,
                regionRIP: item.regionRIP || regionCargaRapida,
                jurisdiccion: (
                  item.jurisdiccion ||
                  jurisdiccionCargaRapida ||
                  "JURISDICCIÓN"
                ).toUpperCase(),
                fecha: item.fecha || fechaHoy,
                descripcion: item.descripcion || "",
                fuente: item.fuente || file.name,
                url: item.url || urlCargaRapida.trim() || "",
                ubicacion: item.ubicacion || ubicacionCargaRapida,
                imagen: item.imagen || obtenerImagenUnica(idNuevo + idx, item.titulo || ""),
              };
              const interp = completarInterrogantesPorDefecto({ ...base, ...item });
              return { ...base, ...interp };
            });
            setRegistros((prev) => [...normalizados, ...prev]);
            setMensaje(`Se importaron ${normalizados.length} registros al RIP desde JSON.`);
            setSolapaActiva("monitor");
          }
        } else {
          const lineas = contenido
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);
          const tituloDetectado = (
            lineas[0] && lineas[0].length < 140 ? lineas[0] : nombreLimpio
          ).toUpperCase();
          const cuerpoDetectado =
            lineas.length > 1 ? lineas.slice(1).join("\n") : contenido || "Contenido adjunto.";

          const interp = completarInterrogantesPorDefecto({
            titulo: tituloDetectado,
            descripcion: cuerpoDetectado,
            fecha: fechaHoy,
            ubicacion: ubicacionCargaRapida,
            jurisdiccion: jurisdiccionCargaRapida,
          });

          const nuevo: Registro = {
            id: idNuevo,
            titulo: tituloDetectado,
            descripcion: cuerpoDetectado,
            ...interp,
            categoria: dimensionCargaRapida,
            regionRIP: regionCargaRapida,
            jurisdiccion: (jurisdiccionCargaRapida || "JURISDICCIÓN").toUpperCase(),
            fecha: fechaHoy,
            fuente: `Documento (${file.name})`,
            url: urlCargaRapida.trim() || "",
            ubicacion: ubicacionCargaRapida,
            imagen: obtenerImagenUnica(idNuevo, tituloDetectado),
          };

          setRegistros((prev) => [nuevo, ...prev]);
          setMensaje(`Archivo "${file.name}" cargado en el RIP.`);
          setSolapaActiva("monitor");
        }
      } catch {
        alert("Error al procesar el archivo.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function publicarTextoPegado(e: React.FormEvent) {
    e.preventDefault();
    if (!textoPegadoRapido.trim()) {
      setMensaje("Por favor ingresá texto para publicar.");
      return;
    }

    const idNuevo = Date.now();
    const fechaHoy = new Date().toISOString().slice(0, 10);
    const lineas = textoPegadoRapido
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const tituloDef = (
      lineas[0] && lineas[0].length < 140 ? lineas[0] : "NOVEDAD INGRESADA"
    ).toUpperCase();
    const descDef = lineas.length > 1 ? lineas.slice(1).join("\n") : textoPegadoRapido;

    const interp = completarInterrogantesPorDefecto({
      titulo: tituloDef,
      descripcion: descDef,
      fecha: fechaHoy,
      ubicacion: ubicacionCargaRapida,
      jurisdiccion: jurisdiccionCargaRapida,
    });

    const nuevo: Registro = {
      id: idNuevo,
      titulo: tituloDef,
      descripcion: descDef,
      ...interp,
      categoria: dimensionCargaRapida,
      regionRIP: regionCargaRapida,
      jurisdiccion: (jurisdiccionCargaRapida || "JURISDICCIÓN").toUpperCase(),
      fecha: fechaHoy,
      fuente: "Ingreso Directo de Texto",
      url: urlCargaRapida.trim() || "",
      ubicacion: ubicacionCargaRapida,
      imagen: obtenerImagenUnica(idNuevo, tituloDef),
    };

    setRegistros((prev) => [nuevo, ...prev]);
    setTextoPegadoRapido("");
    setUrlCargaRapida("");
    setMensaje("Novedad publicada en el RIP.");
    setSolapaActiva("monitor");
  }

  function registrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!titulo.trim() || !descripcion.trim()) {
      setMensaje("Completá el título y el desarrollo de la noticia.");
      return;
    }

    const idNuevo = Date.now();
    const imgFinal = imagen.trim()
      ? imagen.trim()
      : obtenerImagenUnica(editandoId || idNuevo, titulo + " " + descripcion);
    const jurFinal = (jurisdiccion.trim() || ubicacion.trim() || "JURISDICCIÓN").toUpperCase();
    const tituloMayus = titulo.trim().toUpperCase();
    const descLimpia = descripcion.trim();

    const interp = completarInterrogantesPorDefecto({
      titulo: tituloMayus,
      descripcion: descLimpia,
      fecha,
      ubicacion: ubicacion.trim(),
      jurisdiccion: jurFinal,
      que,
      quien,
      cuando,
      como,
      donde,
    });

    if (modoEdicion && editandoId !== null) {
      setRegistros((actuales) =>
        actuales.map((reg) =>
          reg.id === editandoId
            ? {
                ...reg,
                titulo: tituloMayus,
                categoria,
                regionRIP,
                jurisdiccion: jurFinal,
                fecha,
                descripcion: descLimpia,
                ...interp,
                fuente: fuente.trim(),
                url: url.trim(),
                ubicacion: ubicacion.trim(),
                imagen: imgFinal,
              }
            : reg
        )
      );
      setMensaje("Registro RIP actualizado.");
    } else {
      const nuevo: Registro = {
        id: idNuevo,
        titulo: tituloMayus,
        categoria,
        regionRIP,
        jurisdiccion: jurFinal,
        fecha,
        descripcion: descLimpia,
        ...interp,
        fuente: fuente.trim(),
        url: url.trim(),
        ubicacion: ubicacion.trim(),
        imagen: imgFinal,
      };
      setRegistros((actuales) => [nuevo, ...actuales]);
      setMensaje("Registro agregado al RIP.");
    }

    limpiarFormulario();
    setSolapaActiva("monitor");
  }

  function limpiarFormulario() {
    setTitulo("");
    setCategoria("Narcotráfico");
    setRegionRIP("Región Noreste");
    setJurisdiccion("MISIONES");
    setFecha(new Date().toISOString().slice(0, 10));
    setDescripcion("");
    setQue("");
    setQuien("");
    setCuando("");
    setComo("");
    setDonde("");
    setFuente("");
    setUrl("");
    setUbicacion("");
    setImagen("");
    setEditandoId(null);
    setModoEdicion(false);
  }

  function seleccionarReferencia(ref: { nombre: string; region: string; jur: string }) {
    setUbicacion(ref.nombre);
    setRegionRIP(ref.region);
    setJurisdiccion(ref.jur);
    if (!donde.trim()) {
      setDonde(ref.nombre);
    }
  }

  function iniciarEdicion(reg: Registro) {
    setEditandoId(reg.id);
    setModoEdicion(true);
    setTitulo(reg.titulo);
    setCategoria(reg.categoria);
    setRegionRIP(reg.regionRIP || "Ámbito Nacional");
    setJurisdiccion(reg.jurisdiccion || "JURISDICCIÓN");
    setFecha(reg.fecha);
    setDescripcion(reg.descripcion);
    const interp = completarInterrogantesPorDefecto(reg);
    setQue(interp.que);
    setQuien(interp.quien);
    setCuando(interp.cuando);
    setComo(interp.como);
    setDonde(interp.donde);
    setFuente(reg.fuente || "");
    setUrl(reg.url || "");
    setUbicacion(reg.ubicacion || "");
    setImagen(reg.imagen || "");
    setSolapaActiva("subir");
  }

  function cancelarEdicion() {
    limpiarFormulario();
    setSolapaActiva("monitor");
  }

  function eliminar(id: number) {
    if (window.confirm("¿Confirma la eliminación de este registro del RIP?")) {
      setRegistros((actuales) => actuales.filter((reg) => reg.id !== id));
      if (editandoId === id) limpiarFormulario();
    }
  }

  function restaurarNoticiasNuevas() {
    setRegistros(NOTICIAS_SEMILLA);
    localStorage.setItem("enfoque-360-rip-v4", JSON.stringify(NOTICIAS_SEMILLA));
    setMensaje("Base actualizada con las novedades del RIP.");
  }

  function abrirVistaRIPIndividual(reg: Registro) {
    setFechaParteRIP(reg.fecha);
    setReportesParaRIP([reg]);
  }

  function abrirVistaRIPDiaCompleto() {
    const fechaObjetivo =
      filtroFecha ||
      (resultados.length > 0 ? resultados[0].fecha : new Date().toISOString().slice(0, 10));

    const delDia = registros.filter((r) => r.fecha === fechaObjetivo);
    const listaParaMostrar =
      delDia.length > 0 ? delDia : resultados.length > 0 ? resultados : registros;

    if (listaParaMostrar.length === 0) {
      alert("No hay novedades disponibles para generar el RIP.");
      return;
    }

    setFechaParteRIP(delDia.length > 0 ? fechaObjetivo : listaParaMostrar[0].fecha);
    setReportesParaRIP(listaParaMostrar);
  }

  function ejecutarImpresionRIP() {
    window.print();
  }

  const resultados = registros.filter((reg) => {
    const interp = completarInterrogantesPorDefecto(reg);
    const texto = (
      reg.titulo +
      " " +
      reg.categoria +
      " " +
      (reg.regionRIP || "") +
      " " +
      (reg.jurisdiccion || "") +
      " " +
      reg.descripcion +
      " " +
      interp.que +
      " " +
      interp.quien +
      " " +
      interp.cuando +
      " " +
      interp.como +
      " " +
      interp.donde +
      " " +
      (reg.fuente || "") +
      " " +
      (reg.ubicacion || "")
    ).toLowerCase();

    const coincideDimension =
      filtroDimension && filtroDimension !== "Todas las Dimensiones"
        ? reg.categoria === filtroDimension
        : true;

    const coincideRegion =
      filtroRegion && filtroRegion !== "Todas las Regiones"
        ? (reg.regionRIP || "").toLowerCase() === filtroRegion.toLowerCase() ||
          (reg.ubicacion || "")
            .toLowerCase()
            .includes(filtroRegion.replace("Región ", "").toLowerCase())
        : true;

    return (
      texto.includes(busqueda.toLowerCase()) &&
      coincideDimension &&
      coincideRegion &&
      (filtroFecha ? reg.fecha === filtroFecha : true)
    );
  });

  const ordenSeccionesRIP = [
    "Región Noreste",
    "Región Noroeste",
    "Región Centro",
    "Región Cuyo",
    "Región Patagónica",
    "CABA y Provincia de Buenos Aires",
    "Ámbito Nacional",
    "Ámbito Externo",
  ];

  const seccionesAgrupadasRIP = reportesParaRIP
    ? ordenSeccionesRIP
        .map((sec) => ({
          nombre: sec.toUpperCase(),
          items: reportesParaRIP.filter(
            (r) => (r.regionRIP || "Ámbito Nacional").toLowerCase() === sec.toLowerCase()
          ),
        }))
        .filter((g) => g.items.length > 0)
    : [];

  const campoEstilo: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "9px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
    marginTop: "4px",
    fontSize: "13px",
    background: "#ffffff",
    color: "#0f172a",
  };

  const botonInstitucional: React.CSSProperties = {
    padding: "9px 14px",
    border: "none",
    borderRadius: "4px",
    background: "#14362b",
    color: "#ffffff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "13px",
  };

  const botonGris: React.CSSProperties = {
    padding: "9px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
    background: "#f1f5f9",
    color: "#334155",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "13px",
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans flex flex-col">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #documento-rip-imprimible, #documento-rip-imprimible * {
            visibility: visible;
          }
          #documento-rip-imprimible {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            background: #ffffff !important;
            padding: 16px 24px !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* ENCABEZADO CON SOLAPAS */}
      <header className="no-print bg-[#0c231d] text-white border-b-4 border-[#14362b] shadow-md">
        <div className="max-w-7xl mx-auto px-4 pt-3 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-[#14362b] text-emerald-400 px-2.5 py-1 rounded text-xs font-bold border border-emerald-800">
              RIP • RESUMEN DE INFORMACIÓN DE PRENSA
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              ENFOQUE 360
            </h1>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-amber-200 font-semibold bg-[#081914] px-3 py-1.5 rounded border border-[#14362b] inline-block">
              {reloj || "Sincronizando..."}
            </span>
          </div>
        </div>

        {/* BARRA DE SOLAPAS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setSolapaActiva("monitor")}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-t-md transition-colors cursor-pointer ${
              solapaActiva === "monitor"
                ? "bg-gray-100 text-[#0c231d] border-t-2 border-emerald-500"
                : "bg-[#14362b] text-slate-300 hover:bg-[#1a4738]"
            }`}
          >
            Panel RIP y Novedades
          </button>

          <button
            type="button"
            onClick={() => {
              if (!modoEdicion) limpiarFormulario();
              setSolapaActiva("subir");
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-t-md transition-colors cursor-pointer ${
              solapaActiva === "subir"
                ? "bg-gray-100 text-[#0c231d] border-t-2 border-emerald-500"
                : "bg-[#14362b] text-slate-300 hover:bg-[#1a4738]"
            }`}
          >
            {modoEdicion ? "Editando Registro RIP" : "Cargar Novedades RIP"}
          </button>
        </div>
      </header>

      {/* SOLAPA 1: MONITOR PRINCIPAL */}
      {solapaActiva === "monitor" && (
        <main className="no-print max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col md:flex-row gap-6 flex-1">
          {/* PANEL LATERAL */}
          <aside className="w-full md:w-72 flex-shrink-0 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-2">
              <button
                type="button"
                onClick={() => {
                  limpiarFormulario();
                  setSolapaActiva("subir");
                }}
                className="w-full py-2.5 px-3 bg-emerald-700 text-white rounded-md text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Cargar Novedad al RIP
              </button>

              <button
                type="button"
                onClick={restaurarNoticiasNuevas}
                className="w-full py-2 px-3 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cargar Novedades Recientes
              </button>
            </div>

            {/* PANEL DE DIMENSIONES Y REGIONES */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
              <div>
                <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  EJES Y DIMENSIONES
                </h4>
                <div className="space-y-1">
                  {DIMENSIONES_INFORMATIVAS.map((dim, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setFiltroDimension(dim === "Todas las Dimensiones" ? "" : dim)
                      }
                      className="w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                      style={{
                        background:
                          filtroDimension === dim ||
                          (!filtroDimension && dim === "Todas las Dimensiones")
                            ? "#14362b"
                            : "#f8fafc",
                        color:
                          filtroDimension === dim ||
                          (!filtroDimension && dim === "Todas las Dimensiones")
                            ? "#ffffff"
                            : "#1e293b",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <span className="truncate">{dim}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  ESTRUCTURA REGIONAL (RIP)
                </h4>
                <div className="space-y-1">
                  {ESTRUCTURA_TERRITORIAL.map((reg, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFiltroRegion(reg === "Todas las Regiones" ? "" : reg)}
                      className="w-full text-left px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 hover:bg-slate-50"
                      style={{
                        color:
                          filtroRegion === reg || (!filtroRegion && reg === "Todas las Regiones")
                            ? "#047857"
                            : "#334155",
                        fontWeight:
                          filtroRegion === reg || (!filtroRegion && reg === "Todas las Regiones")
                            ? "bold"
                            : "normal",
                        background:
                          filtroRegion === reg || (!filtroRegion && reg === "Todas las Regiones")
                            ? "#f0fdf4"
                            : "transparent",
                      }}
                    >
                      <span className="truncate">{reg}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* CONTENIDO CENTRAL */}
          <div className="flex-1 min-w-0 space-y-6">
            {mensaje && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs font-semibold flex justify-between items-center">
                <span>{mensaje}</span>
                <button
                  type="button"
                  onClick={() => setMensaje("")}
                  className="text-emerald-900 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* SECCIÓN DE NOVEDADES RIP */}
            <section
              id="feed-registros"
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-4 mb-4">
                <h2 className="text-base sm:text-lg font-bold text-gray-800 uppercase tracking-wide">
                  RESUMEN DE INFORMACIÓN DE PRENSA (RIP)
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={abrirVistaRIPDiaCompleto}
                    style={{
                      ...botonInstitucional,
                      background: "#0c231d",
                      padding: "6px 12px",
                      fontSize: "12px",
                    }}
                  >
                    Generar Documento RIP (PDF)
                  </button>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1.5 rounded">
                    Total: <strong>{montado ? resultados.length : 0}</strong>
                  </span>
                </div>
              </div>

              {/* FILTROS */}
              <div className="flex flex-col gap-3 mb-5">
                <input
                  style={campoEstilo}
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Filtrar por narcotráfico, terrorismo, geopolítica, jurisdicción o contenido..."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="date"
                    style={campoEstilo}
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setFiltroDimension("");
                      setFiltroRegion("");
                      setBusqueda("");
                      setFiltroFecha("");
                    }}
                    style={botonGris}
                  >
                    Limpiar Filtros
                  </button>
                </div>
              </div>

              {/* LISTADO DE TARJETAS */}
              {!montado ? (
                <p className="text-gray-500 text-sm">Cargando base de datos...</p>
              ) : resultados.length === 0 ? (
                <p className="text-gray-500 text-sm italic text-center py-8">
                  No se encontraron registros con los filtros actuales.
                </p>
              ) : (
                <div className="space-y-4">
                  {resultados.map((reg) => {
                    const interp = completarInterrogantesPorDefecto(reg);
                    return (
                      <article
                        key={reg.id}
                        className="border border-gray-200 rounded-lg bg-white p-4 flex flex-col sm:flex-row gap-4 items-start shadow-xs hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                              {reg.categoria}
                            </span>
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                              {reg.regionRIP || "Ámbito Nacional"}
                            </span>
                            <span className="text-xs text-gray-500">Fecha: {reg.fecha}</span>
                          </div>

                          <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug uppercase">
                            {reg.titulo}
                          </h3>

                          <p className="text-xs sm:text-sm text-gray-700 mb-2.5 leading-relaxed whitespace-pre-line">
                            <strong className="text-gray-900">
                              {reg.jurisdiccion || reg.ubicacion || "JURISDICCIÓN"}:
                            </strong>{" "}
                            {reg.descripcion}
                          </p>

                          {/* INTERROGANTES BÁSICOS FUNDAMENTALES */}
                          <div className="bg-slate-50 border border-slate-200 rounded p-2.5 mb-3 text-xs text-slate-800 space-y-1">
                            <div>
                              <strong>Qué:</strong> {interp.que}
                            </div>
                            <div>
                              <strong>Quién:</strong> {interp.quien}
                            </div>
                            <div>
                              <strong>Cuándo:</strong> {interp.cuando}
                            </div>
                            <div>
                              <strong>Cómo:</strong> {interp.como}
                            </div>
                            <div>
                              <strong>Dónde:</strong> {interp.donde}
                            </div>
                          </div>

                          {reg.url && (
                            <div className="mb-2.5 text-xs">
                              <a
                                href={reg.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 font-bold underline break-all hover:text-blue-900"
                              >
                                Abrir noticia periodística: {reg.url}
                              </a>
                            </div>
                          )}

                          <div className="flex flex-wrap justify-between items-center text-xs border-t border-gray-100 pt-2.5 gap-2">
                            <span className="text-emerald-700 font-semibold">
                              {reg.ubicacion || reg.jurisdiccion || "Ámbito Nacional"}
                            </span>

                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => abrirVistaRIPIndividual(reg)}
                                style={{
                                  ...botonInstitucional,
                                  background: "#0c231d",
                                  padding: "4px 10px",
                                  fontSize: "11px",
                                }}
                              >
                                Ver RIP / PDF
                              </button>

                              <button
                                type="button"
                                onClick={() => setNoticiaAmpliada(reg)}
                                style={{
                                  ...botonInstitucional,
                                  padding: "4px 8px",
                                  fontSize: "11px",
                                }}
                              >
                                Ampliar
                              </button>

                              <button
                                type="button"
                                onClick={() => iniciarEdicion(reg)}
                                className="text-gray-600 font-semibold hover:text-gray-900"
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                onClick={() => eliminar(reg.id)}
                                className="text-red-600 font-semibold hover:text-red-800"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="w-full sm:w-44 h-28 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-200">
                          <img
                            src={
                              reg.imagen ||
                              obtenerImagenUnica(reg.id, reg.titulo + " " + reg.descripcion)
                            }
                            alt={reg.titulo}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </main>
      )}

      {/* SOLAPA 2: CARGAR NOVEDADES RIP */}
      {solapaActiva === "subir" && (
        <main className="no-print max-w-4xl w-full mx-auto p-3 sm:p-6 flex-1 space-y-6">
          {!modoEdicion && (
            <div className="space-y-6">
              <section className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border-2 border-emerald-700">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-base font-bold text-[#0c231d] uppercase tracking-wide">
                    Subir Archivo de Texto o JSON al RIP
                  </h2>
                  <button
                    type="button"
                    onClick={cancelarEdicion}
                    className="text-xs font-bold text-gray-500 hover:text-gray-800 cursor-pointer"
                  >
                    ← Volver al RIP
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-600">Sección / Región RIP</label>
                    <select
                      style={campoEstilo}
                      value={regionCargaRapida}
                      onChange={(e) => setRegionCargaRapida(e.target.value)}
                    >
                      {ESTRUCTURA_TERRITORIAL.filter((r) => r !== "Todas las Regiones").map(
                        (reg, idx) => (
                          <option key={idx} value={reg}>
                            {reg}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-600">
                      Jurisdicción / Provincia
                    </label>
                    <input
                      style={campoEstilo}
                      value={jurisdiccionCargaRapida}
                      onChange={(e) => setJurisdiccionCargaRapida(e.target.value)}
                      placeholder="Ej: MISIONES, JUJUY, CABA..."
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-600">Dimensión / Eje</label>
                    <select
                      style={campoEstilo}
                      value={dimensionCargaRapida}
                      onChange={(e) => setDimensionCargaRapida(e.target.value)}
                    >
                      {DIMENSIONES_INFORMATIVAS.filter(
                        (d) => d !== "Todas las Dimensiones"
                      ).map((dim, idx) => (
                        <option key={idx} value={dim}>
                          {dim}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-600">Localidad / Detalle</label>
                    <input
                      style={campoEstilo}
                      value={ubicacionCargaRapida}
                      onChange={(e) => setUbicacionCargaRapida(e.target.value)}
                      placeholder="Ej: Posadas, Misiones..."
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-600">
                      Enlace de la Noticia (URL)
                    </label>
                    <input
                      type="url"
                      style={campoEstilo}
                      value={urlCargaRapida}
                      onChange={(e) => setUrlCargaRapida(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-emerald-600 rounded-lg cursor-pointer bg-emerald-50/60 hover:bg-emerald-100/70 transition-colors">
                  <div className="text-center px-4">
                    <p className="text-sm font-bold text-[#0c231d]">
                      Seleccionar archivo (.txt, .csv, .json) para cargar al RIP
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      La primera línea se toma como título y el resto como desarrollo
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".txt,.json,.csv"
                    onChange={manejarSubidaArchivoSimple}
                    className="hidden"
                  />
                </label>
              </section>

              <section className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-300">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">
                  Pegar Texto Directamente para el RIP
                </h2>
                <form onSubmit={publicarTextoPegado} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-600">
                      Enlace de la Noticia (URL opcional)
                    </label>
                    <input
                      type="url"
                      style={campoEstilo}
                      value={urlCargaRapida}
                      onChange={(e) => setUrlCargaRapida(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <textarea
                    style={{ ...campoEstilo, height: "130px", resize: "vertical" }}
                    value={textoPegadoRapido}
                    onChange={(e) => setTextoPegadoRapido(e.target.value)}
                    placeholder="Pegá aquí el título en la primera línea y debajo el desarrollo de la novedad..."
                  />
                  <button type="submit" style={botonInstitucional}>
                    Publicar Novedad en el RIP
                  </button>
                </form>
              </section>
            </div>
          )}

          {/* FORMULARIO MANUAL DETALLADO */}
          <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                {modoEdicion ? "Editar Registro RIP" : "Carga Manual Detallada RIP"}
              </h2>
              {modoEdicion && (
                <button
                  type="button"
                  onClick={cancelarEdicion}
                  className="text-xs font-bold text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  ← Cancelar
                </button>
              )}
            </div>

            <form onSubmit={registrar} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700">Título de la Novedad *</label>
                  <input
                    style={campoEstilo}
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    placeholder="Ej: OPERATIVO CONJUNTO EN ZONA FRONTERIZA..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Jurisdicción / Provincia *
                  </label>
                  <input
                    style={campoEstilo}
                    value={jurisdiccion}
                    onChange={(e) => setJurisdiccion(e.target.value)}
                    placeholder="Ej: MISIONES, JUJUY, CABA..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700">Sección / Región RIP</label>
                  <select
                    style={campoEstilo}
                    value={regionRIP}
                    onChange={(e) => setRegionRIP(e.target.value)}
                  >
                    {ESTRUCTURA_TERRITORIAL.filter((r) => r !== "Todas las Regiones").map(
                      (reg, idx) => (
                        <option key={idx} value={reg}>
                          {reg}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700">Dimensión / Eje</label>
                  <select
                    style={campoEstilo}
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    {DIMENSIONES_INFORMATIVAS.filter(
                      (d) => d !== "Todas las Dimensiones"
                    ).map((dim, idx) => (
                      <option key={idx} value={dim}>
                        {dim}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700">Fecha</label>
                  <input
                    type="date"
                    style={campoEstilo}
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700">Desarrollo del Hecho *</label>
                <textarea
                  style={{ ...campoEstilo, height: "90px", resize: "vertical" }}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  placeholder="Desarrollo completo de la información de prensa en lenguaje claro..."
                />
              </div>

              {/* INTERROGANTES BÁSICOS FUNDAMENTALES */}
              <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-2.5">
                <div className="text-xs font-bold text-slate-800 uppercase">
                  Interrogantes Básicos Fundamentales
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Qué</label>
                    <input
                      style={campoEstilo}
                      value={que}
                      onChange={(e) => setQue(e.target.value)}
                      placeholder="¿Qué sucedió?"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Quién</label>
                    <input
                      style={campoEstilo}
                      value={quien}
                      onChange={(e) => setQuien(e.target.value)}
                      placeholder="¿Quiénes intervienen?"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Cuándo</label>
                    <input
                      style={campoEstilo}
                      value={cuando}
                      onChange={(e) => setCuando(e.target.value)}
                      placeholder="¿Cuándo ocurrió?"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Cómo</label>
                    <input
                      style={campoEstilo}
                      value={como}
                      onChange={(e) => setComo(e.target.value)}
                      placeholder="¿Cómo se desarrolló?"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700">Dónde</label>
                  <input
                    style={campoEstilo}
                    value={donde}
                    onChange={(e) => setDonde(e.target.value)}
                    placeholder="¿Dónde ocurrió?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700">Medio / Fuente</label>
                  <input
                    style={campoEstilo}
                    value={fuente}
                    onChange={(e) => setFuente(e.target.value)}
                    placeholder="Ej: Medio local / Portal de noticias..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Enlace de la Noticia Periodística (URL)
                  </label>
                  <input
                    type="url"
                    style={campoEstilo}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Selección Rápida de Jurisdicción
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {UBICACIONES_REFERENCIA.map((ref, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => seleccionarReferencia(ref)}
                      className="bg-slate-100 border border-slate-300 px-2 py-1 rounded text-[11px] font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer"
                    >
                      {ref.nombre}
                    </button>
                  ))}
                </div>

                <input
                  style={campoEstilo}
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  placeholder="Localidad o punto de referencia..."
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button type="submit" style={botonInstitucional}>
                  {modoEdicion ? "Actualizar Registro RIP" : "Publicar en el RIP"}
                </button>
                <button type="button" onClick={cancelarEdicion} style={botonGris}>
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        </main>
      )}

      {/* MODAL AMPLIAR NOTICIA */}
      {noticiaAmpliada && (
        <div className="no-print fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white max-w-2xl w-full rounded-lg overflow-hidden shadow-2xl border border-gray-300 max-h-[90vh] flex flex-col">
            <div className="bg-[#0c231d] text-white px-5 py-3.5 flex justify-between items-center">
              <span className="text-xs bg-[#14362b] px-2.5 py-1 rounded font-bold text-emerald-400">
                {noticiaAmpliada.regionRIP || "Ámbito Nacional"} • {noticiaAmpliada.categoria}
              </span>
              <button
                type="button"
                onClick={() => setNoticiaAmpliada(null)}
                className="text-white text-lg font-bold hover:text-gray-300 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {noticiaAmpliada.imagen && (
                <div className="w-full h-60 rounded overflow-hidden border border-gray-200">
                  <img
                    src={noticiaAmpliada.imagen}
                    alt={noticiaAmpliada.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{formatearFechaLargaES(noticiaAmpliada.fecha)}</span>
                {noticiaAmpliada.fuente && <span>• Fuente: {noticiaAmpliada.fuente}</span>}
              </div>

              <h2 className="text-xl font-bold text-gray-900 leading-snug uppercase">
                {noticiaAmpliada.titulo}
              </h2>

              <div className="bg-slate-50 p-3.5 rounded border border-gray-200 text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                <strong>{noticiaAmpliada.jurisdiccion || "JURISDICCIÓN"}:</strong>{" "}
                {noticiaAmpliada.descripcion}
              </div>

              {(() => {
                const interp = completarInterrogantesPorDefecto(noticiaAmpliada);
                return (
                  <div className="bg-emerald-50/60 p-3.5 rounded border border-emerald-200 text-xs text-gray-800 space-y-1.5">
                    <div className="font-bold uppercase text-[#0c231d]">
                      Interrogantes Básicos Fundamentales
                    </div>
                    <div>
                      <strong>Qué:</strong> {interp.que}
                    </div>
                    <div>
                      <strong>Quién:</strong> {interp.quien}
                    </div>
                    <div>
                      <strong>Cuándo:</strong> {interp.cuando}
                    </div>
                    <div>
                      <strong>Cómo:</strong> {interp.como}
                    </div>
                    <div>
                      <strong>Dónde:</strong> {interp.donde}
                    </div>
                  </div>
                );
              })()}

              <div className="border-t border-gray-200 pt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const reg = noticiaAmpliada;
                    setNoticiaAmpliada(null);
                    abrirVistaRIPIndividual(reg);
                  }}
                  style={{ ...botonInstitucional, background: "#0c231d" }}
                >
                  Generar Documento RIP / PDF
                </button>

                {noticiaAmpliada.url && (
                  <a
                    href={noticiaAmpliada.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-sky-600 text-white px-3.5 py-2 rounded text-xs font-bold hover:bg-sky-700"
                  >
                    Ir a la Noticia Periodística
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DOCUMENTO RIP (FORMATO MODELO ENFOQUE 360) */}
      {reportesParaRIP && (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4 overflow-y-auto">
          <div className="bg-white max-w-[820px] w-full rounded shadow-2xl max-h-[94vh] flex flex-col">
            <div className="no-print bg-[#0c231d] text-white px-5 py-3 flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400">
                ENFOQUE 360 — RESUMEN DE INFORMACIÓN DE PRENSA (RIP) —{" "}
                {formatearFechaLargaES(fechaParteRIP)}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={ejecutarImpresionRIP}
                  className="bg-emerald-600 text-white border-none px-3.5 py-1.5 rounded font-bold text-xs hover:bg-emerald-700 cursor-pointer"
                >
                  Imprimir / Guardar PDF
                </button>
                <button
                  type="button"
                  onClick={() => setReportesParaRIP(null)}
                  className="bg-slate-700 text-white border-none px-3 py-1.5 rounded font-bold text-xs hover:bg-slate-800 cursor-pointer"
                >
                  Cerrar ✕
                </button>
              </div>
            </div>

            <div
              id="documento-rip-imprimible"
              className="p-8 overflow-y-auto font-sans text-black bg-white flex-1"
            >
              <div className="text-center mb-6">
                <div className="text-xs font-bold tracking-wider uppercase text-gray-700">
                  ENFOQUE 360
                </div>
                <div className="text-sm font-bold tracking-wide uppercase text-black mt-0.5">
                  Resumen de Información de Prensa
                </div>
                <div className="text-xs font-semibold text-gray-800 mt-1">
                  {formatearFechaLargaES(fechaParteRIP)}
                </div>
              </div>

              {seccionesAgrupadasRIP.map((grupo) => (
                <div key={grupo.nombre} className="mb-6">
                  <div className="text-xs font-bold uppercase text-black border-b border-black pb-1 mb-3">
                    {grupo.nombre}
                  </div>

                  <div className="space-y-4">
                    {grupo.items.map((item) => {
                      const interp = completarInterrogantesPorDefecto(item);
                      return (
                        <div key={item.id} className="text-xs leading-relaxed">
                          <div className="font-bold uppercase text-black mb-0.5">
                            {item.titulo}
                          </div>
                          <div className="text-gray-900 text-justify mb-1.5">
                            <span className="font-bold">
                              {(item.jurisdiccion || item.ubicacion || "JURISDICCIÓN").toUpperCase()}:
                            </span>{" "}
                            {item.descripcion}
                          </div>
                          <div className="text-gray-800 pl-2 border-l-2 border-gray-400 space-y-0.5 mb-1">
                            <div>
                              <span className="font-bold">Qué:</span> {interp.que}
                            </div>
                            <div>
                              <span className="font-bold">Quién:</span> {interp.quien}
                            </div>
                            <div>
                              <span className="font-bold">Cuándo:</span> {interp.cuando}
                            </div>
                            <div>
                              <span className="font-bold">Cómo:</span> {interp.como}
                            </div>
                            <div>
                              <span className="font-bold">Dónde:</span> {interp.donde}
                            </div>
                          </div>
                          {item.url && (
                            <div className="text-[11px] text-blue-800 break-all mt-0.5">
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-blue-950"
                              >
                                {item.url}
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-400 pt-3 mt-8 text-center text-[11px] font-semibold text-gray-800">
                ENFOQUE 360
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
