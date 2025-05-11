import { NextFunction, Request, Response, Router } from "express";
import { requestValidator } from "../utils/requestValidator";
import { CreateProductRequest } from "../dto/products.dto";
import { ProductService } from "../services/product.service";
import { ProductRepository } from "../repository/product/product.repository";

const productRouter = Router();
const productsService = new ProductService(new ProductRepository());

productRouter.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { errors, input } = await requestValidator(
      CreateProductRequest,
      req.body
    );
    if (errors) {
      return res.status(400).json(errors);
    }
    const data = await productsService.createProduct(input);
    return res.status(201).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
});

export default productRouter;
