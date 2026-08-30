import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '@src/app/shared/interfaces/category.interface';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private readonly firestore = inject(Firestore);

    getCategories(): Observable<Category[]> {
        const categoriesRef = collection(this.firestore, 'categories');
        const q = query(categoriesRef, orderBy('created_at', 'desc'));
        return collectionData(q, { idField: 'id' }) as Observable<Category[]>;
    }
}
