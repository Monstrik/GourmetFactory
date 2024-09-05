const menu = [
    { id: 1, name: "Margherita Pizza", price: 12.99, shelfTime: 48, shelfType: "refrigerated", prepTime: 20 },
    { id: 2, name: "Caesar Salad", price: 8.99, shelfTime: 24, shelfType: "refrigerated", prepTime: 10 },
    { id: 3, name: "Spaghetti Carbonara", price: 14.99, shelfTime: 72, shelfType: "refrigerated", prepTime: 25 },
    { id: 4, name: "Garlic Bread", price: 4.99, shelfTime: 24, shelfType: "room temperature", prepTime: 15 },
    { id: 5, name: "Chocolate Lava Cake", price: 6.99, shelfTime: 120, shelfType: "frozen", prepTime: 30 },
    { id: 6, name: "Grilled Chicken Sandwich", price: 9.99, shelfTime: 24, shelfType: "refrigerated", prepTime: 20 },
    { id: 7, name: "Vegetable Stir Fry", price: 11.99, shelfTime: 48, shelfType: "refrigerated", prepTime: 20 },
    { id: 8, name: "Beef Tacos", price: 10.99, shelfTime: 24, shelfType: "refrigerated", prepTime: 15 },
    { id: 9, name: "Blueberry Muffin", price: 3.99, shelfTime: 72, shelfType: "room temperature", prepTime: 10 },
    { id: 10, name: "Vanilla Ice Cream", price: 5.99, shelfTime: 168, shelfType: "frozen", prepTime: 5 },
    { id: 11, name: "Chicken Alfredo", price: 13.99, shelfTime: 72, shelfType: "refrigerated", prepTime: 25 },
    { id: 12, name: "Greek Salad", price: 7.99, shelfTime: 24, shelfType: "refrigerated", prepTime: 10 },
    { id: 13, name: "BBQ Ribs", price: 15.99, shelfTime: 48, shelfType: "refrigerated", prepTime: 30 },
    { id: 14, name: "French Fries", price: 3.99, shelfTime: 24, shelfType: "room temperature", prepTime: 10 },
    { id: 15, name: "Apple Pie", price: 5.99, shelfTime: 120, shelfType: "frozen", prepTime: 20 },
    { id: 16, name: "Turkey Club Sandwich", price: 9.99, shelfTime: 24, shelfType: "refrigerated", prepTime: 15 },
    { id: 17, name: "Miso Soup", price: 4.99, shelfTime: 24, shelfType: "refrigerated", prepTime: 10 },
    { id: 18, name: "Fish and Chips", price: 12.99, shelfTime: 48, shelfType: "refrigerated", prepTime: 20 },
    { id: 19, name: "Pancakes", price: 6.99, shelfTime: 24, shelfType: "room temperature", prepTime: 15 },
    { id: 20, name: "Strawberry Cheesecake", price: 7.99, shelfTime: 120, shelfType: "frozen", prepTime: 30 }
];



export const  getRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * menu.length);
    return menu[randomIndex];
}


