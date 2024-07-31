let request = null;
const supertest = require('supertest');
const app = require('../../server');
const express = require('express');

// Create a new instance of the app with the mock middleware
const createTestApp = () => {
  app.use((req, res, next) => {
    req.platformClient = mockPlatformClient;
    next();
  });
  const testApp = express();

  // Middleware to attach mockPlatformClient
  testApp.use((req, res, next) => {
    req.platformClient = mockPlatformClient;
    next();
  });

  // Use the existing app as a middleware
  testApp.use(app);
  return testApp;
};

// Create a mock platformClient
const mockPlatformClient = {
  catalog: {
    getProducts: jest.fn().mockResolvedValue([{ id: 1, name: 'Product A' }]),
  },
  application: (applicationId) => ({
    catalog: {
      getAppProducts: jest.fn().mockResolvedValue([{ id: 2, name: 'App Product B' }]),
    },
  }),
};

module.exports = () => {
  if (!request) {
    request = supertest(createTestApp());
  }
  return { request, mockPlatformClient }
}
