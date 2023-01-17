import config from '../config';
import DefaultLayout from '../layouts/DefaultLayout';

import Home from '../pages/Home';

import Order from '../pages/Order';
import OrderCreate from '../pages/Order/OrderCreate';
import OrderList from '../pages/Order/OrderList';
import OrderDetail from '../pages/Order/OrderDetail';

import Product from '../pages/Product';
import ProductAdd from '../pages/Product/ProductAdd';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },

    { path: config.routes.order, component: Order, layout: DefaultLayout},
    { path: config.routes.order + '/create/:slug', component: OrderCreate, layout: DefaultLayout},
    { path: config.routes.order + '/list', component: OrderList, layout: DefaultLayout},
    { path: config.routes.order + '/detail/:slug', component: OrderDetail, layout: DefaultLayout},

    { path: config.routes.product, component: Product, layout: DefaultLayout},
    { path: config.routes.product + '/create', component: ProductAdd, layout: DefaultLayout},
]

export { publicRoutes };