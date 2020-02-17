const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

const auth = require('./routes/users/auth');
const users = require('./routes/users/users');
const products = require('./routes/products/products');
const catalogs = require('./routes/products/catalogs');
const generator = require('./routes/generator/generateProducts');
const app = express();

connectDB();

app.use(morgan('dev'));
morgan.token('body', (req, res) => console.log(JSON.stringify(req.body)));
app.use(morgan(' :method :url  :response-time '));
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/auth', auth);
app.use('/users', users);
app.use('/products', products);
app.use('/catalogs', catalogs);
app.use('/gererate', generator);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
