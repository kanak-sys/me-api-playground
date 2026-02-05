import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ProjectsList({ skill, onProjectClick }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [filteredCount, setFilteredCount] = useState(0)

  useEffect(() => {
    setLoading(true)
    const url = skill 
      ? `http://127.0.0.1:8000/api/projects/?skill=${encodeURIComponent(skill)}`
      : `http://127.0.0.1:8000/api/projects`
    
    axios.get(url)
      .then(r => {
        setProjects(r.data)
        setFilteredCount(r.data.length)
      })
      .catch(e => {
        console.error(e)
        setProjects([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [skill])

  const projectCardStyle = {
    background: 'white',
    borderRadius: '16px',
    padding: '25px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid #f0f2f5',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer'
  }

  const loadingSpinnerStyle = {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }

  if (loading) return (
    <div style={{textAlign: 'center', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
      <div style={loadingSpinnerStyle}></div>
      <p>Loading projects...</p>
    </div>
  )

  if (!projects.length) return (
    <div style={{textAlign: 'center', padding: '50px 20px'}}>
      <div style={{fontSize: '4em', marginBottom: '20px', opacity: '0.5'}}>📭</div>
      <h3 style={{color: '#333', marginBottom: '10px'}}>No projects found</h3>
      <p style={{color: '#666'}}>{skill ? `No projects match "${skill}"` : 'Start by adding some projects!'}</p>
    </div>
  )

  return (
    <div>
      {skill && (
        <div style={{
          background: '#f0f7ff',
          padding: '15px 20px',
          borderRadius: '12px',
          marginBottom: '25px',
          borderLeft: '4px solid #4dabf7'
        }}>
          Showing {filteredCount} project{filteredCount !== 1 ? 's' : ''} 
          matching: <span style={{
            background: '#4dabf7',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            marginLeft: '5px',
            fontWeight: '600'
          }}>
            {skill}
          </span>
        </div>
      )}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '25px'
      }}>
        {projects.map(p => (
          <div 
            key={p.id} 
            style={{
              ...projectCardStyle,
              animation: 'slideIn 0.5s ease-out',
              borderLeft: '5px solid #667eea'
            }}
            onClick={() => onProjectClick?.(p)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '15px'
            }}>
              <h4 style={{
                fontSize: '1.4em',
                color: '#333',
                margin: 0,
                fontWeight: '700',
                lineHeight: '1.3'
              }}>
                {p.title}
              </h4>
              <span style={{
                background: '#e8f4fd',
                color: '#2196F3',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.8em',
                fontWeight: '600'
              }}>
                #{p.id}
              </span>
            </div>
            
            <p style={{color: '#666', lineHeight: '1.6', marginBottom: '20px', fontSize: '0.95em'}}>
              {p.description}
            </p>
            
            {p.skills && p.skills.length > 0 && (
              <div style={{marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #f0f2f5'}}>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                  {p.skills.map(s => (
                    <span key={s.id} style={{
                      background: '#e8f5e9',
                      color: '#2e7d32',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '0.85em',
                      fontWeight: '500'
                    }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}