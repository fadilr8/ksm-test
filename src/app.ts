import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Product from './models/Product';
import Order from './models/Order';
import ProductLine from './models/ProductLine';
import OrderDetail from './models/OrderDetail';

dotenv.config();

const app = express();
const PORT = 3000;

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [__dirname + './models'],
});

sequelize.addModels([Product, Order, ProductLine, OrderDetail]);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

// Fizzbuzz Function
app.get('/fizzbuzz/:number', (req, res) => {
  const number = parseInt(req.params.number);
  let result = [];

  for (let i = 1; i <= number; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push('FizzBuzz');
    } else if (i % 3 === 0) {
      result.push('Fizz');
    } else if (i % 5 === 0) {
      result.push('Buzz');
    } else {
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
  } else {
    res.send({ result: word + ' is Not a Palindrome' });
  }
});

app.get('/query-customers', async (req, res) => {
  const result = await Order.findAll({
    include: [
      {
        model: OrderDetail,
        attributes: [],
        required: true,
        include: [
          {
            model: Product,
            attributes: [],
            required: true,
            include: [
              {
                model: ProductLine,
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
    having: Sequelize.literal('COUNT(`orderDetails`.`productCode`) > 23'),
  });

  res.send({ result });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
