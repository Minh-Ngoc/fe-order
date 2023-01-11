import config from '../config';
import Home from '../pages/Home';
import Bill from '../pages/Bill';
import BillAdd from '../pages/Bill/BillAdd';

import Product from '../pages/Product';
import ProductAdd from '../pages/Product/ProductAdd';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null},

    { path: config.routes.bill, component: Bill, layout: null},
    { path: config.routes.bill + '/create', component: BillAdd, layout: null},

    { path: config.routes.product, component: Product, layout: null},
    { path: config.routes.product + '/create', component: ProductAdd, layout: null},
]

export { publicRoutes };