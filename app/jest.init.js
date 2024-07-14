const fdkExtension = require("fdk-extension-javascript/express")
const express = require('express');

// Write your own jest init
jest.mock("fdk-extension-javascript/express", jest.fn(() => {
    return {
        setupFdk: function () {
            return {
                fdkHandler: (req, res, next) => {
                    next();
                },
                apiRoutes: express.Router()
            }
        }
    }
}))