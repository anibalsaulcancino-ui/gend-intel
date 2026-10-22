"use client";

import { useState, useEffect } from "react";

// ... (tus tipos e interfaces como NivelAlerta, Registro, etc., se mantienen igual)

export default function Home() {
  // ... (tus estados como registros, filtro, etc., se mantienen igual)

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Encabezado adaptable */}
      <header className="bg-[#0b291a] text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="bg-emerald-600 text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wide">
              Sistema OSINT
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
              GEND-INTEL
            </h1>
            <p className="text-xs text-emerald-200">
              Plataforma Autónoma de Monitoreo Estratégico y Análisis de Inteligencia
            </p>
          </div>
          <div className="text-left sm:text-right text-xs text-emerald-300">
            <p className="font-mono">🟢 Módulo Operativo Activo (Autor: A.S.C. 187)</p>
          </div>
        </div>
      </header>

      {/* Disposición Principal: En celular se apila verticalmente (flex-col), en PC se pone en 2 columnas (md:flex-row) */}
      <main className="max-w-7xl mx-auto p-3 sm:p-6 flex flex-col md:flex-row gap-6">
        
        {/* COLUMNA 1: Menú Lateral de Módulos (Ancho completo en celular, ancho fijo en PC) */}
        <aside className="w-full md:w-64 flex-shrink-0 bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-fit">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Módulos del Sistema
          </h2>
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <button className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-800 rounded-md font-semibold border border-emerald-200 text-left">
              📋 Panel de Reportes
            </button>
            <button className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded-md text-left">
              🗺️ Mapa Táctico
            </button>
            <button className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded-md text-left">
              🌐 Ingesta Externa RSS
            </button>
            <button className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded-md text-left">
              ✍️ Registro Manual
            </button>
          </nav>
        </aside>

        {/* COLUMNA 2: Registro de Inteligencia y Tarjetas (Flex-1 para ocupar el resto del espacio) */}
        <section className="flex-1 min-w-0 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                📊 REGISTRO DE INTELIGENCIA Y MONITOREO ABIERTO
              </h2>
            </div>
          </div>

          {/* Filtros adaptables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            <input
              type="text"
              placeholder="🔍 Filtrar por término clave..."
              className="w-full p-2 border rounded-md text-sm"
            />
            <select className="w-full p-2 border rounded-md text-sm bg-white">
              <option>Todas las Categorías</option>
            </select>
            <select className="w-full p-2 border rounded-md text-sm bg-white">
              <option>Todos los Niveles de Alerta</option>
            </select>
          </div>

          {/* Lista de Registros / Novedades (Las tarjetas ahora son 100% adaptables) */}
          <div className="space-y-4">
            {/* Ejemplo de Tarjeta de Alerta Adaptable */}
            <div className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4 bg-gray-50">
              <div className="w-full sm:w-48 h-36 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80"
                  alt="Drones Frontera"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded">
                      ALERTA: ALTO
                    </span>
                    <span className="text-xs text-gray-500">
                      Fecha: 2026-10-19 | Fuente: Monitor OSINT GEND-INTEL
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 leading-snug">
                    Detección de Vuelos de Drones No Autorizados en Zonas Operativas de Frontera
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                    Sistemas de vigilancia y radar de alerta temprana registraron incursiones aéreas no identificadas en franjas fronterizas limítrofes. Se intensifican los controles en pasos estratégicos.
                  </p>
                </div>
                <div className="mt-3 text-xs text-gray-500 font-medium">
                  📍 La Quiaca, Jujuy
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}