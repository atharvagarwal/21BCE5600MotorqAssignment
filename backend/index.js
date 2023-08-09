const express = require('express');
const app = express();
var cors = require('cors')
const connectDB = require('./model/db');
const bodyParser = require("body-parser");
const authRouter = require('./routes/authRoute');
const requestRouter = require('./routes/requestRoute');
const adminRouter = require('./routes/adminRoute');
const swaggerAutogen = require('swagger-autogen')();

const swaggerUi = require("swagger-ui-express");
// Change to swagger_output_dev.json in development
const swaggerDocument =require("./swagger-output-dev.json");
app.use(cors())
app.use(
    express.urlencoded({ extended: true })
);
app.use(bodyParser.json());
app.use(express.json());
app.use('/', authRouter);
app.use('/', requestRouter);
app.use('/', adminRouter);
app.get('/',(req, res) => res.send("Welcome to the motorq api"))

connectDB();

//swagger


const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3001',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/adminRoute.js', './routes/authRoute.js','./routes/requestRoute.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

app.use("/docs", swaggerUi.serve);
app.get(
  "/docs",
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "MotorQ API",
  })
);

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});