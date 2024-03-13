"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = __importDefault(require("./models/Product"));
const Order_1 = __importDefault(require("./models/Order"));
const ProductLine_1 = __importDefault(require("./models/ProductLine"));
const OrderDetail_1 = __importDefault(require("./models/OrderDetail"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    models: [__dirname + './models'],
});
sequelize.addModels([Product_1.default, Order_1.default, ProductLine_1.default, OrderDetail_1.default]);
sequelize
    .authenticate()
    .then(() => {
    console.log('Database connection has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
// Fizzbuzz Function
app.get('/fizzbuzz/:number', (req, res) => {
    const number = parseInt(req.params.number);
    let result = [];
    for (let i = 1; i <= number; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push('FizzBuzz');
        }
        else if (i % 3 === 0) {
            result.push('Fizz');
        }
        else if (i % 5 === 0) {
            result.push('Buzz');
        }
        else {
            result.push(`${i}`);
        }
    }
    res.send({ result });
});
// Palindrome function
app.get('/palindrome/:word', (req, res) => {
    const word = req.params.word;
    const reversedWord = word.split('').reverse().join('');
    if (word === reversedWord) {
        res.send({ result: word + ' is a Palindrome' });
    }
    else {
        res.send({ result: word + ' is Not a Palindrome' });
    }
});
app.get('/query-customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Order_1.default.findAll({
        include: [
            {
                model: OrderDetail_1.default,
                attributes: [],
                required: true,
                include: [
                    {
                        model: Product_1.default,
                        attributes: [],
                        required: true,
                        include: [
                            {
                                model: ProductLine_1.default,
                                attributes: [],
                                required: true,
                            },
                        ],
                    },
                ],
            },
        ],
        attributes: ['customerNumber'],
        order: [['customerNumber', 'ASC']],
        where: {
            '$orderDetails->product->productLineObj.productLine$': 'Classic Cars',
        },
        group: ['customerNumber'],
        raw: true,
        having: sequelize_typescript_1.Sequelize.literal('COUNT(`orderDetails`.`productCode`) > 23'),
    });
    res.send({ result });
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
