
# Build a Fynd Extension using Node.js + React.js


[![Coverage Status][coveralls-badge]]([coveralls-url])

This project outlines the development process for a Fynd extension that displays product listings for a company and its associated applications. By following this guide, you'll be able to set up the development environment, build the extension locally, and understand the testing procedures.

## Quick start
### Prerequisites
* You have installed [Node 16.X.X](https://docs.npmjs.com/) or above version.
* You have fdk-cli installed [install](https://github.com/gofynd/fdk-cli)
* You have created a [partner account](https://partners.fynd.com).
* You have created a [development account](https://partners.fynd.com/help/docs/partners/testing-extension/development-acc#create-development-account) and [populated test data](https://partners.fynd.com/help/docs/partners/testing-extension/development-acc#populate-test-data) in it.
* You have created an [extension](https://partners.fynd.com) in partner panel. if not, you can follow [extension guide](https://partners.fynd.com/help/docs/partners/getting-started/create-extension) to create an extension.
* Update below environment variable value in `.env` file, This details you can get from partners panel
    - EXTENSION_API_KEY:`Extension api key`
    - EXTENSION_API_SECRET: `Extension api secret`



### Project setup

### Install dependencies

**Install backend dependency**

Using yarn:
```
yarn install
```
Using npm:
```
npm install
```

**Install frontend dependency**

Using yarn:
```
yarn install --cwd ./frontend
```
Using npm:
```
npm install --prefix ./frontend
```


### Local development
To start development locally you need to start tunnel on `FRONTEND_PORT` defined in .env file to start tunnel you can use `fdk extension preview-url --port  <FRONTEND_PORT>`, it will provide partners panel URL  

> Before visiting partners panel URL provided by preview-url command you need to hit below command in new terminal

This command will start backend and frontend server in watch mode and changes you make locally will be directly visible in partners panel
```
node start-dev.js
```

### Build for production deployment
Build frontend.

Using yarn:
```
cd frontend && yarn run build
```
Using npm:
```
cd frontend && npm run build
```


### Backend API Proxying

When developing your application, the Vite development server is configured to handle API requests through a proxy. This setup forwards API calls to a backend server, specified by the  `BACKEND_PORT` environment variable, ensuring a smooth integration between your frontend and backend during development.

### Proxy Configuration

The Vite development server uses the following proxy configuration to direct API requests:
```
const proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false
}
```

### Database Configuration

By default, this template uses an `SQLite` database to store session data. SQLite is sufficient for development purpose only, it may not be suitable for all production scenarios. The best database for your application depends on your data requirements and query patterns.

If your app requires a more robust database solution, you can easily extend the base storage class provided by the `fdk-extension-javascript` library to use a database of your choice for session data. Here are some databases that we support by default:

- SQLite
- Memory Storage
- Redis

Feel free to configure and run your preferred database on your server to meet your specific needs.

### Tech Stack
1. [fdk-client-javascript](https://github.com/gofynd/fdk-client-javascript): This library contains all the methods to call Fynd platform APIs.
2. [fdk-extension-javascript](https://github.com/gofynd/fdk-extension-javascript): This library streamlines the setup of authentication for accessing Fynd Platform APIs. It also simplifies the process of subscribing to webhooks for receiving real-time notifications.


[coveralls-badge]: https://coveralls.io/repos/github/gofynd/example-extension-javascript-react/badge.svg?branch=main&&kill_cache=1
[coveralls-url]: https://coveralls.io/github/gofynd/example-extension-javascript-react?branch=main
