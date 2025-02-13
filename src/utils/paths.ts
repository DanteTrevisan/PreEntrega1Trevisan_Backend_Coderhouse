import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const rootPath = dirname(dirname(__dirname));

export const productsPath = rootPath + "/src/data/products.json";
export const cartsPath = rootPath + "/src/data/carts.json";
export const productsImagesPath = rootPath + "/src/assets/images/products";