import { ProductsParams } from "./products-params";

export interface Products {
    limit: number,
    skip: number,
    total: number,
    products: ProductsParams[]
}
