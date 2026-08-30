import { Injectable, inject } from '@angular/core';
import {
    Firestore,
    collection,
    collectionData,
    doc,
    docData,
    query,
    orderBy,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Product } from '@src/app/shared/interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private readonly firestore = inject(Firestore);

    getActiveProducts(): Observable<Product[]> {
        const productsRef = collection(this.firestore, 'products');
        const q = query(productsRef, orderBy('created_at', 'desc'));
        return (collectionData(q, { idField: 'id' }) as Observable<Product[]>).pipe(
            map((products) => products.filter((p) => p.is_active)),
        );
    }

    getProductById(id: string): Observable<Product | undefined> {
        const docRef = doc(this.firestore, 'products', id);
        return docData(docRef, { idField: 'id' }) as Observable<Product | undefined>;
    }
}
