import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@src/app/shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product-card',
    imports: [RouterLink, CurrencyPipe],
    templateUrl: './product-card.html',
    styleUrl: './product-card.css',
})
export class ProductCard {
    product = input.required<Product>();
    categoryName = input<string>('');

    get currentVariant() {
        const variants = this.product().variants ?? [];
        return (
            variants.find(
                (variant) => !variant.is_stock || (variant.stock_quantity ?? 0) > 0,
            ) ?? variants[0] ?? null
        );
    }

    get currentVariantType(): string {
        return this.currentVariant?.type === 'color' ? 'Color' : 'Estilo';
    }

    get shouldShowVariantLabel(): boolean {
        const firstVariant = this.product().variants?.[0];
        return !!this.currentVariant && this.currentVariant.id !== firstVariant?.id;
    }

    get currentPrice(): number {
        return this.currentVariant?.price ?? this.product().price;
    }

    get currentDiscountPrice(): number | null {
        return this.currentVariant?.discount_price ?? this.product().discount_price;
    }

    get isOutOfStock(): boolean {
        const p = this.product();
        if (p.variants?.length) {
            return p.variants.every(
                (variant) => variant.is_stock && (variant.stock_quantity ?? 0) <= 0,
            );
        }
        return p.is_stock && p.stock_quantity !== null && p.stock_quantity <= 0;
    }

    get hasDiscount(): boolean {
        const discountPrice = this.currentDiscountPrice;
        return discountPrice !== null && discountPrice < this.currentPrice;
    }
}
