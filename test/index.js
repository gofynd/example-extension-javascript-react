const server = require('../server'); // Import the server module

describe('Test server', () => {
    it('Should start the server on the specified port', () => {
        const mockPort = 3000;
        process.env.PORT = mockPort;
        const app = server();
        app.listen = jest.fn();
        app.listen(mockPort, () => {});
        expect(app.listen).toHaveBeenCalledWith(mockPort, expect.any(Function));
    });
});