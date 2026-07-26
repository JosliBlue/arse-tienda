import { Routes } from '@angular/router';
import { Home } from '@src/app/features/home/home';
import { Catalog } from '@src/app/features/catalog/catalog';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'catalog',
        component: Catalog,
    },
];
