import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="ff-footer">
      <div className="container ff-footer-inner">
        <div className="brand">
          <div className="logoBox" />
          <div>
            <div className="brand-title">Hemanth FF Store</div>
            <div className="brand-sub">Premium Free Fire Accounts</div>
          </div>
        </div>
        <div className="links">
          <a href="mailto:support@hemanthff.com">support@hemanthff.com</a>
          <a href="https://wa.me/9163033XXXXX?text=Hello%20Hemanth%20FF%20Support%2C%20I%20need%20help%20with%20Free%20Fire%20account%20purchase." target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://instagram.com/hemanth_ff_store" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://youtube.com/@HemanthFF" target="_blank" rel="noreferrer">YouTube</a>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div className="sig">Made with ❤️ by Hemanth FF</div>
      </div>
    </footer>
  )
}
