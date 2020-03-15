// Object Property Shorthand

const name = 'Selena';
const userAge = 23;
const location = 'Pune'
let user = {
    name,
    age: userAge,
    location
}
console.log(user);

// object destructuring
const product = {
    label: 'Red Notebook',
    price: 3,
    stock: 20,
    salePrice: undefined
};

const { stock, rating = 5 } = product;
console.log(stock, rating);

// destructure a function variables
const transaction = (type, { label, stock }) => {
    console.log(type, label, stock);
}
transaction("Sale", product);