import { Product } from "@models/product.model";

export interface IProductRepository {
  create(input: Product): Promise<Product>;
  getAll(): Promise<Product[]>
}
