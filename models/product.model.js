const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);

/*const Sequelize = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

const ProductSchema = db.define("product", {
  productId: { type: Sequelize.INTEGER, autoIncrement: true },
  name: { type: Sequelize.STRING },
  price: { type: Sequelize.DECIMAL },
});

db.sync();

module.exports = { ProductSchema };
*/
