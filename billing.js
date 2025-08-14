const { setupBilling, OrmType } = require("fdk-billing-javascript");
const mongoose = require('mongoose');

// Connect to MongoDB (using local MongoDB or MongoDB Atlas)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fynd-extension-billing';

// Connect to MongoDB (removed deprecated options)
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB for billing');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Initialize billing instance
const fdkBillingInstance = setupBilling({
    extension_id: process.env.EXTENSION_API_KEY,
    db_connection: mongoose.connection,
    collection_name: {
        plan: "plans",
        subscription: "seller_subscriptions"
    },
    orm_type: OrmType.MONGOOSE
});

module.exports = { fdkBillingInstance }; 