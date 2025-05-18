import { IProductRepository } from "@repository/product/product.interface";
import { ApiError } from "@utils/errors/ApiError";

export class ProductService {
  private _repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this._repository = repository;
  }

  async createProduct(input: any) {
    const product = await this._repository.create(input);
    if (!product.id) {
      throw new Error("product.create_failure");
    }

    return product;
  }

  async getAllProducts() {
    const products = await this._repository.getAll();
    if (!products?.length) {
      throw new ApiError("product.get_all_failure");
    }

    return products;
  }
}
