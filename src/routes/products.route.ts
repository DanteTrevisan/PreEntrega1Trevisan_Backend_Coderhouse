import { Router, Request, Response } from "express";

const productsRouter: Router = Router()

/** ENDPOINT DE GET (Completar) */
productsRouter.get("/", async(req: Request, res: Response) => {
    console.log("ENDPOINT GET DE PRODUCTS")
})


export default productsRouter;