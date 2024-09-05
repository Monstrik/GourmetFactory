const customer = [
    {
        "name": "John Doe",
        "adr": "123 Elm Street, Brooklyn, NY 11201",
        "est": 30
    },
    {
        "name": "Jane Smith",
        "adr": "456 Oak Avenue, Queens, NY 11375",
        "est": 45
    },
    {
        "name": "Alice Johnson",
        "adr": "789 Pine Road, Manhattan, NY 10001",
        "est": 25
    },
    {
        "name": "Bob Brown",
        "adr": "101 Maple Lane, Bronx, NY 10451",
        "est": 35
    },
    {
        "name": "Carol White",
        "adr": "202 Birch Boulevard, Staten Island, NY 10301",
        "est": 50
    },
    {
        "name": "David Green",
        "adr": "303 Cedar Street, Brooklyn, NY 11201",
        "est": 40
    },
    {
        "name": "Eva Black",
        "adr": "404 Spruce Avenue, Queens, NY 11375",
        "est": 55
    },
    {
        "name": "Frank Blue",
        "adr": "505 Willow Road, Manhattan, NY 10001",
        "est": 20
    },
    {
        "name": "Grace Yellow",
        "adr": "606 Pine Lane, Bronx, NY 10451",
        "est": 45
    },
    {
        "name": "Hank Purple",
        "adr": "707 Maple Boulevard, Staten Island, NY 10301",
        "est": 60
    },
    {
        "name": "Ivy Orange",
        "adr": "808 Birch Street, Brooklyn, NY 11201",
        "est": 35
    },
    {
        "name": "Jack Red",
        "adr": "909 Cedar Avenue, Queens, NY 11375",
        "est": 50
    },
    {
        "name": "Kara Pink",
        "adr": "1010 Spruce Road, Manhattan, NY 10001",
        "est": 25
    },
    {
        "name": "Leo Brown",
        "adr": "1111 Willow Lane, Bronx, NY 10451",
        "est": 40
    },
    {
        "name": "Mia White",
        "adr": "1212 Pine Boulevard, Staten Island, NY 10301",
        "est": 55
    },
    {
        "name": "Nina Green",
        "adr": "1313 Maple Street, Brooklyn, NY 11201",
        "est": 30
    },
    {
        "name": "Oscar Black",
        "adr": "1414 Birch Avenue, Queens, NY 11375",
        "est": 45
    },
    {
        "name": "Paul Blue",
        "adr": "1515 Cedar Road, Manhattan, NY 10001",
        "est": 20
    },
    {
        "name": "Quinn Yellow",
        "adr": "1616 Spruce Lane, Bronx, NY 10451",
        "est": 35
    },
    {
        "name": "Rita Purple",
        "adr": "1717 Willow Boulevard, Staten Island, NY 10301",
        "est": 50
    }
]

export const getRandomCustomer = () => {
    const randomIndex = Math.floor(Math.random() * customer.length);
    return customer[randomIndex];
}
