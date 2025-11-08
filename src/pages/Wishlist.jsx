import React from 'react'
import { Link } from 'react-router-dom'
import { getWishlist, toggleWishlist } from '../utils/atStore'

export default function Wishlist(){
  const items = getWishlist()
  return (
    <div className="container" style={{padding:'24px 0'}}>
      <div className="card">
        <div className="pill">Your Wishlist</div>
        {items.length===0 ? <p className="small" style={{marginTop:8}}>No items saved.</p> : (
          <div className="grid" style={{marginTop:10}}>
            {items.map(p=>(
              <article className="card grid3" key={p.id}>
                <div className="thumb"><img src={p.images[0]} alt="" /></div>
                <div className="row">
                  <div><div style={{fontWeight:800}}>{p.title}</div><div className="small">IN</div></div>
                  <div className="price">₹{p.price}</div>
                </div>
                <div className="row" style={{marginTop:10}}>
                  <Link className="btn" to={`/account/${p.id}`}>View</Link>
                  <button className="btn secondary" onClick={()=>{toggleWishlist(p.id); location.reload()}}>Remove</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
