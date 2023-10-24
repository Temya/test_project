import { Product } from "./product";

export interface Products {
    limit: number,
    skip: number,
    total: number,
    products: Product[]
}

export const ProductFileConfig = ["title","description","price","brand","category"];