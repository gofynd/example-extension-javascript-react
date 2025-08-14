const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const serveStatic = require("serve-static");
const { readFileSync } = require('fs');
const { setupFdk } = require("@gofynd/fdk-extension-javascript/express");
const { SQLiteStorage } = require("@gofynd/fdk-extension-javascript/express/storage");
const { fdkBillingInstance } = require('./billing');
const plans = require('./plans');

const sqliteInstance = new sqlite3.Database('session_storage.db');
const productRouter = express.Router();
const billingRouter = express.Router();

const fdkExtension = setupFdk({
    api_key: process.env.EXTENSION_API_KEY,
    api_secret: process.env.EXTENSION_API_SECRET,
    base_url: process.env.EXTENSION_BASE_URL,
    cluster: process.env.FP_API_DOMAIN,
    callbacks: {
        auth: async (req) => {
            // Write you code here to return initial launch url after auth process complete
            if (req.query.application_id)
                return `${req.extension.base_url}/company/${req.query['company_id']}/application/${req.query.application_id}/billing`;
            else
                return `${req.extension.base_url}/company/${req.query['company_id']}/billing`;
        },
        
        uninstall: async (req) => {
            // Write your code here to cleanup data related to extension
            // If task is time taking then process it async on other process.
        }
    },
    storage: new SQLiteStorage(sqliteInstance,"exapmple-fynd-platform-extension"), // add your prefix
    access_mode: "online",
    webhook_config: {
        api_path: "/api/webhook-events",
        notification_email: "useremail@example.com",
        event_map: {
            "company/product/delete": {
                "handler": (eventName) => {  console.log(eventName)},
                "version": '1'
            }
        }
    },
});

const STATIC_PATH = process.env.NODE_ENV === 'production'
    ? path.join(process.cwd(), 'frontend', 'public' , 'dist')
    : path.join(process.cwd(), 'frontend');
    
const app = express();
const platformApiRoutes = fdkExtension.platformApiRoutes;

// Middleware to parse cookies with a secret key
app.use(cookieParser("ext.session"));

// Middleware to parse JSON bodies with a size limit of 2mb
app.use(bodyParser.json({
    limit: '2mb'
}));

// Serve static files from the React dist directory
app.use(serveStatic(STATIC_PATH, { index: false }));

// Admin endpoints for database management
app.post('/admin/initialize-database', async function initializeDatabase(req, res, next) {
    try {
        const existingPlans = await fdkBillingInstance.planModel.model.find({});
        
        if (existingPlans.length > 0) {
            return res.status(400).json({ 
                error: 'Database already initialized', 
                existingPlansCount: existingPlans.length,
                message: 'Plans already exist in database. Use /admin/reset-database to clear and reinitialize.'
            });
        }
        
        const createdPlans = [];
        for (const plan of plans) {
            try {
                const createdPlan = await fdkBillingInstance.planModel.createPlan(plan);
                createdPlans.push(createdPlan);
            } catch (error) {
                console.error(`Error creating plan ${plan.name}:`, error.message);
            }
        }
        
        return res.json({ 
            success: true,
            message: 'Database initialized successfully',
            createdPlansCount: createdPlans.length,
            plans: createdPlans.map(plan => ({
                id: plan._id,
                name: plan.name,
                pricing_type: plan.pricing_type,
                interval: plan.interval,
                price: plan.price
            }))
        });
        
    } catch (error) {
        console.error('Error initializing database:', error);
        res.status(500).json({ 
            error: 'Failed to initialize database',
            message: error.message 
        });
    }
});

app.post('/admin/reset-database', async function resetDatabase(req, res, next) {
    try {
        const deleteResult = await fdkBillingInstance.planModel.model.deleteMany({});
        const deleteSubscriptionsResult = await fdkBillingInstance.subscriptionModel.model.deleteMany({});
        
        const createdPlans = [];
        for (const plan of plans) {
            try {
                const createdPlan = await fdkBillingInstance.planModel.createPlan(plan);
                createdPlans.push(createdPlan);
            } catch (error) {
                console.error(`Error creating plan ${plan.name}:`, error.message);
            }
        }
        
        return res.json({ 
            success: true,
            message: 'Database reset successfully',
            deletedPlans: deleteResult.deletedCount,
            deletedSubscriptions: deleteSubscriptionsResult.deletedCount,
            createdPlansCount: createdPlans.length,
            plans: createdPlans.map(plan => ({
                id: plan._id,
                name: plan.name,
                pricing_type: plan.pricing_type,
                interval: plan.interval,
                price: plan.price
            }))
        });
        
    } catch (error) {
        console.error('Error resetting database:', error);
        res.status(500).json({ 
            error: 'Failed to reset database',
            message: error.message 
        });
    }
});

app.get('/admin/database-status', async function getDatabaseStatus(req, res, next) {
    try {
        const plansCount = await fdkBillingInstance.planModel.model.countDocuments({});
        const subscriptionsCount = await fdkBillingInstance.subscriptionModel.model.countDocuments({});
        const activePlans = await fdkBillingInstance.planModel.model.find({ is_active: true });
        
        return res.json({
            databaseStatus: 'connected',
            plansCount: plansCount,
            activePlansCount: activePlans.length,
            subscriptionsCount: subscriptionsCount,
            isInitialized: plansCount > 0,
            plans: activePlans.map(plan => ({
                id: plan._id,
                name: plan.name,
                pricing_type: plan.pricing_type,
                interval: plan.interval,
                price: plan.price
            }))
        });
        
    } catch (error) {
        console.error('Error getting database status:', error);
        res.status(500).json({ 
            error: 'Failed to get database status',
            message: error.message 
        });
    }
});

