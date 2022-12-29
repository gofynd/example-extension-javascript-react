let request = null;

module.exports = () => {
    if (!request) {
        let supertest = require('supertest');
        let app = require('../../../server');
        app = app.listen(0);
        request = supertest(app);
        request.app = app;

        // keep it after all the initialisation, or the mongoose models will not be registered
        // and it will throw error
    }
    return request;
};
