import React from 'react'
import { getOrders } from '../utils/atStore'
import { isAdmin } from '../utils/auth'

export default function Admin(){
  if(!isAdmin()) return <div className="container" style={{padding:'24px'}}>Not authorized</div>
  const orders = getOrders().slice().reverse()
  return (
    <div className="container" style={{padding:'24px 0'}}>
      <div className="card">
        <div className="pill">Admin — Orders</div>
        {orders.length===0 ? <p className="small" style={{marginTop:8}}>No orders yet.</p> : (
          <div style={{overflowX:'auto', marginTop:10}}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead>
                <tr>
                  <th align="left">When</th>
                  <th align="left">Item</th>
                  <th align="left">Price</th>
                  <th align="left">TXN</th>
                  <th align="left">Ref</th>
                  <th align="left">Buyer</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o,i)=>(
                  <tr key={i}>
                    <td>{new Date(o.when).toLocaleString()}</td>
                    <td>{o.title}</td>
                    <td>₹{o.price}</td>
                    <td>{o.txId}</td>
                    <td>{o.tr}</td>
                    <td>{o.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
