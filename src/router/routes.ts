export const dynamicRoutes = [
  {
    path: '/about',
    name: 'About',
    meta: { title: '关于我们' },
    children: [
      {
        path: 'about1',
        name: 'About1',
        component: () => import('@/views/About.vue'),
        meta: { title: '关于我们1' },
      },
      {
        path: 'about2',
        name: 'About2',
        component: () => import('@/views/About2.vue'),
        meta: { title: '关于我们2' },
      },
      {
        path: 'about3',
        name: 'About3',
        component: () => import('@/views/About3.vue'),
        meta: { title: '关于我们3' },
      },
    ],
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('@/views/Me.vue'),
    meta: { title: '联系我' },
  },
]
