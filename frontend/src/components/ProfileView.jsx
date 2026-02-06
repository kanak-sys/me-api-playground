import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/+$/, '')

function buildUrl(path) {
  if (!API_BASE) return null
  return `${API_BASE}${path}`
}

export default function ProfileView({ id, onSkillClick, onLoad }) {
  const [data, setData] = useState(null)
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = buildUrl('/profile/')
    if (!url) {
      setErr('VITE_API_BASE not set. Please configure your frontend env variable.')
      setLoading(false)
      return
    }

    let canceled = false
    setLoading(true)

    axios.get(url)
      .then(r => {
        if (canceled) return
        setData(r.data)
        setErr(null)
        onLoad?.()
      })
      .catch(e => {
        if (canceled) return
        setErr(e?.response?.data || e.message || String(e))
        setData(null)
      })
      .finally(() => {
        if (!canceled) setLoading(false)
      })

    return () => { canceled = true }
  }, [id, onLoad]) // id left in deps if parent might request refetch

  // Styles (kept from your original)
  const profileHeaderStyle = { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', paddingBottom: '20px', borderBottom: '2px solid #f0f2f5' }
  const avatarStyle = { width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2em', color: 'white', fontWeight: 'bold' }
  const skeletonStyle = { background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'loading 1.5s infinite', borderRadius: '4px' }
  const skillTagStyle = { background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', color: '#333', padding: '6px 15px', borderRadius: '20px', fontSize: '0.9em', fontWeight: '500', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', border: 'none', cursor: 'pointer', margin: '4px' }

  if (loading) return (
    <div>
      <div style={{ ...skeletonStyle, height: '40px', width: '60%', marginBottom: '20px' }} />
      <div style={{ ...skeletonStyle, height: '20px', width: '80%', marginBottom: '15px' }} />
      <div style={{ ...skeletonStyle, height: '20px', width: '70%', marginBottom: '15px' }} />
    </div>
  )

  if (err) return (
    <div style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderRadius: 12, padding: 25, textAlign: 'center', border: '2px solid #ff6b6b' }}>
      <div style={{ fontSize: '3em', marginBottom: 15 }}>⚠️</div>
      <div>
        <h3 style={{ color: '#d32f2f', marginBottom: 10 }}>Oops! Something went wrong</h3>
        <p style={{ wordBreak: 'break-word' }}>{String(err)}</p>
        <button onClick={() => window.location.reload()} style={{ background: '#ff6b6b', color: 'white', border: 'none', padding: '10px 25px', borderRadius: 8, marginTop: 15, cursor: 'pointer', fontWeight: 600 }}>
          Retry
        </button>
      </div>
    </div>
  )

  if (!data) return null

  return (
    <div>
      <div style={profileHeaderStyle}>
        <div style={avatarStyle}>{String(data.name || '?').charAt(0)}</div>
        <div>
          <h3 style={{ fontSize: '1.8em', color: '#333', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
            {data.name}
            <span style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: '0.85em', fontWeight: 600 }}>
              ID: {data.id}
            </span>
          </h3>
          <p style={{ color: '#666', marginTop: 5 }}>Full Stack Developer</p>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 15, padding: '12px 0', borderBottom: '1px solid #f0f2f5' }}>
          <span style={{ display: 'inline-block', minWidth: 100, color: '#666', fontWeight: 600, fontSize: '0.95em', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</span>
          <div style={{ color: '#333', marginTop: 5 }}>
            <a href={`mailto:${data.email}`} style={{ color: '#2196F3', textDecoration: 'none' }}>{data.email}</a>
          </div>
        </div>

        <div style={{ marginBottom: 15, padding: '12px 0', borderBottom: '1px solid #f0f2f5' }}>
          <span style={{ display: 'inline-block', minWidth: 100, color: '#666', fontWeight: 600, fontSize: '0.95em', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Education</span>
          <div style={{ color: '#333', marginTop: 5, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.2em' }}>🎓</span>
            <span>{data.education}</span>
          </div>
        </div>

        <div style={{ marginBottom: 15, padding: '12px 0', borderBottom: '1px solid #f0f2f5' }}>
          <span style={{ display: 'inline-block', minWidth: 100, color: '#666', fontWeight: 600, fontSize: '0.95em', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skills</span>
          <div style={{ color: '#333', marginTop: 10, display: 'flex', flexWrap: 'wrap' }}>
            {data.skills.map(s => (
              <button key={s.id} style={skillTagStyle} onClick={() => onSkillClick?.(s.name)} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 15, padding: '12px 0' }}>
          <span style={{ display: 'inline-block', minWidth: 100, color: '#666', fontWeight: 600, fontSize: '0.95em', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Projects</span>
          <div style={{ color: '#333', marginTop: 10 }}>
            {data.projects.map(p => (
              <div key={p.id} style={{ background: '#f8f9fa', padding: '12px 15px', borderRadius: 8, borderLeft: '3px solid #4CAF50', marginBottom: 10 }}>
                <div style={{ fontWeight: 600, color: '#333', marginBottom: 5 }}>{p.title}</div>
                <div style={{ color: '#666', fontSize: '0.9em', lineHeight: 1.4 }}>{p.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
