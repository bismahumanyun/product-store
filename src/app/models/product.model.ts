// src/app/models/product.model.ts
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

// src/app/models/user.model.ts
export interface User {
    id: number;
    email: string;
    username: string;
}