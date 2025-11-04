import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../utils/auth'

export default function AdminLogin(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [msg,setMsg] = useState('')
  const nav = useNavigate()
  function submit(){
    const r = loginAdmin(email, password)
    if(r.ok) nav('/admin'); else setMsg(r.msg || 'Login failed')
  }
  return (
    <div className="container" style={{maxWidth:520, margin:'36px auto'}}>
      <div className="card">
        <div className="pill">Admin Login</div>
        <h2 style={{margin:'.4rem 0 0'}}>Admin Access</h2>
        <input className="input" placeholder="admin email" value={email} onChange={e=>setEmail(e.target.value)} style={{marginTop:12}} />
        <input className="input" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} style={{marginTop:10}} />
        <div className="row" style={{marginTop:12}}>
          <button className="btn" onClick={submit}>Login</button>
        </div>
        <div className="small" style={{marginTop:8}}>{msg}</div>
      </div>
    </div>
  )
}
