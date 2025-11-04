import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerCustomer } from '../utils/auth'

export default function Register(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [msg,setMsg] = useState('')
  const nav = useNavigate()
  function submit(){
    const r = registerCustomer(email, password)
    if(r.ok){ setMsg('Registered! You can login now.'); setTimeout(()=>nav('/login'),800) }
    else setMsg(r.msg || 'Registration failed')
  }
  return (
    <div className="container" style={{maxWidth:520, margin:'36px auto'}}>
      <div className="card">
        <div className="pill">Create Account</div>
        <h2 style={{margin:'.4rem 0 0'}}>Register as Customer</h2>
        <input className="input" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} style={{marginTop:12}} />
        <input className="input" type="password" placeholder="Password (6+ chars)" value={password} onChange={e=>setPassword(e.target.value)} style={{marginTop:10}} />
        <div className="row" style={{marginTop:12}}>
          <button className="btn" onClick={submit}>Register</button>
        </div>
        <div className="small" style={{marginTop:8}}>{msg}</div>
      </div>
    </div>
  )
}
