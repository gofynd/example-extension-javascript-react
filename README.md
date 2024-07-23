# Build a Fynd Extension using node.js + react.js
This project outlines the development process for a Fynd extension that displays product listings for a company and its associated applications. By following this guide, you'll be able to set up the development environment, build the extension locally, and understand the testing procedures.

## Quick start
### Prerequisites
* You have created a [partner account](https://partners.fynd.com).
* You have created a [development account](https://partners.fynd.com/help/docs/partners/testing-extension/development-acc#create-development-account) and [populated test data](https://partners.fynd.com/help/docs/partners/testing-extension/development-acc#populate-test-data) in it.
* You’ve installed [Node 16.18.1](https://docs.npmjs.com/) or above version.
* You have installed [Redis](https://redis.io/).
* You have created an [extension](https://partners.fynd.com) in partner panel. if not, you can follow [extension guide](https://partners.fynd.com/help/docs/partners/getting-started/create-extension) to create an extension.
* You have setup ngrok account to creates a tunnel and updated `EXTENSION_BASE_URL` env variable value to the ngrok URL.
* Update below environment variable value in `.env` file
    - EXTENSION_API_KEY:`extension api key`
    - EXTENSION_API_SECRET: `extension api secret`
    - EXTENSION_CLUSTER_URL: `ngrok url`
    - PORT: `port of an application. defaults to 8080`
    - REDIS_EXTENSIONS_READ_WRITE: `redis connection url`


### Project setup
Using yarn:
```
yarn install
```
Using npm:
```
npm install
```

### Start local server
Using yarn:
```
yarn run start
```
Using npm:
```
npm run start
```

### Serve frontend
Using yarn:
```
yarn run serve
```
Using npm:
```
npm run serve
```

### Start local server and serve frontend
Using yarn:
```
yarn run dev-start
```
Using npm:
```
npm run dev-start
```

### Build
Using yarn:
```
yarn run build
```
Using npm:
```
npm run build
```

### Lints and fixes files
Using yarn:
```
yarn run lint
```
Using npm
```
npm run lint
```

### Start server
Using yarn
```
yarn start
```
Using npm
```
npm start
```

### Testing
**Test backend**

Using yarn
```
yarn run test:node
```
Using npm
```
npm run test:node
```

**Test Frontend**
Using yarn
```
yarn run test:react
```
Using npm
```
npm run test:react
```

### Tech Stack
1. [fdk-client-javascript](https://github.com/gofynd/fdk-client-javascript): This library contains all the methods to call Fynd platform APIs.
2. [fdk-extension-javascript](https://github.com/gofynd/fdk-extension-javascript): This library streamlines the setup of authentication for accessing Fynd Platform APIs. It also simplifies the process of subscribing to webhooks for receiving real-time notifications.
3. [nitrozen-react](https://www.npmjs.com/package/@gofynd/nitrozen-react): Provides components and icons for building user interfaces that align with the Nitrozen Design System. This helps developers create consistent and high-quality user experiences.
