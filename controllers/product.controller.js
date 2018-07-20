const Product = require('../models/product.model');
const sequelize = require("sequelize");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res) {
    Product.ProductSchema.create({
      name: req.body.name,
      price: req.body.price
  });
  res.send('Product Created successfully')
};

exports.all_product_details = function (req, res) {
    Product.ProductSchema.findAll({
      order: sequelize.literal("createdAt DESC")
    }).then(products => {
      return res.send({products: products});
    });
};

exports.product_details = function (req, res) {
    Product.ProductSchema.findById(req.params.id).then(product => {
      if (!product) {
        return res.render("error", {
          message: "Page not found.",
          error: {
            status: 404,
          }
        });
      }
      res.send(product);
    });
};

exports.product_update = function (req, res) {
    Product.ProductSchema.update({
      name: req.body.name,
      price: req.body.price
    }, {
      where: {
        id: req.params.id
      }
    });

// with error handling
    /*Product.ProductSchema.findOne({
        where: {
          id: req.params.id
        }
      }).then(product => {
        if (!product) {
          return res.render("error", {
            message: "Page not found.",
            error: {
              status: 404,
            }
          });
        }

        product.update({
          name: req.body.name,
          price: req.body.price
        });
    });*/

    res.send('Product Updated successfully')
};

exports.product_delete = function (req, res) {
    /*Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })*/

    /*Product.ProductSchema.destroy({
      where: {
        id: req.params.id
      }
    });*/

    Product.ProductSchema.findOne({
      where: {
        id: req.params.id
      }
    }).then(product => {
      if (!product) {
        return res.render("error", {
          message: "Page not found.",
          error: {
            status: 404,
          }
        });
      }

      product.destroy();
    });
    res.send('Product deleted successfully')

};
