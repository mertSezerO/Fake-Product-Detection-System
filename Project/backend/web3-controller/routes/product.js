const Router = require("express").Router();

const productController = require("../controllers/product");
const middlewareController = require("../controllers/middleware");

Router.post("/product", productController.addProduct);

Router.get("/product", productController.getProducts);

// Router.patch("/product/:productId", productController.updateProductStatus)

Router.get(
  "/product/:productId",
  middlewareController.deduplicate,
  productController.findProduct
);

module.exports = Router;
