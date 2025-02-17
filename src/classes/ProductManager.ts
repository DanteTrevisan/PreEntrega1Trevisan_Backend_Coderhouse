import IdProduct from "../interfaces/IdProduct";
import UpdateProduct from "../interfaces/UpdateProduct";
import Product from "./Product";
import { generateId } from "../utils/functions";
import { readDataFromJsonFileAsyncPromises,
    writeDataIntoJsonFileAsyncPromises
} from "../utils/files";

class ProductManager {
    path: string;
    products: IdProduct[];

    constructor(path: string, products: IdProduct[] = []){
        this.path = path;
        this.products =  products;
    }

    static codeBase: number = 0;

    private generateProductId(): number {
        const ids: number[] = this.products.map((product: IdProduct) => product.id);
        return generateId(ids)
    }

    private async readProductsFromFileAsyncPromises(): Promise<void> {
        this.products = await readDataFromJsonFileAsyncPromises(this.path);
        ProductManager.codeBase = this.generateProductId()
    }

    private async writeProductsIntoFileAsyncPromises(): Promise<void> {
        writeDataIntoJsonFileAsyncPromises(this.path, this.products);
    }

    async addProduct(productObj: Product, callbackStatus: Function) {
        await this.readProductsFromFileAsyncPromises();
        if (
            this.products.some(
                (element:IdProduct) => productObj.code === element.code
            )
        ) {
            callbackStatus(
                new Error(
                    "El codigo del producto que esta agregando ya existe. Ingrese otro codigo"
                )
            );
            return;
        }
        const product: Product = new Product(
            productObj.title,
            productObj.description,
            productObj.code,
            productObj.price,
            productObj.stock,
            productObj.category,
            productObj.status,
            productObj.thumbnail,
        );
        this.products.push(product.addId(++ProductManager.codeBase));
        await this.writeProductsIntoFileAsyncPromises();
        callbackStatus(null)
    }

    async getProducts(): Promise<IdProduct[]> {
        await this.readProductsFromFileAsyncPromises();
        return this.products
    }

    async getProductById(id: number) {
        await this.readProductsFromFileAsyncPromises();
        const idProduct: IdProduct = this.products.find(
            (product: IdProduct) => product.id === id
        );
        return idProduct
    }

    async updateProduct(
        id:number,
        updateObj: UpdateProduct,
        callbackStatus: Function
    ): Promise<void> {
        await this.readProductsFromFileAsyncPromises();
        let existProduct: boolean = false
        const productsUpdated: IdProduct[] = this.products.map(
            (product: IdProduct) => {
                if (product.id === id) {
                    Object.keys(updateObj).forEach((key:string) => {
                        product[key] = updateObj[key]
                    });
                    existProduct = true;
                }
                return product
            }
        );

        if (!existProduct) {
            callbackStatus(
                new Error(`El producto con id igual  a ${id} no fue encontrado`)
            );
            return
        }
        this.products = productsUpdated;
        await this.writeProductsIntoFileAsyncPromises();
        callbackStatus(null)
    }

    async deleteProduct(id: number, callbackStatus: Function): Promise<void> {
        await this.readProductsFromFileAsyncPromises();
        const productsUpdated: IdProduct[] = [];
        let existProduct: boolean = false;
        this.products.forEach((product: IdProduct) => {
            if (product.id !== id) {
                productsUpdated.push(product)
            } else {
                existProduct = true
            }
        });
        if (!existProduct) {
            callbackStatus(
                new Error(`El producto con id igual  a ${id} no fue encontrado`)
            );
            return;
        }
        this.products = productsUpdated;
        await this.writeProductsIntoFileAsyncPromises();
        callbackStatus(null);
    }
}

export default ProductManager