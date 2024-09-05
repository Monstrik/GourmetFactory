import express from 'express';
import {connectToRabbitMQ} from "./lib/rabbitmq.js";
import {checkExpiredProductsForEachShelf, printExpiredProducts, printFridge} from "./lib/products.js";

const app = express();
const port = 3003;

const server = app.listen(port, () => {
    console.log(`Fridge service running on port ${port}`);
});

let fridge = {};
let expiredProducts = [];


const checkExpiredProducts = () => {
    const {updatedFridge, updatedExpiredProducts} = checkExpiredProductsForEachShelf(fridge, expiredProducts);
    fridge = updatedFridge;
    expiredProducts = updatedExpiredProducts
}

const productReceived = (product) => {
    console.log('Product Received:', product.name , "for" ,product.delivery.name);
    if (!fridge[product.shelfType]) fridge[product.shelfType] = [];
    fridge[product.shelfType].push(product);
}

await connectToRabbitMQ(productReceived);
setInterval(() => {
    checkExpiredProducts();
    printFridge(fridge);
    printExpiredProducts(expiredProducts);
}, 10000)
