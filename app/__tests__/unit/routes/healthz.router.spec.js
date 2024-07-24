const request = require('../utils/server')()

describe('Health check', () => {
    afterAll(async () => {
        request.app.close()
    })
    it('GET healthz it should response with 200', async () => {
        const res = await request.get('/_healthz');
        expect(res.statusCode).toEqual(200);
    });
});
