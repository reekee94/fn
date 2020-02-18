const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');

const auth = require('./routes/users/auth');
const users = require('./routes/users/users');
const products = require('./routes/products/products');
const catalogs = require('./routes/products/catalogs');
const categories = require('./routes/products/categories');
const brands = require('./routes/products/brands');
const colors = require('./routes/products/colors');
const generator = require('./routes/products/generator');

const app = express();

connectDB();
app.use(morgan('dev'));
// let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// morgan.token('body', (req, res) => console.log(JSON.stringify(req.body)));
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {stream: accessLogStream } ));
app.use(express.json({ extended: false }));


app.get('/', (req, res) => res.send('API Running'));

app.use('/auth', auth);
app.use('/users', users);
app.use('/products', products);
app.use('/catalogs', catalogs);
app.use('/categories', categories);
app.use('/brands', brands);
app.use('/colors', colors);
app.use('/generator', generator);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
