import express from 'express'
import { Express } from 'express'
import { PORT } from './utils/ports';
import { rootPath } from './utils/paths';
import cartsRouter from "./routes/carts.route";
import productsRouter from "./routes/products.route";
import { apiRoute, productsRoute, cartsRoute } from './utils/routes';


const app: Express = express();

app.listen(PORT, () => {
    console.log(`Servidor de Express.js en puerto:${PORT}`)
});

app.use(express.urlencoded({ extended: true}));
app.use(express.static(`${rootPath}/public`));
app.use(express.json())

app.use(apiRoute + productsRoute, productsRouter)
app.use(apiRoute + cartsRoute, cartsRouter)



