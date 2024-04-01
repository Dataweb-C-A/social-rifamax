const routes = [
  {
    role: "admin",
    routes: ['/', '/my-profile', '/purchases', '/my-cart']
  },
  {
    role: 'influencer',
    routes: ['/', '/my-profile']
  },
  {
    role: 'visitor',
    routes: ['/raffles']
  }
]