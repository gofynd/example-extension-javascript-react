const express = require('express');
jest.mock("@gofynd/fdk-extension-javascript/express/storage", () => {
    return {
      SQLiteStorage: jest.fn().mockImplementation(() => ({})),
    };
  });
// Write your own jest init
jest.mock("@gofynd/fdk-extension-javascript/express", jest.fn(() => {
    return {
        setupFdk: function () {
            return {
                fdkHandler: (req, res, next) => {
                    next();
                },
                platformApiRoutes: express.Router()
            }
        }
    }
}))