// FDK extension handler and API routes (extension launch routes)
app.use("/", fdkExtension.fdkHandler);

// Route to handle webhook events and process it.
app.post('/api/webhook-events', async function(req, res) {
    try {
      console.log(`Webhook Event: ${req.body.event} received`)
        await fdkExtension.webhookRegistry.processWebhook(req);
        return res.status(200).json({"success": true});
    } catch(err) {
        console.log(`Error Processing ${req.body.event} Webhook`);
        return res.status(500).json({"success": false});
    }
})

// Product routes
productRouter.get('/', async function view(req, res, next) {
    try {
        const {
            platformClient
        } = req;
        const data = await platformClient.catalog.getProducts()
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

// Get products list for application
productRouter.get('/application/:application_id', async function view(req, res, next) {
    try {
        const {
            platformClient
        } = req;
        const { application_id } = req.params;
        const data = await platformClient.application(application_id).catalog.getAppProducts()
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

// Billing routes
billingRouter.get('/plans', async function getPlans(req, res, next) {
    try {
        const companyId = req.query.company_id;
        const allPlans = await fdkBillingInstance.planModel.model.find({ is_active: true });
        
        const plansWithId = allPlans.map(plan => ({
            ...plan.toObject(),
            id: plan._id.toString()
        }));
        
        const availablePlans = plansWithId.filter(plan => {
            if (!plan.company_id || plan.company_id.length === 0) {
                return true;
            }
            return plan.company_id.includes(parseInt(companyId));
        });
        
        return res.json({ plans: availablePlans });
    } catch (err) {
        console.error('Error getting plans:', err);
        next(err);
    }
});

billingRouter.get('/subscription', async function getSubscription(req, res, next) {
    try {
        const companyId = req.query.company_id;
        const subscription = await fdkBillingInstance.getActiveSubscription(companyId);
        return res.json(subscription);
    } catch (err) {
        console.error('Error getting subscription:', err);
        return res.json(null);
    }
});

billingRouter.post('/subscribe', async function subscribe(req, res, next) {
    try {
        const { company_id, plan_id, callback_url } = req.body;
        const { platformClient } = req;
        
        if (!plan_id) {
            return res.status(400).json({ error: 'Plan ID is required' });
        }
        
        const plan = await fdkBillingInstance.planModel.model.findById(plan_id);
        
        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }
        
        const callbackUrl = `${process.env.EXTENSION_BASE_URL}/company/${company_id}/subscription-status`;
        
        const subscription = await fdkBillingInstance.subscribePlan(
            company_id, 
            plan_id,
            platformClient, 
            callbackUrl
        );
        
        return res.json(subscription);
    } catch (err) {
        console.error('Error in subscribe:', err);
        next(err);
    }
});

billingRouter.get('/subscription/update-status', async function updateSubscriptionStatusGet(req, res, next) {
    try {
        const { company_id, subscription_id, approved } = req.query;
        
        if (!company_id || !subscription_id) {
            return res.redirect(`/company/${company_id || '3'}/billing`);
        }
        
        if (approved !== 'true') {
            return res.redirect(`/company/${company_id}/billing`);
        }
        
        const { platformClient } = req;
        
        if (!platformClient) {
            return res.redirect(`/company/${company_id}/billing`);
        }
        
        const subscription = await fdkBillingInstance.updateSubscriptionStatus(
            company_id,
            subscription_id,
            platformClient
        );
        
        const redirectUrl = `${process.env.EXTENSION_BASE_URL}/company/${company_id}/billing`;
        return res.redirect(redirectUrl);
        
    } catch (err) {
        console.error('Error in subscription update callback:', err);
        const companyId = req.query.company_id || '3';
        return res.redirect(`/company/${companyId}/billing`);
    }
});

billingRouter.post('/subscription/update-status', async function updateSubscriptionStatus(req, res, next) {
    try {
        const { company_id, platform_subscription_id } = req.body;
        const { platformClient } = req;
        
        const subscription = await fdkBillingInstance.updateSubscriptionStatus(
            company_id,
            platform_subscription_id,
            platformClient
        );
        
        const redirectUrl = `${process.env.EXTENSION_BASE_URL}/company/${company_id}/billing`;
        return res.redirect(redirectUrl);
    } catch (err) {
        next(err);
    }
});

billingRouter.post('/subscription/:platform_subscription_id/status', async function updateSubscriptionStatusById(req, res, next) {
    try {
        const { platform_subscription_id } = req.params;
        const { platformClient } = req;
        const companyId = req.headers['x-company-id'];
        
        if (!platform_subscription_id || !companyId) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        
        const subscription = await fdkBillingInstance.updateSubscriptionStatus(
            companyId,
            platform_subscription_id,
            platformClient
        );
        
        return res.json(subscription);
        
    } catch (err) {
        console.error('Error updating subscription status:', err);
        next(err);
    }
});

// FDK extension api route which has auth middleware and FDK client instance attached to it.
platformApiRoutes.use('/products', productRouter);
platformApiRoutes.use('/billing', billingRouter);

// If you are adding routes outside of the /api path, 
// remember to also add a proxy rule for them in /frontend/vite.config.js
app.use('/api', platformApiRoutes);

// Serve the React app for all other routes
app.get('*', (req, res) => {
    return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(path.join(STATIC_PATH, "index.html")));
});

module.exports = app;
