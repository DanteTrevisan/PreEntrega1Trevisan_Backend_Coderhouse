import CartProduct from "./CartProduct";
import IdCart from "../interfaces/IdCarts";

class Cart {
    products: CartProduct[];
    constructor(products: CartProduct[] = []) {
        this.products = products
    }

    addId(id: number) {
        const idCart: IdCart = {
            id,
            products: this.products
        };
        return idCart
    }
}

export default Cart;