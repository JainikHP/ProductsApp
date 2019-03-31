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

const InvoiceSchema = db.define("invoice", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  partyName: { type: Sequelize.STRING },
  invoiceHTMLData : { type: Sequelize.STRING },
});

db.sync();

module.exports = { ProductSchema , InvoiceSchema};
//module.exports = { InvoiceSchema };
