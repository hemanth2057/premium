import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isLoggedIn, currentUser, logout, isAdmin } from '../utils/auth'

export default function Navbar(){
  const nav = useNavigate()
  const user = currentUser()
  const doLogout = () => { logout(); nav('/') }
  return (
    <nav className="navbar" style={{position:'sticky', top:0, zIndex:50, backdropFilter:'blur(10px)', background:'linear-gradient(180deg,rgba(15,23,42,.75),rgba(15,23,42,.35))', borderBottom:'1px solid rgba(124,58,237,.18)'}}>
      <div className="container nav-inner" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0'}}>
        <Link to="/" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none',color:'#e5e7eb',fontWeight:800}}>
          <div style={{width:34,height:34,borderRadius:10,background:'radial-gradient(circle at 30% 30%, var(--neon2), transparent 55%), radial-gradient(circle at 70% 70%, var(--neon1), transparent 55%), #0f172a',boxShadow:'0 0 12px rgba(34,211,238,.6), inset 0 0 16px rgba(124,58,237,.55)'}} />
          Hemanth FF Store
        </Link>
        <div className="nav-links" style={{display:'flex',gap:12,alignItems:'center'}}>
          <Link to="/#shop" style={{color:'#cbd5e1',textDecoration:'none',fontWeight:600,padding:'8px 10px',borderRadius:8}}>Accounts</Link>
          <Link to="/wishlist" style={{color:'#cbd5e1',textDecoration:'none',fontWeight:600,padding:'8px 10px',borderRadius:8}}>Wishlist</Link>
          {isAdmin() ? <Link to="/admin" style={{color:'#cbd5e1',textDecoration:'none',fontWeight:600,padding:'8px 10px',borderRadius:8}}>Admin</Link> : <Link to="/admin-login" style={{color:'#cbd5e1',textDecoration:'none',fontWeight:600,padding:'8px 10px',borderRadius:8}}>Admin</Link>}
          {!isLoggedIn() ? (<>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn secondary">Register</Link>
            </>) : (<>
              <span className="pill" title={user?.email || ''}>{user?.email || 'Logged in'}</span>
              <button className="btn secondary" onClick={doLogout}>Logout</button>
            </>)
          }
        </div>
      </div>
    </nav>
  )
}
