const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require("path");
const healthzRouter = require("./routes/healthz.router");
const productRouter = require("./routes/product.router");
const fdkExtension = require("./fdk");

const app = express();

// Middleware to parse cookies with a secret key
app.use(cookieParser("ext.session"));

// Middleware to parse JSON bodies with a size limit of 2mb
app.use(bodyParser.json({
    limit: '2mb'
}));

// Health check route
app.use("/", healthzRouter);

// Serve static files from the React build directory
app.use(express.static("build"));

// FDK extension handler and API routes (extension launch routes)
app.use("/", fdkExtension.fdkHandler);

// FDK extension api route which has auth middleware and FDK client instance attached to it.
const apiRoutes = fdkExtension.apiRoutes;
apiRoutes.use('/v1.0', productRouter);
app.use('/api', apiRoutes);

// Serve the React app for all other routes
app.get('*', (req, res) => {
    res.contentType('text/html');
    res.sendFile(path.join(__dirname, '../', 'build/index.html'))
});

module.exports = app;
