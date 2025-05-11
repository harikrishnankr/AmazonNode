import { Product } from "../../models/product.model";
import { prisma } from "../../utils/prisma";
import { IProductRepository } from "./product.interface";

export class ProductRepository implements IProductRepository {
  create(input: Product) {
    return prisma.product.create({
      data: input,
    });
  }
}
