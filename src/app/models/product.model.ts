export interface Product {    
    id: number;
    name: string;
    brand: string;
    image: string;
    price: number;
    originalPrice?: number;
    isOrganic?: boolean;
    deliveryTime: number;
    weights: string[];
}
