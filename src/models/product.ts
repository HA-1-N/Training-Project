export interface IProduct {
    sku: string;
    name: string;
    category: string;
    price: number;
    amount: number;
    vendor: string;
    arrivalDate: string;
}

export interface IProductFormAdd {
    vendor: any;
    name: string;
    brand: any;
    condition?: string;
    usedCondition?: string;
    sku?: string;
    imagesOrder: any;
    categories: any;
    description: string;
}

export interface IProductFormAddValidation {
    vendor: any;
    name: string;
    brand: any;
    condition?: string;
    usedCondition?: string;
    sku?: string;
    imagesOrder: any;
    categories: any;
    description: string;
}