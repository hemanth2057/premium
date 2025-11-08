import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { isLoggedIn, currentUser } from '../utils/auth'
import { addOrder } from '../utils/atStore'

const UPI_ID = 'hemanthdummani@ybl'
const NOTE_TEXT = 'Hemanth FF Purchase'
const PN_NAME = 'HemanthFF'
const WHATSAPP_NUMBER = '916303302128'

function isValidUTR(raw) {
  if (!raw) return false
  const tx = raw.toString().trim().toUpperCase().replace(/\s+/g, '')
  const pureDigits = /^[0-9]{12,16}$/.test(tx)
  const bankPref = /^[A-Z]{3,5}[0-9]{10,16}$/.test(tx)
  return (pureDigits || bankPref)
}

export default function UpiPayment(){
  const loc = useLocation()
  const nav = useNavigate()
  const [txId,setTxId] = useState('')
  const [status,setStatus] = useState('')

  useEffect(()=>{
    if(!isLoggedIn()) nav('/login?next=' + encodeURIComponent('/pay' + loc.search))
  },[])

  const params = useMemo(()=> new URLSearchParams(loc.search), [loc.search])
  const title = params.get('title') || 'Free Fire Account'
  const price = params.get('price') || '0'
  const tr = useMemo(()=> 'HFS' + Date.now(), [])

  const upiLink = useMemo(()=> {
    const q = new URLSearchParams({ pa: UPI_ID, pn: PN_NAME, am: String(price), cu: 'INR', tn: NOTE_TEXT, tr })
    return 'upi://pay?' + q.toString()
  }, [price, tr])

  const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(upiLink)

  function submitTx(){
    const tx = (txId || '').trim()
    if(!isValidUTR(tx)){ setStatus('Your Transaction ID is invalid'); return }
    const buyer = currentUser()?.email || ''
    addOrder({ title, price, txId: tx, tr, note: NOTE_TEXT, when: new Date().toISOString(), user: buyer, status: 'pending' })
    setStatus('Submitted. We will verify your payment soon. Opening WhatsApp...')
    setTxId('')
    const message = [
      '🔥 HEMANTH FF STORE 🔥','',
      `🛒 Product: ${title}`,`💰 Amount: ₹${price}`,`🔖 Ref: ${tr}`,`⚡ TXN: ${tx}`,'',
      '⏳ Please verify & deliver account.'
    ].join('\n')
    const wa = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message)
    setTimeout(()=> window.open(wa, '_blank'), 700)
  }

  return (
    <div className="container" style={{maxWidth:600, margin:'36px auto'}}>
      <div className="card">
        <div className="pill">Secure UPI Payment</div>
        <h2 style={{margin:'.4rem 0 0'}}>Complete your purchase</h2>
        <p className="small">Scan the QR or open your UPI app. Paste your Transaction ID to confirm.</p>
        <div style={{margin:'10px 0'}}>
          <div><b>Item:</b> {title}</div>
          <div><b>Amount:</b> ₹{price}</div>
          <div><b>UPI ID:</b> {UPI_ID}</div>
          <div><b>Note:</b> {NOTE_TEXT}</div>
          <div><b>Ref:</b> {tr}</div>
        </div>
        <div style={{margin:'12px 0'}}>
          <div style={{background:'#fff',display:'inline-block',padding:10,borderRadius:10}}>
            <img src={qrUrl} width="250" height="250" alt="UPI QR" />
          </div>
        </div>
        <div className="row" style={{margin:'12px 0'}}>
          <a className="btn" href={upiLink}>Pay in UPI App</a>
          <Link className="btn secondary" to="/">Back to Store</Link>
        </div>
        <input className="input" placeholder="Enter Transaction ID" value={txId} onChange={e=>setTxId(e.target.value)} />
        <div className="row" style={{marginTop:10}}>
          <button className="btn" onClick={submitTx}>Submit</button>
        </div>
        <p className="small" style={{marginTop:8}}>{status}</p>
      </div>
    </div>
  )
}
