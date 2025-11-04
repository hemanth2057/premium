import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProducts, toggleWishlist, inWishlist } from '../utils/store'
import { isLoggedIn } from '../utils/auth'

export default function Home() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('new')
  const [loading, setLoading] = useState(true)
  const products = getProducts()

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])

  const decorate = (p, idx) => {
    const tags = []
    if (idx < 2) tags.push('🔥 Trending')
    if (idx % 3 === 0) tags.push('✨ New')
    if (p.price >= 6000) tags.push('💎 Rare')
    const discount = p.price >= 6000 ? 20 : 10
    const mrp = Math.round(p.price * (100 + discount) / 100)
    return { ...p, tags, discount, mrp }
  }

  const enriched = useMemo(() => products.map((p, i) => decorate(p, i)), [products])

  const list = useMemo(() => {
    let arr = enriched.filter(x => x.title.toLowerCase().includes(q.trim().toLowerCase()))
    if (sort === 'asc') arr.sort((a, b) => a.price - b.price)
    if (sort === 'desc') arr.sort((a, b) => b.price - a.price)
    if (sort === 'new') arr = arr.slice().reverse()
    return arr
  }, [enriched, q, sort])

  const handleBuy = (item) => {
    const next = `/pay?title=${encodeURIComponent(item.title)}&price=${encodeURIComponent(item.price)}`
    if (!isLoggedIn()) nav(`/login?next=${encodeURIComponent(next)}`)
    else nav(next)
  }

  const toggle = (id, e) => { e?.stopPropagation(); toggleWishlist(id); nav('/', { replace: true }) }

  return (
    <div className="container" style={{ padding: '28px 0' }}>
      <header style={{ textAlign: 'center', marginBottom: 22 }}>
        <h1 className="page-title">⚡ Premium Free Fire Accounts</h1>
        <p className="page-sub">Trusted Store • Instant Delivery • UPI Secure Payment</p>
      </header>

      <section className="card control-card">
        <div className="row" style={{ alignItems: 'center' }}>
          <input className="input" placeholder="Search account name…" value={q} onChange={(e) => setQ(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
          <select className="input" value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: 220 }}>
            <option value="new">Sort: Newest</option>
            <option value="asc">Sort: Price Low → High</option>
            <option value="desc">Sort: Price High → Low</option>
          </select>
        </div>
      </section>

      <div className="grid">
        {loading ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : list.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} onBuy={() => handleBuy(item)} onWish={(e)=>toggle(item.id, e)} />
          ))}
      </div>

      <section className="card contact-card">
        <div className="pill">Contact</div>
        <h2 style={{ margin: '6px 0 10px' }}>Hemanth FF Support</h2>
        <div className="contact-grid">
          <div><div className="small">WhatsApp</div><a className="contact-link" href={`https://wa.me/9163033XXXXX?text=${encodeURIComponent('Hello Hemanth FF Support, I need help with Free Fire account purchase.')}`} target="_blank" rel="noreferrer">+91 63033XXXXX</a></div>
          <div><div className="small">Email</div><a className="contact-link" href="mailto:support@hemanthff.com">support@hemanthff.com</a></div>
          <div><div className="small">Instagram</div><a className="contact-link" href="https://instagram.com/hemanth_ff_store" target="_blank" rel="noreferrer">@hemanth_ff_store</a></div>
          <div><div className="small">YouTube</div><a className="contact-link" href="https://youtube.com/@HemanthFF" target="_blank" rel="noreferrer">HemanthFF</a></div>
        </div>
      </section>
    </div>
  )
}

function ProductCard({ item, onBuy, onWish, index }) {
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onMove = (e) => {
    const el = cardRef.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left; const y = e.clientY - rect.top
    const rotY = (x / rect.width - 0.5) * 8; const rotX = - (y / rect.height - 0.5) * 8
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`
    el.style.backgroundImage = `radial-gradient(450px 160px at ${x}px ${y}px, rgba(124,58,237,.18), transparent 70%)`
  }
  const onLeave = () => { const el = cardRef.current; if (!el) return; el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'; el.style.backgroundImage = 'none' }

  return (
    <article ref={cardRef} className={`card grid3 product-card ${visible ? 'fade-in-up' : ''}`} onMouseMove={onMove} onMouseLeave={onLeave} style={{ animationDelay: `${index * 90}ms` }}>
      <div className="thumb zoomable" style={{ position: 'relative' }}>
        <Link to={`/account/{item.id}`}><img src={item.images[0]} alt={item.title} /></Link>
        <div className={'heart ' + (inWishlist(item.id) ? 'filled bounce' : '')} onClick={onWish} title="Wishlist">{inWishlist(item.id) ? '❤️' : '🤍'}</div>
        <div className="discount-badge">-{item.discount}%</div>
      </div>
      <div className="tag-row">{item.tags.map((t, i) => (<span key={i} className="tag neon-chip">{t}</span>))}</div>
      <Link className="card-title" to={`/account/${item.id}`}>{item.title}</Link>
      <div className="row" style={{ alignItems: 'baseline', marginTop: 4 }}><div className="price">₹{item.price}</div><div className="small" style={{ textDecoration: 'line-through' }}>₹{item.mrp}</div></div>
      <div className="row" style={{ marginTop: 10 }}><button className="btn" onClick={onBuy}>Buy Now</button><Link className="btn secondary" to={`/account/${item.id}`}>View</Link></div>
    </article>
  )
}

function SkeletonCard() {
  return (
    <div className="card grid3 shimmer-card">
      <div className="shimmer" style={{ height: 180, borderRadius: 12, marginBottom: 10 }} />
      <div className="shimmer" style={{ height: 16, width: '60%', marginBottom: 8 }} />
      <div className="shimmer" style={{ height: 12, width: '40%' }} />
    </div>
  )
}
