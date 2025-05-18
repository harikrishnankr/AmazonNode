import { NextFunction, Request, Response, Router } from "express";
import { requestValidator } from "@utils/requestValidator";
import { CreateProductRequest } from "@dto/products.dto";
import { ProductService } from "@services/product.service";
import { ProductRepository } from "@repository/product/product.repository";

const productRouter = Router();
const productsService = new ProductService(new ProductRepository());

productRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { errors, input } = await requestValidator(
        CreateProductRequest,
        req.body
      );
      if (errors) {
        return res.error("product.create_failure", 400, errors);
      }
      const data = await productsService.createProduct(input);
      return res.success(data, "product.create_success");
    } catch (error) {
      next(error);
    }
  }
);

productRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const products = await productsService.getAllProducts();
      return res.success(products, "product.get_all_success");
    } catch (error) {
      next(error);
    }
  }
);

export default productRouter;
