import React, { useState } from 'react'
export default function ImageCarousel({ images = [] }){
  const [i,setI] = useState(0)
  const prev = ()=> setI((i-1+images.length)%images.length)
  const next = ()=> setI((i+1)%images.length)
  return (
    <div className="carousel">
      <div className="main" style={{height:320,borderRadius:14,overflow:'hidden',background:'#0e162b',marginBottom:10,display:'flex',alignItems:'center',justifyContent:'center'}}>
        {images.length>0 && <img src={images[i]} alt="" style={{maxHeight:'100%',maxWidth:'100%',objectFit:'contain'}} />}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
        <button className="btn secondary" onClick={prev}>◀</button>
        <button className="btn secondary" onClick={next}>▶</button>
      </div>
      <div style={{display:'flex',gap:8,overflow:'auto',paddingBottom:6}}>
        {images.map((src,idx)=>(
          <img key={idx} src={src} style={{width:80,height:60,objectFit:'cover',borderRadius:8,opacity:idx===i?1:.7,cursor:'pointer',border:'2px solid '+(idx===i?'rgba(34,211,238,.7)':'transparent')}} onClick={()=>setI(idx)} />
        ))}
      </div>
    </div>
  )
}
