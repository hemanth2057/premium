import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { isLoggedIn, loginCustomer } from '../utils/auth'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [msg,setMsg] = useState('')
  const nav = useNavigate()
  const loc = useLocation()
  useEffect(()=>{ if(isLoggedIn()) nav('/') },[])
  const nextPath = new URLSearchParams(loc.search).get('next') || '/'
  function submit(){
    const r = loginCustomer(email, password)
    if(r.ok) nav(nextPath); else setMsg(r.msg || 'Login failed')
  }
  return (
    <div className="container" style={{maxWidth:520, margin:'36px auto'}}>
      <div className="card">
        <div className="pill">Customer Login</div>
        <h2 style={{margin:'.4rem 0 0'}}>Email & Password</h2>
        <input className="input" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} style={{marginTop:12}} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{marginTop:10}} />
        <div className="row" style={{marginTop:12}}>
          <button className="btn" onClick={submit}>Login</button>
          <Link className="btn secondary" to="/register">Create Account</Link>
        </div>
        <div className="small" style={{marginTop:8}}>{msg}</div>
      </div>
    </div>
  )
}
