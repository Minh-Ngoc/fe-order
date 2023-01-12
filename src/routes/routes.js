import config from '../config';
import Home from '../pages/Home';
import Order from '../pages/Order';
import OrderAdd from '../pages/Order/OrderAdd';
import OrderList from '../pages/Order/OrderList';

import Product from '../pages/Product';
import ProductAdd from '../pages/Product/ProductAdd';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null},

    { path: config.routes.order, component: Order, layout: null},
    { path: config.routes.order + '/create/:slug', component: OrderAdd, layout: null},
    { path: config.routes.order + '/list', component: OrderList, layout: null},

    { path: config.routes.product, component: Product, layout: null},
    { path: config.routes.product + '/create', component: ProductAdd, layout: null},
]

export { publicRoutes };