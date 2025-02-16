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
});

productsRouter.get("/:pid", async(req: Request, res:Response) => {
    const productManager: ProductManager = new ProductManager(productsPath);
    const pid: number = validateId(req.params.pid);
    if (pid) {
        const IdProduct: IdProduct = await productManager.getProductById(pid);
        if (IdProduct) {
            res.json(IdProduct);
        } else {
            res
                .status(404)
                .json(failureStatus(`el producto con id ${pid} no existe`))
        }
    } else {
        res.status(404).json(failureStatus("Pid invalido."))
    }
});

productsRouter.post("/", async(req: Request, res:Response) => {
    const productManager: ProductManager = new ProductManager(productsPath);
    const product: Product = req.body
    await productManager.addProduct(product, (error: Error) => {
        if (error) {
            res.status(500).json(failureStatus(error.message));
        } else {
            res.json(successStatus)
        }
    });
});

productsRouter.put("/:pid", async(req:Request,res: Response) => {
    const productManager: ProductManager = new ProductManager(productsPath);
    const pid: number = validateId(req.params.id);
    if (pid) {
        const updateProperties: UpdateProduct = validateUpdateProduct(req.body);
        if (updateProperties) {
            await productManager.updateProduct(
                pid,
                updateProperties,
                (error:Error) => {
                    if (error) {
                        res.status(500).json(failureStatus(error.message))
                    } else {
                        res.json(successStatus)
                    }
                }
            )
        } else {
            res.status(404).json(failureStatus("Propiedades invalidas"))
        }
    } else {
        res.status(404).json(failureStatus("Producto ID invalido"))
    }
});

productsRouter.delete("/:pid", async(req: Request, res: Response) => {
    const productManager: ProductManager = new ProductManager(productsPath);
    const pid: number = validateId(req.params.pid);
    if (pid) {
        await productManager.deleteProduct(pid, (error: Error) => {
            if (error) {
                res.status(404).json(failureStatus(error.message));
            } else {
                res.json(successStatus)
            }
        });
    } else {
        res.status(404).json(failureStatus("Producto ID invalido."))
    }
})


export default productsRouter;