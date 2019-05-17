import NotFound from './views/404.vue'
import Index from './views/index.vue'

let routes = [
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: '/'
    },
    {
        path: '/',
        name:'index',
        component: Index,
    },
];

export default routes;