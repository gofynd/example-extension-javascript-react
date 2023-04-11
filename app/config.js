const convict = require("convict");

let config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  extension: {
    api_key: {
      doc: "extension api key",
      default: "",
      env: "EXTENSION_API_KEY",
    },
    api_secret: {
      doc: "extension api secret",
      default: "",
      env: "EXTENSION_API_SECRET",
    },
    base_url: {
      doc: "extension base_url",
      default: "",
      env: "EXTENSION_BASE_URL",
    },
    fp_api_server: {
      doc: "FP API Server",
      default: "https://api.fynd.com",
      env: "EXTENSION_CLUSTER_URL",
    }
  },
  redis: {
    host: {
      doc: 'Redis URL of host.',
      format: String,
      default: 'redis://localhost:6379/0',
      env: 'REDIS_EXTENSIONS_READ_WRITE',
      arg: 'redis_extensions_read_write',
    },
  },
  port: {
    doc: 'The port this extension will bind to',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
});

// Perform validation
config.validate({ allowed: "strict" });
config = config.get();

module.exports = config;
