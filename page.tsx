<div style={{ fontSize: "12px", color: "#64748b", marginBottom: "12px" }}>
            Visualización geoespacial de incidentes registrados y zonas de vigilancia prioritaria.
          </div>
          <div id="mapa-osint" style={{ width: "100%", height: "400px", borderRadius: "4px", border: "1px solid #cbd5e1" }}></div>
        </section>

        {/* INGESTA EXTERNA RSS */}
        <section id="modulo-ingesta" style={{ background: "#ffffff", padding: "20px", borderRadius: "6px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "15px", margin: "0 0 10px", color: "#0f172a", textTransform: "uppercase", fontWeight: "700" }}>
            🌐 Ingesta Externa Automática (Google Noticias Arg)
          </h2>
          <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 14px" }}>
            Seleccione un término estratégico o ingrese palabras clave para monitorear fuentes abiertas en tiempo real e integrarlas con un clic.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
            {TEMAS_OSINT_SUGERIDOS.map((tema, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPalabraClaveOSINT(tema);
                  consultarGoogleNoticiasArg(tema);
                }}
                style={{
                  background: palabraClaveOSINT === tema ? "#14362b" : "#f1f5f9",
                  color: palabraClaveOSINT === tema ? "#ffffff" : "#334155",
                  border: "1px solid #cbd5e1",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {tema}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <input
              style={{ ...campoEstilo, margin: 0 }}
              value={palabraClaveOSINT}
              onChange={(e) => setPalabraClaveOSINT(e.target.value)}
              placeholder="Término de sondeo externo..."
            />
            <button
              type="button"
              onClick={() => consultarGoogleNoticiasArg()}
              style={botonInstitucional}
            >
              {cargandoRSS ? "Sondeando..." : "Consultar Fuentes"}
            </button>
          </div>

          {errorRSS && <p style={{ color: "#dc2626", fontSize: "13px" }}>{errorRSS}</p>}

          {itemsRSS.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "350px", overflowY: "auto", border: "1px solid #e2e8f0", padding: "10px", borderRadius: "4px", background: "#f8fafc" }}>
              {itemsRSS.map((item, idx) => (
                <div key={idx} style={{ background: "#ffffff", padding: "10px", borderRadius: "4px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontSize: "13px", color: "#0f172a", display: "block", marginBottom: "3px" }}>{item.title}</strong>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>{item.pubDate} • {item.author}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => publicarDirectoDesdeRSS(item)}
                    style={{ ...botonInstitucional, background: "#16a34a", whiteSpace: "nowrap", padding: "6px 10px", fontSize: "11px" }}
                  >
                    📥 Integrar al Feed
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* REGISTRO MANUAL */}
        <section id="modulo-investigacion" style={{ background: "#ffffff", padding: "20px", borderRadius: "6px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h2 style={{ fontSize: "15px", margin: "0 0 10px", color: "#0f172a", textTransform: "uppercase", fontWeight: "700" }}>
            {modoEdicion ? "✏️ Editar Registro Operativo" : "✍️ Registro Manual de Inteligencia"}
          </h2>
          <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 14px" }}>
            Complete los campos requeridos para asentar un nuevo reporte o incidencia en la plataforma.
          </p>

          {mensaje && (
            <div style={{ padding: "10px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", borderRadius: "4px", fontSize: "13px", marginBottom: "14px", fontWeight: "600" }}>
              {mensaje}
            </div>
          )}

          <form onSubmit={registrar} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>Título del Reporte *</label>
                <input style={campoEstilo} value={titulo} onChange={(e) => setTitulo(e.target.value)} required placeholder="Ej: Operativo preventivo..." />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>Subtítulo / Bajada</label>
                <input style={campoEstilo} value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} placeholder="Breve síntesis complementaria..." />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>Categoría</label>
                <select style={campoEstilo} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  {CATEGORIAS_OSINT.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>Nivel de Alerta</label>
                <select style={campoEstilo} value={alerta} onChange={(e) => setAlerta(e.target.value as NivelAlerta)}>
                  {NIVELES_ALERTA.map((al, idx) => (
                    <option key={idx} value={al}>{al}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>Fecha</label>
                <input type="date" style={campoEstilo} value={fecha} onChange={(e) => setFecha(e.target.value)} required />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>Descripción / Análisis *</label>
              <textarea style={{ ...campoEstilo, height: "90px", resize: "vertical" }} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required placeholder="Desarrollo de la información o síntesis de inteligencia..." />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>Fuente de Información</label>
                <input style={campoEstilo} value={fuente} onChange={(e) => setFuente(e.target.value)} placeholder="Ej: Monitor OSINT / Diario Oficial..." />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>URL de Referencia (Enlace)</label>
                <input type="url" style={campoEstilo} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>Selección Rápida de Ubicación Geográfica</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
                {UBICACIONES_REFERENCIA.map((ref, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => seleccionarReferencia(ref)}
                    style={{ background: "#f1f5f9", border: "1px solid #cbd5e1", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", cursor: "pointer", fontWeight: "600", color: "#334155" }}
                  >
                    📍 {ref.nombre}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "8px" }}>
                <input style={campoEstilo} value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} placeholder="Ubicación o Zona..." />
                <input style={campoEstilo} value={latitud} onChange={(e) => setLatitud(e.target.value)} placeholder="Latitud (-27.5)" />
                <input style={campoEstilo} value={longitud} onChange={(e) => setLongitud(e.target.value)} placeholder="Longitud (-56.6)" />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>URL de Imagen Opcional (Dejar en blanco para asignación inteligente)</label>
              <input type="url" style={campoEstilo} value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="https://..." />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <button type="submit" style={botonInstitucional}>
                {modoEdicion ? "Actualizar Registro" : "Guardar en la Plataforma"}
              </button>
              {modoEdicion && (
                <button type="button" onClick={cancelarEdicion} style={botonGris}>
                  Cancelar Edición
                </button>
              )}
            </div>
          </form>
        </section>

      </main>
    </div>

    {/* MODAL AMPLIAR NOTICIA */}
    {noticiaAmpliada && (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
        <div style={{ background: "#ffffff", maxWidth: "700px", width: "100%", borderRadius: "6px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", border: "1px solid #cbd5e1", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#0c231d", color: "#ffffff", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", background: "#14362b", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold", color: "#4ade80" }}>
              {noticiaAmpliada.categoria}
            </span>
            <button type="button" onClick={() => setNoticiaAmpliada(null)} style={{ background: "none", border: "none", color: "#ffffff", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }}>
              ✕
            </button>
          </div>

          <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
            {noticiaAmpliada.imagen && (
              <div style={{ width: "100%", height: "240px", borderRadius: "4px", overflow: "hidden", marginBottom: "16px", border: "1px solid #cbd5e1" }}>
                <img src={noticiaAmpliada.imagen} alt={noticiaAmpliada.titulo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}

            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: "#64748b" }}>📅 {noticiaAmpliada.fecha}</span>
              {noticiaAmpliada.fuente && <span style={{ fontSize: "11px", color: "#64748b" }}>• Fuente: {noticiaAmpliada.fuente}</span>}
            </div>

            <h2 style={{ fontSize: "20px", color: "#0f172a", margin: "0 0 10px", fontWeight: "700", lineHeight: "1.3" }}>
              {noticiaAmpliada.titulo}
            </h2>

            {noticiaAmpliada.subtitulo && (
              <h3 style={{ fontSize: "14px", color: "#334155", margin: "0 0 14px", fontWeight: "600" }}>
                {noticiaAmpliada.subtitulo}
              </h3>
            )}

            <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "4px", border: "1px solid #e2e8f0", marginBottom: "14px", fontSize: "14px", lineHeight: "1.6", color: "#334155" }}>
              {noticiaAmpliada.descripcion}
            </div>

            {noticiaAmpliada.puntosClave && (
              <div style={{ background: "#fefce8", padding: "12px", borderRadius: "4px", border: "1px solid #fef08a", marginBottom: "14px", fontSize: "13px", color: "#713f12", whiteSpace: "pre-line" }}>
                <strong>Puntos Clave / Síntesis:</strong>
                <div style={{ marginTop: "4px" }}>{noticiaAmpliada.puntosClave}</div>
              </div>
            )}

            <div style={{ fontSize: "13px", color: "#047857", fontWeight: "600", marginBottom: "14px" }}>
              📍 Ubicación: {noticiaAmpliada.ubicacion || "Ámbito Nacional"}
            </div>

            {noticiaAmpliada.url && (
              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "12px" }}>
                <a href={noticiaAmpliada.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#0284c7", color: "#ffffff", padding: "8px 14px", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: "bold" }}>
                  🔗 Acceder a la Fuente Externa
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    )}

  </div>
);
}
