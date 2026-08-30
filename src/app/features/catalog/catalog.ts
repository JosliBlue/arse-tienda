import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ProductService } from '@src/app/shared/services/product.service';
import { CategoryService } from '@src/app/shared/services/category.service';
import { Product } from '@src/app/shared/interfaces/product.interface';
import { Category } from '@src/app/shared/interfaces/category.interface';
import { ProductCard } from '@src/app/features/catalog/components/product-card/product-card';

@Component({
    selector: 'app-catalog',
    imports: [ProductCard],
    templateUrl: './catalog.html',
    styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
    private readonly productService = inject(ProductService);
    private readonly categoryService = inject(CategoryService);

    products = signal<Product[]>([]);
    categories = signal<Category[]>([]);
    selectedCategoryId = signal<string | null>(null);
    searchQuery = signal('');
    loading = signal(true);

    filteredProducts = computed(() => {
        let result = this.products();
        const catId = this.selectedCategoryId();
        const query = this.searchQuery().toLowerCase().trim();

        if (catId) {
            result = result.filter((p) => p.category_id === catId);
        }

        if (query) {
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.tags?.some((t) => t.toLowerCase().includes(query)),
            );
        }

        return result;
    });

    ngOnInit(): void {
        this.productService.getActiveProducts().subscribe((products) => {
            this.products.set(products);
            this.loading.set(false);
        });

        this.categoryService.getCategories().subscribe((categories) => {
            this.categories.set(categories);
        });
    }

    selectCategory(categoryId: string | null): void {
        this.selectedCategoryId.set(categoryId);
    }

    onSearch(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchQuery.set(value);
    }

    getCategoryName(categoryId: string | null): string {
        if (!categoryId) return '';
        const cat = this.categories().find((c) => c.id === categoryId);
        return cat?.name ?? '';
    }
}
