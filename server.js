const express = require('express');

const AboutUsRouter = require('./routes/AboutUsRouter');
const greetingRoutes = require('./routes/greetingRoutes');
const userManagementRouter = require('./routes/UserManagementRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const shoppingCartRoutes = require('./routes/shoppingCartRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/aboutus', AboutUsRouter);
app.use('/greeting', greetingRoutes);
app.use('/users', userManagementRouter);
app.use('/products', ProductRoutes);
app.use('/cart', shoppingCartRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
