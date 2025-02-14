class CartProduct {
    product: number;
    quantity: number;

    constructor (product: number, quantity: number = 1){
        if (!product) {
            throw new Error(
                "Se necesitan los parametros del constructor de CartProduct"
            );
        }
        this.product = product;
        this.quantity = quantity;
    }

    raiseQuantity(): void {
        this.quantity += 1;
    }
}

export default CartProduct