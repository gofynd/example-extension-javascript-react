const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require("path");
const healthzRouter = require("./routes/healthz.router");
const productRouter = require("./routes/product.router");
const fdkExtension = require("./fdk");
const config = require("./config");

const app = express();

// Middleware to parse cookies with a secret key
app.use(cookieParser("ext.session"));

// Middleware to parse JSON bodies with a size limit of 2mb
app.use(bodyParser.json({
    limit: '2mb'
}));

// Serve environment variables as a JavaScript file
app.get('/env.js', (req, res) => {
    // Define the environment variables you want to expose
    const commonEnvs = {
        base_url: config.extension.base_url,
        fp_api_server: config.extension.fp_api_server
    };

    res.type('application/javascript');
    res.send(
        `window.env = ${JSON.stringify(commonEnvs, null, 4)}`
    );
});

// Health check route
app.use("/", healthzRouter);

// Serve static files from the React build directory
app.use(express.static(path.resolve(__dirname, "../build/")));

// FDK extension handler and API routes (extension launch routes)
app.use("/", fdkExtension.fdkHandler);

// FDK extension api route which has auth middleware and FDK client instance attached to it.
const apiRoutes = fdkExtension.apiRoutes;
apiRoutes.use('/v1.0', productRouter);
app.use('/api', apiRoutes);

// Serve the React app for company-specific routes
app.get('/company/:company_id', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
    res.contentType('text/html');
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

module.exports = app;
