interface IdProduct {
    id: number;
    title: string;
    description: string;
    code: string;
    price: number;
    stock: number;
    category: string;
    status: boolean;
    thumbnail: string[];
    [key: string] : string | string[] | number | boolean;
}

export default IdProduct;