import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '@src/app/shared/services/product.service';
import { CategoryService } from '@src/app/shared/services/category.service';
import {
    Product,
    ProductVariant,
    ProductVariantType,
} from '@src/app/shared/interfaces/product.interface';

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
    selectedVariant = signal<ProductVariant | null>(null);
    loading = signal(true);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) return;

        this.productService.getProductById(id).subscribe((product) => {
            if (product) {
                this.product.set(product);
                const firstAvailableVariant = product.variants?.find(
                    (variant) => !this.isVariantOutOfStock(variant),
                );
                this.selectedVariant.set(firstAvailableVariant ?? product.variants?.[0] ?? null);
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

    selectVariant(variant: ProductVariant): void {
        if (this.isVariantOutOfStock(variant)) return;
        this.selectedVariant.set(variant);
    }

    isVariantOutOfStock(variant: ProductVariant): boolean {
        return variant.is_stock && (variant.stock_quantity ?? 0) <= 0;
    }

    get variantsByType(): Array<{ type: ProductVariantType; variants: ProductVariant[] }> {
        const variants = (this.product()?.variants ?? []).slice(1);
        return (['color', 'style'] as ProductVariantType[])
            .map((type) => ({
                type,
                variants: variants.filter((variant) => variant.type === type),
            }))
            .filter((group) => group.variants.length > 0);
    }

    get variantTypeLabel(): Record<ProductVariantType, string> {
        return { color: 'Color', style: 'Estilo' };
    }

    get currentPrice(): number {
        const p = this.product();
        return this.selectedVariant()?.price ?? p?.price ?? 0;
    }

    get currentDiscountPrice(): number | null {
        const p = this.product();
        return this.selectedVariant()?.discount_price ?? p?.discount_price ?? null;
    }

    get currentStockControlled(): boolean {
        const p = this.product();
        const variant = this.selectedVariant();
        return variant ? variant.is_stock : (p?.is_stock ?? false);
    }

    get currentStockQuantity(): number | null {
        const p = this.product();
        const variant = this.selectedVariant();
        return variant?.is_stock ? variant.stock_quantity : (p?.stock_quantity ?? null);
    }

    get hasDiscount(): boolean {
        const discountPrice = this.currentDiscountPrice;
        return discountPrice !== null && discountPrice < this.currentPrice;
    }

    get isOutOfStock(): boolean {
        const quantity = this.currentStockQuantity;
        return this.currentStockControlled && quantity !== null && quantity <= 0;
    }

    get discountPercentage(): number {
        const discountPrice = this.currentDiscountPrice;
        if (!discountPrice || !this.currentPrice) return 0;
        return Math.round(((this.currentPrice - discountPrice) / this.currentPrice) * 100);
    }
}
