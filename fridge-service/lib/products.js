function processProducts(products) {
    const currentDate = new Date();
    const expiredProductsOnShelf = [];
    const validProductsOnShelf = [];

    products.forEach(product => {
        const producedDate = new Date(product.prepared);
        const ttlInSeconds = product.shelfTime;
        const expiryDate = new Date(producedDate.getTime() + ttlInSeconds * 1000);
        if (currentDate > expiryDate) {
            product.expired = new Date();
            expiredProductsOnShelf.push(product);
        } else {
            validProductsOnShelf.push(product);
        }
    });
    return {validProductsOnShelf, expiredProductsOnShelf};
}

export const checkExpiredProductsForEachShelf = (fridge, expiredProducts) => {
    for (let key in fridge) {
        if (fridge.hasOwnProperty(key)) {
            const allProductsOnShelf = fridge[key];
            const {validProductsOnShelf, expiredProductsOnShelf} = processProducts(allProductsOnShelf);
            fridge[key] = validProductsOnShelf;
            expiredProducts = expiredProducts.concat(expiredProductsOnShelf);
        }
    }
    return {updatedFridge: fridge, updatedExpiredProducts:expiredProducts};
}

export function printFridge(fridge) {
    console.log("--- Fridge ---");
    for (let key in fridge) {
        if (fridge.hasOwnProperty(key)) {
            console.log("\t" + key, fridge[key].length);
            fridge[key].forEach((element) => {
                const now = new Date(element.prepared);
                const shortTime = now.toLocaleTimeString();
                console.log("\t\t" + element.name, element.shelfTime, shortTime)
            });
        }
    }
    console.log("--- ------ ---");
}

export function printExpiredProducts(expiredProducts) {
    console.log("--- Expired Products:", expiredProducts.length ,"---");
    let total=0;
    expiredProducts.forEach((element) => {
        total+=element.price;
        const now = new Date(element.prepared);
        const shortTime = now.toLocaleTimeString();
        console.log("\t\t" + element.name, element.shelfTime, shortTime)
    });
    console.log('--- Total lost:',total ,"---");
}
