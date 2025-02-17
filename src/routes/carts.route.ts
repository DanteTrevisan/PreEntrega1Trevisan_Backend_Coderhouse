import { Router, Request, Response } from "express";
import ProductManager from "../classes/ProductManager";
import { CartManager } from "../classes/CartManager";
import { productRoute } from "../utils/routes";
import { productsPath, cartsPath } from "../utils/paths";
import { successStatus, failureStatus } from "../utils/statuses";
import IdCart from "../interfaces/IdCarts";
import IdProduct from "../interfaces/IdProduct";
import validateId from "../validators/ids";

const cartsRouter: Router = Router();

/**GET ENDPOINT */
cartsRouter.get("/:cid", async(req: Request, res: Response) => {
    const cartManager: CartManager = new CartManager(cartsPath);
    const cid: number = validateId(req.params.cid);
    if (cid) {
        const idCart: IdCart = await cartManager.getCartById(cid);
        if (idCart) {
            res.json(idCart.products);
        } else {
            res.status(404).json(failureStatus(`El carro con id ${cid} no existe`));
        }
    } else {
        res.status(404).json(failureStatus("Cart ID invalido"));
    }
});

/** POST */
cartsRouter.post("/", async(req:Request, res:Response) => {
    const cartManager: CartManager = new CartManager(cartsPath);
    await cartManager.createCart();
    res.json(successStatus)
});

cartsRouter.post(
    "/:cid" + productRoute + "/:pid",
    async (req: Request, res:Response) => {
        const cartManager: CartManager = new CartManager(cartsPath);
        const productManager: ProductManager = new ProductManager(productsPath);
        const cid: number = validateId(req.params.cid);
        if (cid) {
            const pid:number = validateId(req.params.pid)
            if (pid) {
                const idProduct: IdProduct = await productManager.getProductById(pid)
                if (!idProduct) {
                    res
                        .status(404)
                        .json(failureStatus(`El producto con id ${pid} no existe`))
                } else {
                  await cartManager.addProductToCart(cid,pid,(error:Error) => {
                    if (error) {
                        res.status(404).json(failureStatus(error.message))
                    } else {
                        res.json(successStatus)
                    }
                  });
                }
            } else {
                res.status(404).json(failureStatus("Producto ID invalido"))
            }
        } else {
            res.status(404).json(failureStatus("Cart ID invalido"))
        }
    }
)

export default cartsRouter;