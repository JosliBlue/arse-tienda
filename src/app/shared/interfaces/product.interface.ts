export interface ProductImage {
    url: string;
    public_id: string;
}

export type ProductVariantType = 'color' | 'style';

export interface ProductVariant {
    id: string;
    type: ProductVariantType;
    name: string;
    price: number | null;
    discount_price: number | null;
    is_stock: boolean;
    stock_quantity: number | null;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discount_price: number | null;
    category_id: string | null;
    is_stock: boolean;
    stock_quantity: number | null;
    facebook_link: string | null;
    tags: string[];
    is_active: boolean;
    images: ProductImage[];
    variants?: ProductVariant[];
    created_at: string;
}
