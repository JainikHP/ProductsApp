const Sequelize = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  omitNull: true
});

const ProductSchema = db.define("product", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING },
  price: { type: Sequelize.DECIMAL },
});

db.sync();

module.exports = { ProductSchema };
