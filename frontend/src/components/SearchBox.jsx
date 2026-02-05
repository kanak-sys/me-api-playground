import React, {useState} from 'react'
import axios from 'axios'

export default function SearchBox({ onSearchComplete }){
  const [q, setQ] = useState('')
  const [result, setResult] = useState(null)
  const [searching, setSearching] = useState(false)

  function doSearch(e){
    e.preventDefault()
    if(!q) return
    
    setSearching(true)
    axios.get(`http://127.0.0.1:8000/api/search/?q=${encodeURIComponent(q)}`)
      .then(r=> {
        setResult(r.data)
        onSearchComplete?.()
      })
      .catch(e=> setResult({error: e.toString()}))
      .finally(() => setSearching(false))
  }

  const searchContainerStyle = {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px'
  }

  const searchFormStyle = {
    display: 'flex',
    gap: '15px',
    marginBottom: '25px'
  }

  const searchInputStyle = {
    flex: 1,
    padding: '15px 20px',
    border: '2px solid #e1e5e9',
    borderRadius: '12px',
    fontSize: '1em',
    transition: 'all 0.3s ease',
    background: '#f8f9fa'
  }

  const searchButtonStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }

  const resultItemStyle = {
    background: 'white',
    padding: '12px 15px',
    marginBottom: '8px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    borderLeft: '3px solid #667eea'
  }

  return (
    <div style={searchContainerStyle}>
      <h3 style={{
        fontSize: '1.5em',
        color: '#333',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span>🔍</span> Search API
      </h3>
      <form onSubmit={doSearch} style={searchFormStyle}>
        <input 
          value={q} 
          onChange={e=>setQ(e.target.value)} 
          placeholder="Search profiles and projects..." 
          style={searchInputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea'
            e.target.style.background = 'white'
            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e1e5e9'
            e.target.style.background = '#f8f9fa'
            e.target.style.boxShadow = 'none'
          }}
        />
        <button 
          type="submit" 
          style={searchButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'none'
          }}
          disabled={searching}
        >
          {searching ? (
            <>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Searching...
            </>
          ) : (
            'Search'
          )}
        </button>
      </form>
      
      {result && (
        <div style={{
          background: '#f8f9fa',
          borderRadius: '12px',
          padding: '20px',
          borderLeft: '4px solid #667eea'
        }}>
          {result.error ? (
            <div style={{color: '#f44336', padding: '10px'}}>{result.error}</div>
          ) : (
            <>
              <div style={{marginBottom: '20px'}}>
                <h4 style={{
                  color: '#555',
                  marginBottom: '10px',
                  paddingBottom: '5px',
                  borderBottom: '2px solid #e1e5e9'
                }}>
                  Projects ({result.projects.length})
                </h4>
                {result.projects.length ? (
                  result.projects.map(p=> (
                    <div 
                      key={p.id} 
                      style={resultItemStyle}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateX(5px)'
                        e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateX(0)'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      {p.title}
                    </div>
                  ))
                ) : <div style={{color: '#666', padding: '10px'}}>No projects found</div>}
              </div>
              <div>
                <h4 style={{
                  color: '#555',
                  marginBottom: '10px',
                  paddingBottom: '5px',
                  borderBottom: '2px solid #e1e5e9'
                }}>
                  Profiles ({result.profiles.length})
                </h4>
                {result.profiles.length ? (
                  result.profiles.map(pr=> (
                    <div 
                      key={pr.id} 
                      style={resultItemStyle}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateX(5px)'
                        e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateX(0)'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      {pr.name}
                    </div>
                  ))
                ) : <div style={{color: '#666', padding: '10px'}}>No profiles found</div>}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}