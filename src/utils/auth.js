const ADMIN = { email: 'admin@hemanthff.com', password: 'Hemanth@123' }
export function currentUser(){ const raw = localStorage.getItem('ffs_current_user'); return raw ? JSON.parse(raw) : null }
export function isLoggedIn(){ return !!currentUser() }
export function logout(){ localStorage.removeItem('ffs_current_user') }
export function isAdmin(){ const u = currentUser(); return !!u && u.role === 'admin' }
export function registerCustomer(email, password){
  email = (email||'').trim().toLowerCase()
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok:false, msg:'Invalid email' }
  if(!password || password.length < 6) return { ok:false, msg:'Password must be 6+ chars' }
  const users = JSON.parse(localStorage.getItem('ffs_users')||'[]')
  if(users.find(u=>u.email===email)) return { ok:false, msg:'Email already registered' }
  users.push({ email, password })
  localStorage.setItem('ffs_users', JSON.stringify(users))
  return { ok:true }
}
export function loginCustomer(email, password){
  email = (email||'').trim().toLowerCase()
  const users = JSON.parse(localStorage.getItem('ffs_users')||'[]')
  const found = users.find(u=>u.email===email && u.password===password)
  if(!found) return { ok:false, msg:'Invalid email or password' }
  localStorage.setItem('ffs_current_user', JSON.stringify({ role:'customer', email }))
  return { ok:true }
}
export function loginAdmin(email, password){
  if(email===ADMIN.email && password===ADMIN.password){
    localStorage.setItem('ffs_current_user', JSON.stringify({ role:'admin', email }))
    return { ok:true }
  }
  return { ok:false, msg:'Invalid admin credentials' }
}
