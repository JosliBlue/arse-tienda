import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '@src/app/shared/services/product.service';
import { CategoryService } from '@src/app/shared/services/category.service';
import { Product } from '@src/app/shared/interfaces/product.interface';

@Component({
    selector: 'app-product-detail',
    imports: [CurrencyPipe, RouterLink],
    templateUrl: './product-detail.html',
    styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly productService = inject(ProductService);
    private readonly categoryService = inject(CategoryService);

    product = signal<Product | null>(null);
    categoryName = signal('');
    selectedImageIndex = signal(0);
    loading = signal(true);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) return;

        this.productService.getProductById(id).subscribe((product) => {
            if (product) {
                this.product.set(product);
                this.loading.set(false);

                if (product.category_id) {
                    this.categoryService.getCategories().subscribe((categories) => {
                        const cat = categories.find((c) => c.id === product.category_id);
                        if (cat) this.categoryName.set(cat.name);
                    });
                }
            } else {
                this.loading.set(false);
            }
        });
    }

    selectImage(index: number): void {
        this.selectedImageIndex.set(index);
    }

    get hasDiscount(): boolean {
        const p = this.product();
        if (!p) return false;
        return p.discount_price !== null && p.discount_price < p.price;
    }

    get isOutOfStock(): boolean {
        const p = this.product();
        if (!p) return false;
        return p.is_stock && p.stock_quantity !== null && p.stock_quantity <= 0;
    }

    get discountPercentage(): number {
        const p = this.product();
        if (!p || !p.discount_price) return 0;
        return Math.round(((p.price - p.discount_price) / p.price) * 100);
    }
}
