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

    get isOutOfStock(): boolean {
        const p = this.product();
        return p.is_stock && p.stock_quantity !== null && p.stock_quantity <= 0;
    }

    get hasDiscount(): boolean {
        const p = this.product();
        return p.discount_price !== null && p.discount_price < p.price;
    }
}
