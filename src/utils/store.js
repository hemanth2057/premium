export function getProducts() {
    const seeded = localStorage.getItem('ffs_products_seeded')
    if (!seeded) {
        const demo = [{
                id: 'a1',
                title: 'AMMU SONU FF ACCOUNT',
                price: 4999,
                images: ['/images/p1.jpg', '/images/p2.jpg', '/images/p3.jpg', '/images/p4.jpg', '/images/p5.jpg', '/images/pp5.jpg', '/images/p6.jpg', '/images/p7.jpg', '/images/p8.jpg', '/images/p9.jpg', '/images/p10.jpg', '/images/p11.jpg', '/images/p12.jpg', '/images/pp12.jpg', '/images/p13.jpg', '/images/p14.jpg', '/images/p15.jpg', '/images/p16.jpg', '/images/p17.jpg', '/images/p18.jpg', '/images/pp18.jpg', '/images/p19.jpg'],
                details: { level: 68, region: 'India', rank: 'Heroic', bundles: ['Obito', 'Bones', 'Vampires', 'Pushpa', 'Silver Beast'], linked: 'Gmail', changeEmail: 'Yes', accountId: '1893482500', accountName: 'AMMUxSONU' }
            }, {
                id: 'a2',
                title: 'SUMANTH_YT FF ACCOUNT',
                price: 7999,
                images: ['/images2/p0.jpg', '/images2/p1.jpg', '/images2/p2.jpg', '/images2/p3.jpg', '/images2/p4.jpg', '/images2/p5.jpg', '/images2/p6.jpg', '/images2/p7.jpg', '/images2/p8.jpg', '/images2/p9.jpg', '/images2/p10.jpg', '/images2/p11.jpg', '/images2/p12.jpg', '/images2/p13.jpg', '/images2/p14.jpg', '/images2/p15.jpg', '/images2/p16.jpg', '/images2/p17.jpg', '/images2/p18.jpg', ],
                details: { level: 69, region: 'India', rank: 'Platinum', bundles: ['COBRA BUNDLE', 'BLACK SIX PACK', 'OLD ELITE PASSES', 'NORMAL BUNDLE COMBINATIONS'], linked: 'Facebook', changeEmail: 'Yes', accountId: '3983401977', accountName: 'SUMANTH_YT' }
            }, {
                id: 'a3',
                title: 'SWAJAY ROX FF ACCOUNT',
                price: 7999,
                images: ['/images3/p0.jpg', '/images3/p1.jpg', '/images3/p2.jpg', '/images3/p3.jpg', '/images3/p4.jpg', '/images3/p5.jpg', '/images3/p6.jpg', '/images3/p7.jpg', '/images3/p8.jpg', '/images3/p9.jpg', '/images3/p10.jpg', '/images3/p11.jpg', '/images3/p12.jpg', '/images3/p13.jpg', '/images3/p14.jpg', '/images3/p15.jpg', '/images3/p16.jpg', '/images3/p17.jpg', '/images3/p18.jpg', '/images3/p19.jpg', ],
                details: { level: 65, region: 'India', rank: 'Heroic', bundles: ['Street-Thug', 'T-SHIRTS', 'StrongBinger'], linked: 'Gmail', changeEmail: 'Yes', accountId: '918273645', accountName: 'Ninja×Warrior' }
            }

        ]
        localStorage.setItem('ffs_products', JSON.stringify(demo))
        localStorage.setItem('ffs_products_seeded', '1')
    }
    return JSON.parse(localStorage.getItem('ffs_products') || '[]')
}
export function getProduct(id) { return getProducts().find(p => p.id === id) }
export function toggleWishlist(id) {
    const list = JSON.parse(localStorage.getItem('ffs_wishlist') || '[]')
    const i = list.indexOf(id)
    if (i >= 0) list.splice(i, 1);
    else list.push(id)
    localStorage.setItem('ffs_wishlist', JSON.stringify(list))
    return list
}
export function inWishlist(id) {
    const list = JSON.parse(localStorage.getItem('ffs_wishlist') || '[]')
    return list.includes(id)
}
export function getWishlist() {
    const ids = JSON.parse(localStorage.getItem('ffs_wishlist') || '[]')
    const all = getProducts()
    return all.filter(p => ids.includes(p.id))
}
export function addOrder(order) {
    const orders = JSON.parse(localStorage.getItem('ffs_orders') || '[]')
    orders.push(order)
    localStorage.setItem('ffs_orders', JSON.stringify(orders))
}
export function getOrders() { return JSON.parse(localStorage.getItem('ffs_orders') || '[]') }