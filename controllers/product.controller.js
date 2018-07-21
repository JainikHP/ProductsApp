const Product = require('../models/product.model');
const sequelize = require("sequelize");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.preview_details = function (req, res) {
    //console.log(Object.keys(req.body.product).length);
    var productDetails = req.body.product;
    var partyDetails = {
      partyName : req.body.partyName,
      partyAdrLine1 :req.body.partyAdrLine1,
      partyAdrLine2 :req.body.partyAdrLine2,
      partyAdrLine3 :req.body.partyAdrLine3,
      partyGSTIN :req.body.partyGSTIN,
      partyState :req.body.partyState,
      partyCode : req.body.partyCode
    };
    var invoice = {
      productDetails : productDetails,
      partyDetails : partyDetails
    };
    console.log(invoice);
    console.log({partyDetails : partyDetails});
    return res.render("generatedTable", {invoice : invoice});
    //res.send('Greetings from the Test controller!');
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
      //return res.send({products: products});
      return res.render("inputData");
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
