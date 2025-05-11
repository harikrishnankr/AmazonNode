import { IProductRepository } from "../repository/product/product.interface";

export class ProductService {
  private _repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this._repository = repository;
  }

  async createProduct(input: any) {
    const product = await this._repository.create(input);
    if (!product.id) {
      throw new Error("Unable to create product");
    }

    return product;
  }
}
