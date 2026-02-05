import React, { useState } from 'react'
import ProfileView from './components/ProfileView'
import ProjectsList from './components/ProjectsList'
import SearchBox from './components/SearchBox'
import Toast from './components/Toast'

export default function App() {
  const [toast, setToast] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill)
    showToast(`Filtering projects by: ${skill}`, 'info')
  }

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    animation: 'fadeIn 0.8s ease-out'
  }

  const headerStyle = {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    marginBottom: '30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden'
  }

  const titleStyle = {
    fontSize: '2.8em',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    margin: '0 0 10px 0',
    fontWeight: '800',
    letterSpacing: '-0.5px'
  }

  const mainContentStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '30px',
    marginTop: '20px'
  }

  const mediaQueryStyle = {
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr'
    }
  }

  return (
    <div style={containerStyle}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div style={headerStyle}>
        <h1 style={titleStyle}>Me-API Developer Playground</h1>
        <p style={{color: '#666', fontSize: '1.1em', marginBottom: '30px'}}>
          Explore developer profiles and projects with real-time API integration
        </p>
        <SearchBox onSearchComplete={() => showToast('Search completed!', 'success')} />
      </div>

      <div style={{...mainContentStyle, ...mediaQueryStyle['@media (max-width: 1024px)']}}>
        <div>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            height: 'fit-content'
          }}>
            <h2 style={{
              fontSize: '1.8em',
              color: '#333',
              margin: '0 0 20px 0',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>👨‍💻</span> Developer Profile
            </h2>
            <ProfileView 
              id={1} 
              onSkillClick={handleSkillSelect}
              onLoad={() => showToast('Profile loaded successfully!', 'success')}
            />
          </div>
        </div>

        <div>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
              paddingBottom: '20px',
              borderBottom: '2px solid #f0f2f5'
            }}>
              <h2 style={{
                fontSize: '1.8em',
                color: '#333',
                margin: 0,
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span>🚀</span> Featured Projects
              </h2>
              {selectedSkill && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#e3f2fd',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontWeight: '500'
                }}>
                  Filtering by: {selectedSkill}
                  <button 
                    onClick={() => setSelectedSkill(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.2em',
                      cursor: 'pointer',
                      color: '#666',
                      padding: '0 5px'
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <ProjectsList 
              skill={selectedSkill}
              onProjectClick={(project) => showToast(`Opening ${project.title}`, 'info')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}