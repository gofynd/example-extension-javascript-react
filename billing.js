const { setupBilling, OrmType } = require("fdk-billing-javascript");
const mongoose = require('mongoose');

// Only connect to MongoDB if we're not in test environment
if (process.env.NODE_ENV !== 'test') {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fynd-extension-billing';
    
    mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB for billing');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
}

// Initialize billing instance with fallback for tests
const fdkBillingInstance = setupBilling({
    extension_id: process.env.EXTENSION_API_KEY || "test-extension-key",
    db_connection: mongoose.connection,
    collection_name: {
        plan: "plans",
        subscription: "seller_subscriptions"
    },
    orm_type: OrmType.MONGOOSE
});

module.exports = { fdkBillingInstance }; 