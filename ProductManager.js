// Esto simplifica el código, ya no hace falta poner "fs.promises" en el código
const fs = require("fs").promises;

class ProductManager {
    static id = 0;

    constructor() {
        this.products = [];
        this.path = "./productos.json";
    }

    async addProduct(title, description, price, thumbnail, code, stock) {

        //! Tengo que ir a leer el archivo JSON
        const readProductsJSON = await fs.readFile(this.path, 'utf-8');
        //! Lo tengo que parsear a formato de array
        this.products = JSON.parse(readProductsJSON);
        const codeValidation = productCode => productCode.code === code;

        if (this.products.some(codeValidation)) {
            return console.log('El producto ya existe');
        } else if (!title || title.trim() === '' || !description || description.trim() === '' || price === null || price === undefined || price === '' || !code || code.trim() === '' || stock === null || stock === undefined || stock === '') {
            return console.log('Todos los campos son obligatorios');
        } else {

            /**
             * ?? Hice un nuevo objeto con todos los argumentos de la funcion para entender mejor la creación de objetos y en cada objeto creado aumento el id
             * @type {{thumbnail, code, price, description, id: number, title, stock}}
             */
            const newProduct = {
                id: ++ProductManager.id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };

            //** Hago push al array de objetos con los nuevos objetos creados
            this.products.push(newProduct);
            //! Esto convierte el array de objetos a formato JSON y aplico un trucazo de la naza XD
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log('Producto agregado: ', newProduct);
            return ProductManager.id;
        }
    }

    async getProducts() {
        try {
            //** Leer archivos y almacenarlos en una constante
            const readProductsJSON = await fs.readFile(this.path, 'utf-8');
            //?? Compruebo que no este vacia la constante
            if (readProductsJSON.length > 0) {
                //?? Convierto a formato array
                this.products = JSON.parse(readProductsJSON);
                console.log(this.products);
                return this.products;
            } else {
                console.log("JSON file is empty");
                return [];
            }
        } catch (error) {
            console.log("(getProduct) Error reading or parsing JSON file: ", error.message);
        }
    }

    async getProductById(id) {
        try {
            //** Leer archivos y almacenarlos en una constante
            const readProductsJSON = await fs.readFile(this.path, 'utf-8');
            //?? Compruebo que no este vacia la constante
            if (!readProductsJSON || readProductsJSON.trim() === "") {
                console.log("JSON is empty");
                return 'JSON is empty';
            }
            //?? Convierto a formato array
            this.products = JSON.parse(readProductsJSON);
            //?? Busco por ID
            const foundProduct = this.products.find(product => product.id == id);
            if (foundProduct) {
                console.log(foundProduct)
                return foundProduct;
            } else {
                console.log("Not found");
                return 'Not found';
            }
        } catch (error) {
            console.log("(getProductById) Error reading or parsing JSON file: ", error.message);
        }
    }
}

const producto = new ProductManager();

producto.addProduct('T-Shirt', 'T-Shirt Cartoon', 350, "url", "T1", 50);
producto.addProduct("Gorra", 'Popeye', 250, "url", "G1", 50);
producto.addProduct("Consola", 'PS5', 7500, "url", "C1", 75);
producto.addProduct("Smart Phone", 'iPhone 15', 11500, "url", "SP1", 75);
producto.addProduct("Smart Phone", 'iPhone 14', 11500, "url", "SP1", 75);


producto.getProducts();

producto.getProductById(6);



