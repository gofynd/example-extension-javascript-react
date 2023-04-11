const { setupFdk } = require("fdk-extension-javascript/express");
const { RedisStorage } = require("fdk-extension-javascript/express/storage");
const config =  require("../config");
const { appRedis } = require("./../common/redis.init");

let fdkExtension = setupFdk({
    api_key: config.extension.api_key,
    api_secret: config.extension.api_secret,
    base_url: config.extension.base_url,
    callbacks: {
        auth: async (req) => {
            // Writee you code here to return initial launch url after suth process complete
            return `${req.extension.base_url}/company/${req.query['company_id']}`;
        },
        
        uninstall: async (req) => {
            // Write your code here to cleanup data related to extension
            // If task is time taking then process it async on other process.
        }
    },
    storage: new RedisStorage(appRedis,"exapmple-fynd-platform-extension"), // add your prefix
    access_mode: "offline",
    cluster:  config.extension.fp_api_server // this is optional (default: "https://api.fynd.com")
});


module.exports = fdkExtension;
