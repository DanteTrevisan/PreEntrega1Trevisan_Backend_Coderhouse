import { Router, Request, Response } from "express";

const cartsRouter: Router = Router();

cartsRouter.get("/", async(req: Request, res: Response) => {
    console.log("ENDPOINT GET DE PRODUCTS")
})

export default cartsRouter;