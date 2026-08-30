import { Routes } from '@angular/router';
import { Home } from '@src/app/features/home/home';
import { Catalog } from '@src/app/features/catalog/catalog';
import { ProductDetail } from '@src/app/features/catalog/components/product-detail/product-detail';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'catalog',
        component: Catalog,
    },
    {
        path: 'catalog/:id',
        component: ProductDetail,
    },
];
