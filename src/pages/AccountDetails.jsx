import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProduct, getOrders } from '../utils/store'
import { isLoggedIn, currentUser } from '../utils/auth'

const WA_NUMBER = '916303302128'

export default function AccountDetails() {
  const { id } = useParams()
  const nav = useNavigate()
  const product = getProduct(id)

  useEffect(() => {
    if (!product) nav('/')
  }, [product, nav])

  if (!product) return null

  const details = product.details || {}
  const [copied, setCopied] = useState({ email: false, pass: false })

  const email = details.loginEmail || ''
  const pass = details.loginPassword || ''

  const orders = useMemo(() => getOrders() || [], [])
  const me = currentUser()
  const hasPurchased = useMemo(() => {
    if (!me?.email) return false
    return orders.some(o => (o?.user || '').toLowerCase() === me.email.toLowerCase()
      && (o?.title || '') === product.title)
  }, [orders, me, product])

  const canReveal = isLoggedIn() && hasPurchased

  const waText = useMemo(() => {
    const lines = [
      'Hello Hemanth FF Support 👋',
      '',
      'I want to report an issue / need help.',
      `Account: ${product.title} (ID: ${product.id})`,
      `Price: ₹${product.price}`,
      '',
      'Please assist me. Thanks!'
    ]
    return encodeURIComponent(lines.join('\n'))
  }, [product])

  const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`

  const facts = [
    details.level ? `⭐ Level ${details.level}` : null,
    details.rank ? `🔥 ${details.rank}` : null,
    Array.isArray(details.bundles) ? `🎭 ${details.bundles.length} Bundles` : null,
    (details.region || 'India') ? `🌍 ${details.region || 'India'}` : null
  ].filter(Boolean)

  return (
    <div className="container" style={{ padding: '22px 0 88px' }}>
      <div className="ad2-grid card">
        <div className="ad2-gallery">
          <ImageSlider images={product.images} />
        </div>

        <div className="ad2-info">
          <div className="pill">Account Details</div>

          <h2 className="ad2-title">{product.title}</h2>

          {facts.length > 0 && (
            <div className="ad2-facts">
              {facts.map((f, i) => (
                <span key={i} className="ad2-chip">{f}</span>
              ))}
            </div>
          )}

          <div className="ad2-priceRow">
            <div className="price">₹{product.price}</div>
            <div className="ad2-mrp">₹{Math.round(product.price * 1.1)}</div>
          </div>

          <div className="ad2-specs">
            <Spec label="Level" value={details.level ?? '—'} />
            <Spec label="Region" value={details.region || 'India'} />
            <Spec label="Rank" value={details.rank || '—'} />
            <Spec label="Linked" value={details.linked || 'Gmail'} />
            <Spec label="Change Email" value={details.changeEmail || 'Yes'} />
            <Spec label="Account ID" value={details.accountId || '—'} />
            <Spec label="Name" value={details.accountName || '—'} />
          </div>

          {Array.isArray(details.bundles) && details.bundles.length > 0 && (
            <div className="ad2-bundles">
              <div className="lbl">Bundles & Skins</div>
              <div className="tag-row">
                {details.bundles.map((b, i) => (
                  <span key={i} className="tag neon-chip">{b}</span>
                ))}
              </div>
            </div>
          )}

          <div className="ad2-login">
            <div className="ad2-login-row">
              <span className="lbl">Login Email</span>
              <span className={'val mono ' + (!canReveal ? 'blurred' : '')}>
                {email || '— not attached —'}
              </span>
              <button
                className={'copy-pill ' + (copied.email ? 'copied' : '')}
                onClick={() => handleCopy(email, 'email', setCopied)}
                disabled={!canReveal || !email}
              >
                {canReveal ? (copied.email ? '✓ Copied' : 'Copy') : 'Locked'}
              </button>
            </div>

            <div className="ad2-login-row">
              <span className="lbl">Password</span>
              <span className={'val mono ' + (!canReveal ? 'blurred' : '')}>
                {canReveal ? (pass || '— not attached —') : '••••••••'}
              </span>
              <button
                className={'copy-pill ' + (copied.pass ? 'copied' : '')}
                onClick={() => handleCopy(pass, 'pass', setCopied)}
                disabled={!canReveal || !pass}
              >
                {canReveal ? (copied.pass ? '✓ Copied' : 'Copy') : 'Locked'}
              </button>
            </div>

            {!canReveal && (
              <div className="small ad2-lockMsg">
                Buy now to reveal email & password instantly
              </div>
            )}
          </div>

          <div className="ad2-actions">
            <BuyNowButton title={product.title} price={product.price} />
            <a className="btn secondary" href={waLink} target="_blank" rel="noreferrer">
              Report Issue on WhatsApp
            </a>
            <Link className="btn secondary" to="/">Back</Link>
          </div>
        </div>
      </div>

      <StickyBar title={product.title} price={product.price} />
      <Ad2Styles />
    </div>
  )
}

function handleCopy(text, key, setCopied) {
  if (!text) return
  navigator.clipboard.writeText(text).then(() => {
    setCopied(prev => ({ ...prev, [key]: true }))
    setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 1200)
  })
}

function Spec({ label, value }) {
  return (
    <div className="ad2-spec">
      <div className="spec-label">{label}</div>
      <div className="spec-val">{value}</div>
    </div>
  )
}

function BuyNowButton({ title, price }) {
  const nav = useNavigate()
  const onBuy = () => {
    const next = `/pay?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`
    if (!isLoggedIn()) nav(`/login?next=${encodeURIComponent(next)}`)
    else nav(next)
  }
  return <button className="btn" onClick={onBuy}>Buy Now</button>
}

function StickyBar({ title, price }) {
  const nav = useNavigate()
  const onBuy = () => {
    const next = `/pay?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`
    if (!isLoggedIn()) nav(`/login?next=${encodeURIComponent(next)}`)
    else nav(next)
  }
  return (
    <div className="ad2-sticky">
      <div className="ad2-sticky-inner">
        <div className="ad2-sticky-info">
          <div className="ad2-sticky-title">{title}</div>
          <div className="price">₹{price}</div>
        </div>
        <button className="btn" onClick={onBuy}>Buy Now</button>
      </div>
    </div>
  )
}

function ImageSlider({ images = [] }) {
  const [i, setI] = useState(0)
  const timerRef = useRef(null)
  const lastX = useRef(null)
  const total = images.length

  useEffect(() => {
    if (total <= 1) return
    timerRef.current = setInterval(() => setI(prev => (prev + 1) % total), 4000)
    return () => clearInterval(timerRef.current)
  }, [total])

  const to = (idx) => setI(((idx % total) + total) % total)
  const next = () => to(i + 1)
  const prev = () => to(i - 1)

  const onTouchStart = (e) => { lastX.current = e.touches[0].clientX }
  const onTouchMove = (e) => {
    if (lastX.current == null) return
    const dx = e.touches[0].clientX - lastX.current
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev()
      lastX.current = null
    }
  }
  const onTouchEnd = () => { lastX.current = null }

  if (total === 0) return null

  return (
    <div className="ad2-slider"
         onTouchStart={onTouchStart}
         onTouchMove={onTouchMove}
         onTouchEnd={onTouchEnd}>
      <div className="ad2-slideFrame">
        <img src={images[i]} alt="" />
      </div>
      <div className="ad2-dots">
        {images.map((_, idx) => (
          <button key={idx}
                  className={'ad2-dot ' + (i === idx ? 'active' : '')}
                  onClick={() => to(idx)}
                  aria-label={'Go to slide ' + (idx + 1)} />
        ))}
      </div>
    </div>
  )
}

function Ad2Styles() {
  return (
    <style>{`
/* Responsive 2-column on desktop, vertical on mobile */
.ad2-grid{
  display:grid;
  gap:16px;
  grid-template-columns: 1fr;
}
@media (min-width: 992px){
  .ad2-grid{ grid-template-columns: 1fr 1fr; } /* R3: 50/50 */
}

/* Gallery */
.ad2-slider{ margin-top: 6px; }
.ad2-slideFrame{
  height: 320px;
  border-radius:16px;
  overflow:hidden;
  background:#0e162b;
  display:flex;
  align-items:center;
  justify-content:center;
  border:1px solid var(--border);
}
.ad2-slideFrame img{
  max-width:100%;
  max-height:100%;
  object-fit:contain;
}
.ad2-dots{
  display:flex;
  gap:8px;
  justify-content:center;
  margin-top:10px;
}
.ad2-dot{
  width:10px; height:10px; border-radius:999px;
  border:1px solid rgba(255,255,255,.5);
  background:transparent; cursor:pointer;
}
.ad2-dot.active{
  background: var(--neon2);
  box-shadow: 0 0 10px rgba(34,211,238,.65);
}

/* Info side */
.ad2-title{ margin:.25rem 0 .35rem; font-weight:900; font-size:1.35rem }
.ad2-facts{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:8px }
.ad2-chip{
  padding:6px 10px; border-radius:999px; font-size:.82rem; font-weight:700; color:#e5e7eb;
  border:1px solid rgba(124,58,237,.35);
  background:linear-gradient(180deg, rgba(124,58,237,.14), rgba(34,211,238,.10));
  box-shadow:0 0 8px rgba(124,58,237,.22), inset 0 0 6px rgba(34,211,238,.18)
}
.ad2-priceRow{ display:flex; align-items:baseline; gap:10px; margin:6px 0 10px }
.ad2-mrp{ color:#94a3b8; text-decoration:line-through }

/* Specs grid */
.ad2-specs{
  display:grid; gap:10px; margin-top:6px;
  grid-template-columns: repeat(2, minmax(0,1fr));
}
@media (max-width:640px){ .ad2-specs{ grid-template-columns: 1fr } }
.ad2-spec{ padding:10px; border-radius:12px; background: rgba(255,255,255,.04); border:1px solid var(--border) }
.spec-label{ color:#94a3b8; font-size:.85rem; margin-bottom:4px }
.spec-val{ font-weight:800 }

/* Bundles */
.ad2-bundles{ margin-top:12px }

/* Login block */
.ad2-login{ margin-top:12px }
.ad2-login-row{
  display:grid; grid-template-columns: 110px 1fr auto;
  gap:10px; align-items:center; margin:8px 0;
}
.blurred{
  filter: blur(6px);
  user-select: none;
  pointer-events: none;
}
.copy-pill{
  padding:8px 14px; border-radius:999px; min-width:84px;
  border:1px solid rgba(124,58,237,.35);
  background: linear-gradient(180deg, rgba(124,58,237,.16), rgba(34,211,238,.12));
  color:#e5e7eb; font-weight:800; cursor:pointer; transition:.22s;
}
.copy-pill:hover{ transform: translateY(-1px); box-shadow: 0 0 10px rgba(124,58,237,.35) }
.copy-pill:disabled{ opacity:.5; cursor:not-allowed }
.copy-pill.copied{
  background:linear-gradient(180deg, rgba(34,197,94,.35), rgba(16,185,129,.25));
  border-color: rgba(16,185,129,.45)
}
.ad2-lockMsg{ margin-top:2px }

/* Actions */
.ad2-actions{ margin-top:14px; display:flex; gap:10px; flex-wrap:wrap }

/* Sticky bar */
.ad2-sticky{
  position: fixed; left:0; right:0; bottom:0;
  background: linear-gradient(180deg, rgba(15,23,42,.2), rgba(15,23,42,.75));
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(124,58,237,.25);
}
.ad2-sticky-inner{
  width:min(1150px,94%); margin:auto;
  display:flex; align-items:center; justify-content:space-between;
  gap:12px; padding:10px 0;
}
.ad2-sticky-info{ display:flex; align-items:baseline; gap:10px }
.ad2-sticky-title{ font-weight:900 }
`}</style>
  )
}