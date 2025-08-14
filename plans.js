const { Plan } = require("fdk-billing-javascript");

// Define your subscription plans
const plans = [
    new Plan({
        id: "basic-plan", // This should match what we query for
        name: "Basic Plan",
        tagline: "Essential features for small businesses",
        company_id: [], // Empty array means available for all companies
        is_active: true,
        price: {
            amount: 10, // ₹999
            currency: "INR"
        },
        features: [
            "Basic product management",
            "Standard support",
            "Up to 100 products"
        ],
        pricing_type: "recurring",
        interval: "month",
        meta: {
            max_products: 100,
            support_level: "standard"
        }
    }),
    new Plan({
        id: "premium-plan", // This should match what we query for
        name: "Premium Plan",
        tagline: "Advanced features for growing businesses",
        company_id: [],
        is_active: true,
        price: {
            amount: 1999, // ₹1999
            currency: "INR"
        },
        features: [
            "Advanced product management",
            "Priority support",
            "Unlimited products",
            "Analytics dashboard",
            "Custom integrations"
        ],
        pricing_type: "recurring",
        interval: "month",
        meta: {
            max_products: -1, // Unlimited
            support_level: "priority",
            analytics: true,
            custom_integrations: true
        }
    }),
    new Plan({
        id: "enterprise-plan", // This should match what we query for
        name: "Enterprise Plan",
        tagline: "Custom solutions for large enterprises",
        company_id: [],
        is_active: true,
        price: {
            amount: 4999, // ₹4999
            currency: "INR"
        },
        features: [
            "All Premium features",
            "Dedicated support",
            "Custom development",
            "SLA guarantee",
            "White-label options"
        ],
        pricing_type: "recurring",
        interval: "month",
        meta: {
            max_products: -1,
            support_level: "dedicated",
            analytics: true,
            custom_integrations: true,
            sla_guarantee: true,
            white_label: true
        }
    }),
    new Plan({
        id: "lifetime-access",
        name: "Lifetime Access",
        tagline: "Pay once, use forever - Best value for long-term users",
        company_id: [],
        is_active: true,
        price: {
            amount: 49999, // ₹49,999 one-time payment
            currency: "INR"
        },
        features: [
            "All Enterprise features",
            "Lifetime access to all features",
            "No monthly payments",
            "Future updates included",
            "Dedicated support",
            "Custom development",
            "SLA guarantee",
            "White-label options",
            "Unlimited products",
            "Analytics dashboard"
        ],
        pricing_type: "one_time", // One-time payment
        interval: "year", // Valid value: 'month' or 'year'
        meta: {
            max_products: -1,
            support_level: "dedicated",
            analytics: true,
            custom_integrations: true,
            sla_guarantee: true,
            white_label: true,
            lifetime_access: true,
            one_time_payment: true
        }
    })
];

module.exports = plans; 