const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Sadrijamaat API",
      version: "1.0.0",
      description: "API documentation for Sadrijamaat",
    },
    servers: [
      {
        url: `http://${process.env.HOST_IP || "localhost"}:${process.env.PORT || 5000}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const router = express.Router();

const swaggerDocs = swaggerJsdoc(swaggerOptions);
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
