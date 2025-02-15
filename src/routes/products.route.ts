import { Router, Request, Response } from "express";
import ProductManager from "../classes/ProductManager";
import QueryParams from "../interfaces/QueryParams";
import UpdateProduct from "../interfaces/UpdateProduct";
import IdProduct from "../interfaces/IdProduct";
import { productsPath } from "../utils/paths";
import { successStatus, failureStatus } from "../utils/statuses";
import Product from "../classes/Product";
import validateQueryParams from "../validators/queryParams";
import validateId from "../validators/ids";
import validateUpdateProduct from "../validators/updateProduct";

const productsRouter: Router = Router()

/** ENDPOINT DE GET (Completar) */
productsRouter.get("/", async(req: Request, res: Response) => {
    const productManager: ProductManager = new ProductManager(productsPath);
    const products: IdProduct[] = await productManager.getProducts();
    let limitParsed: number = products.length;
    const queryParams: QueryParams = validateQueryParams(req.query);
    if (!queryParams) {
        res.status(404).json(failureStatus("Query PArams invalidos"));
        return;
    }
    const { limit } = queryParams
    console.log(limit)
    if (limit) {
        limitParsed = parseInt(limit)
    }
    res.json(products.splice(0, limitParsed))
})


export default productsRouter;