export interface ProductImage {
    url: string;
    public_id: string;
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
    created_at: string;
}
