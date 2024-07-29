const express = require('express');
const cookieParser = require('cookie-parser');
const { readFileSync } = require('fs');
const { join } = require("path");
const bodyParser = require('body-parser');
const path = require("path");
const serveStatic = require("serve-static");
const healthzRouter = require("./routes/healthz.router");
const productRouter = require("./routes/product.router");
const fdkExtension = require("./fdk");

const app = express();

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/dist`
    : `${process.cwd()}/src/`;

// Middleware to parse cookies with a secret key
app.use(cookieParser("ext.session"));

// Middleware to parse JSON bodies with a size limit of 2mb
app.use(bodyParser.json({
    limit: '2mb'
}));

// Health check route
app.use("/", healthzRouter);

// Serve static files from the React build directory
// app.use(express.static("dist"));

// FDK extension handler and API routes (extension launch routes)
app.use("/", fdkExtension.fdkHandler);

// FDK extension api route which has auth middleware and FDK client instance attached to it.
const apiRoutes = fdkExtension.apiRoutes;
apiRoutes.use('/v1.0', productRouter);
app.use('/api', apiRoutes);

console.log(STATIC_PATH);
app.use(serveStatic(STATIC_PATH, { index: false }));
// Serve the React app for all other routes
app.get('*', (req, res) => {
    return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});
  

module.exports = app;
