import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@src/app/app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideFirebaseApp(() =>
            initializeApp({
                apiKey: 'AIzaSyBV5PqEioYeGvVvFw77layA9VTzvSCxmh0',
                authDomain: 'arse-tienda.firebaseapp.com',
                projectId: 'arse-tienda',
                storageBucket: 'arse-tienda.firebasestorage.app',
                messagingSenderId: '459444078547',
                appId: '1:459444078547:web:e14aca199459f009599126',
            })
        ),
        provideFirestore(() => getFirestore()),
    ],
};
