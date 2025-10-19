const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false, 
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.User = require('./Models/UserModel')(sequelize, DataTypes);
db.Product = require('./Models/ProductModel')(sequelize, DataTypes);
db.ShoppingCart = require('./Models/shoppingCartModel')(sequelize, DataTypes);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke database SQLite berhasil.');

    await sequelize.sync({ force: false });
    console.log('Semua model berhasil disinkronkan!');

  } catch (error) {
    console.error('Koneksi ke database gagal:', error);
  }
}

module.exports = {  db, connectDB };