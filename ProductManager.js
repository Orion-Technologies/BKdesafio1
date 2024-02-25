class ProductManager {
    static id = 0;

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        ProductManager.id++;
        const codeValidation = productCode => productCode.code === code;
        if (this.products.some(codeValidation)) {
            return console.log('El producto ya existe');
        } else if (!title || title.trim() === '' || !description || description.trim() === '' || price === null || price === undefined || price === '' || !code || code.trim() === '' || stock === null || stock === undefined || stock === '') {
            return console.log('Todos los campos son obligatorios');
        } else {
            this.products.push({id: ProductManager.id, title, description, price, thumbnail, code, stock});
            return ProductManager.id;
        }
    }

    getProducts() {
        console.log(this.products);
        return this.products;
    }

    getProductById(id){
        if (this.products.find(findId => findId === this.products[id - 1])){
            console.log(this.products[id - 1])
            return this.products[id - 1];
        } else {
            console.log("Not found");
            return 'Not found';
        }
    }
}


const producto = new ProductManager();

producto.addProduct("T-Shirt",'T-Shirt Cartoon',350, "url", "P123", 50);
producto.addProduct("Gorra",'Popeye',250, "url", "G124", 50);
producto.addProduct("Consola",'PS5',7500, "url", "C125", 75);

producto.getProducts();
producto.getProductById(3);