import React, { useEffect } from 'react'

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  }

  const borderColors = {
    success: '#4CAF50',
    error: '#f44336',
    info: '#2196F3',
    warning: '#ff9800'
  }

  const toastStyle = {
    position: 'fixed',
    top: '30px',
    right: '30px',
    background: 'white',
    padding: '20px 25px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    transform: 'translateX(150%)',
    transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    zIndex: 1000,
    maxWidth: '400px',
    borderLeft: `4px solid ${borderColors[type]}`
  }

  return (
    <div style={{...toastStyle, transform: 'translateX(0)'}}>
      <span style={{fontSize: '1.2em'}}>{icons[type]}</span>
      <span style={{flex: 1, fontWeight: '500'}}>{message}</span>
      <button 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.5em',
          cursor: 'pointer',
          color: '#999',
          padding: 0,
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#f5f5f5'
          e.target.style.color = '#333'
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'none'
          e.target.style.color = '#999'
        }}
      >
        ×
      </button>
    </div>
  )
}