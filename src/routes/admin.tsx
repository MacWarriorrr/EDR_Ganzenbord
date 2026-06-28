import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminComponent,
})

function AdminComponent() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const res = await fetch('/api/get-evaluations', {
        headers: {
          'x-admin-password': password
        }
      })
      
      const json = await res.json()
      
      if (!res.ok) {
        throw new Error(json.error || 'Fout bij ophalen gegevens. (Mogelijk draait de Cloudflare backend niet lokaal)')
      }
      
      setData(json.data || [])
      setIsAuthenticated(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const exportToCSV = () => {
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csvRows = []
    
    // Header row
    csvRows.push(headers.join(','))
    
    // Data rows
    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header]
        // Escape quotes and wrap in quotes to handle commas/newlines in text
        const escaped = ('' + (val !== null && val !== undefined ? val : '')).replace(/"/g, '""')
        return `"${escaped}"`
      })
      csvRows.push(values.join(','))
    }
    
    const csvString = csvRows.join('\n')
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `evaluaties-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md border border-stone-200">
        <h1 className="text-2xl font-bold text-stone-800 mb-6">Beheerders Login</h1>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 border border-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wachtwoord
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border-stone-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-auto py-2">
            {isLoading ? 'Laden...' : 'Inloggen'}
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-full overflow-x-auto bg-stone-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-stone-800">Evaluatieresultaten</h1>
        <div className="space-x-4 flex">
          <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700 text-white font-medium">
            Exporteer CSV
          </Button>
          <Button onClick={() => { setIsAuthenticated(false); setPassword(''); setData([]) }} variant="outline" className="bg-white border-stone-300 text-stone-700 hover:bg-stone-100 font-medium">
            Uitloggen
          </Button>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-xl shadow-sm border border-stone-200">
          <p className="text-stone-600 text-lg">Er zijn nog geen evaluaties ingevuld.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-100 text-stone-700 border-b border-stone-200">
              <tr>
                {Object.keys(data[0]).map(key => (
                  <th key={key} className="p-3 font-semibold uppercase tracking-wider text-xs">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-blue-50 transition-colors">
                  {Object.keys(row).map(key => (
                    <td key={key} className="p-3 text-stone-800 max-w-[200px] truncate" title={String(row[key] !== null ? row[key] : '')}>
                      {String(row[key] !== null ? row[key] : '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
