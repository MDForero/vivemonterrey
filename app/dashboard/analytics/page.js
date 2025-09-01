'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function QRAnalytics() {
  const supabase = createClient() 
  const [analytics, setAnalytics] = useState([])
  const [summary, setSummary] = useState({})
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    
    // Obtener escaneos con información del QR y negocios
    const { data: scansData, error: scansError } = await supabase
      .from('qr_scans')
      .select(`
        *,
        qr_codes!inner(
          *,
          businesses(
            id,
            name,
            categories(name)
          )
        )
      `)
      .gte('scanned_at', dateRange.start)
      .lte('scanned_at', dateRange.end + 'T23:59:59')
      .order('scanned_at', { ascending: false })
    
    if (scansData) {
      setAnalytics(scansData)
      calculateSummary(scansData)
    }
    
    setLoading(false)
  }

  console.log(analytics)

  const calculateSummary = (data) => {
    const summary = {
      totalScans: data.length,
      uniqueQRs: new Set(data.map(s => s.qr_code_id)).size,
      byCategory: {},
      byBusiness: {},
      byDevice: {},
      byBrowser: {},
      byCountry: {},
      byDay: {},
      byHour: {}
    }

    data.forEach(scan => {
      // Por categoría
      const category = scan.qr_codes?.businesses?.categories?.name || 'Sin categoría'
      summary.byCategory[category] = (summary.byCategory[category] || 0) + 1

      // Por negocio
      const business = scan.qr_codes?.businesses?.name || 'Desconocido'
      summary.byBusiness[business] = (summary.byBusiness[business] || 0) + 1

      // Por dispositivo
      const device = scan.device_type || 'Unknown'
      summary.byDevice[device] = (summary.byDevice[device] || 0) + 1

      // Por navegador
      const browser = scan.browser || 'Unknown'
      summary.byBrowser[browser] = (summary.byBrowser[browser] || 0) + 1

      // Por país
      const country = scan.country || 'Unknown'
      summary.byCountry[country] = (summary.byCountry[country] || 0) + 1

      // Por día
      const day = new Date(scan.scanned_at).toLocaleDateString()
      summary.byDay[day] = (summary.byDay[day] || 0) + 1

      // Por hora
      const hour = new Date(scan.scanned_at).getHours()
      summary.byHour[hour] = (summary.byHour[hour] || 0) + 1
    })

    setSummary(summary)
  }

  const exportToCSV = () => {
    const headers = [
      'Fecha', 'Hora', 'QR Code', 'Negocio', 'Categoría', 
      'IP', 'Dispositivo', 'Navegador', 'País', 'Ciudad', 
      'UTM Source', 'UTM Medium', 'UTM Campaign'
    ]
    const rows = analytics.map(scan => [
      new Date(scan.scanned_at).toLocaleDateString(),
      new Date(scan.scanned_at).toLocaleTimeString(),
      scan.qr_codes?.name || '',
      scan.qr_codes?.businesses?.name || '',
      scan.qr_codes?.businesses?.categories?.name || '',
      scan.ip_address || '',
      scan.device_type || '',
      scan.browser || '',
      scan.country || '',
      scan.city || '',
      scan.utm_source || '',
      scan.utm_medium || '',
      scan.utm_campaign || ''
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `qr-analytics-${dateRange.start}-${dateRange.end}.csv`
    a.click()
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Analytics de QR - Vive Monterrey
      </h1>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha inicio
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha fin
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            📥 Exportar CSV
          </button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Escaneos</h3>
          <p className="text-3xl font-bold text-green-600">
            {summary.totalScans || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">QRs Únicos</h3>
          <p className="text-3xl font-bold text-blue-600">
            {summary.uniqueQRs || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Promedio Diario</h3>
          <p className="text-3xl font-bold text-purple-600">
            {summary.byDay ? 
              Math.round(summary.totalScans / Object.keys(summary.byDay).length) || 0
              : 0
            }
          </p>
        </div>
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Dispositivos */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Por Dispositivo</h3>
          {Object.entries(summary.byDevice || {})
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([device, count]) => (
              <div key={device} className="flex justify-between items-center mb-1">
                <span className="text-sm capitalize">{device}</span>
                <span className="font-bold text-blue-600">{count}</span>
              </div>
            ))
          }
        </div>

        {/* Navegadores */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Por Navegador</h3>
          {Object.entries(summary.byBrowser || {})
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([browser, count]) => (
              <div key={browser} className="flex justify-between items-center mb-1">
                <span className="text-sm">{browser}</span>
                <span className="font-bold text-purple-600">{count}</span>
              </div>
            ))
          }
        </div>

        {/* Países */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Por País</h3>
          {Object.entries(summary.byCountry || {})
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([country, count]) => (
              <div key={country} className="flex justify-between items-center mb-1">
                <span className="text-sm">{country || 'N/A'}</span>
                <span className="font-bold text-orange-600">{count}</span>
              </div>
            ))
          }
        </div>

        {/* Horas pico */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Horas Pico</h3>
          {Object.entries(summary.byHour || {})
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([hour, count]) => (
              <div key={hour} className="flex justify-between items-center mb-1">
                <span className="text-sm">{hour}:00</span>
                <span className="font-bold text-red-600">{count}</span>
              </div>
            ))
          }
        </div>
      </div>

      {/* Top Negocios */}
      {summary.byBusiness && Object.keys(summary.byBusiness).length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Top Negocios
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(summary.byBusiness)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 8)
              .map(([business, count]) => (
                <div key={business} className="bg-gray-50 p-2 rounded">
                  <p className="text-sm font-medium">{business}</p>
                  <p className="text-lg font-bold text-green-600">{count}</p>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* Top Categorías */}
      {summary.byCategory && Object.keys(summary.byCategory).length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Por Categorías
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(summary.byCategory)
              .sort(([,a], [,b]) => b - a)
              .map(([category, count]) => (
                <div key={category} className="bg-gray-50 p-2 rounded">
                  <p className="text-sm font-medium">{category}</p>
                  <p className="text-lg font-bold text-indigo-600">{count}</p>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* Tabla de escaneos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p>Cargando datos...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Fecha/Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    QR Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Negocio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Dispositivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Navegador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ubicación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    IP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analytics.map((scan) => (
                  <tr key={scan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(scan.scanned_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="font-medium">{scan.qr_codes?.name}</div>
                      <div className="text-xs text-gray-500">{scan.qr_codes?.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>{scan.qr_codes?.businesses?.name}</div>
                      <div className="text-xs text-gray-500">
                        {scan.qr_codes?.businesses?.categories?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 capitalize">
                        {scan.device_type || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">
                        {scan.browser || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>{scan.country || 'N/A'}</div>
                      <div className="text-xs text-gray-500">{scan.city || ''}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {scan.ip_address}
                      {scan.utm_source && (
                        <div className="text-xs text-orange-600">
                          UTM: {scan.utm_source}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}