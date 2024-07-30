const { request, mockPlatformClient } = require('../utils/server')();

describe('Product Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/products: should get the products list', async () => {
    const response = await request.get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: 'Product A' }]);
  });

  it('GET /api/products/application/:application_id: should get products list for a specific application', async () => {
    const applicationId = '000000000000000000000001';
    const response = await request.get(`/api/products/application/${applicationId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 2, name: 'App Product B' }]);
  });

  it('GET /healthz: should response with 200', async () => {
    const res = await request.get('/_healthz');
    expect(res.statusCode).toEqual(200);
  });

  it('GET /readyz: should response with 200', async () => {
    const res = await request.get('/_readyz');
    expect(res.statusCode).toEqual(200);
  });

  it('GET /*: Fallback route', async () => {
    const res = await request.get('/test');
    expect(res.headers['content-type']).toEqual("text/html; charset=utf-8");
  });

  it('GET /api/products: should handle errors in the product list route', async () => {
    // Mock getProducts to throw an error
    mockPlatformClient.catalog.getProducts.mockRejectedValueOnce(new Error('Failed to fetch products'));
    const response = await request.get('/api/products');
    expect(response.statusCode).toBe(500);
  });

});
