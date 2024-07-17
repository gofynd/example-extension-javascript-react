import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import MainService from '../services/main-service';

jest.mock('../services/main-service');

const renderHomeWithParams = (params) => {
  return render(
    <Router>
      <Route path="/:application_id?">
        <Home />
      </Route>
    </Router>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loader when page is loading', () => {
    MainService.getAllProducts.mockReturnValue(new Promise(() => {})); // Simulate ongoing request
    renderHomeWithParams({});
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches and displays product list', async () => {
    MainService.getAllProducts.mockResolvedValue({
      data: {
        items: [
          {
            is_active: true,
            media: [{ type: 'image', url: 'image1.png' }],
            name: 'Product 1',
            item_code: 'ITEM001',
            brand: { name: 'Brand A' },
            category_slug: 'Category A',
          },
          {
            is_active: false,
            media: [],
            name: 'Product 2',
            item_code: 'ITEM002',
            brand: { name: 'Brand B' },
            category_slug: 'Category B',
          },
        ],
      },
    });

    renderHomeWithParams({});
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Item Code:')).toBeInTheDocument();
      expect(screen.getByText('Brand A')).toBeInTheDocument();
      expect(screen.getByText('Category A')).toBeInTheDocument();
      expect(screen.getByAltText('text')).toHaveAttribute('src', 'image1.png');
    });
  });

  test('displays default image when media is empty', async () => {
    MainService.getAllProducts.mockResolvedValue({
      data: {
        items: [
          {
            is_active: true,
            media: [],
            name: 'Product 3',
            item_code: 'ITEM003',
          },
        ],
      },
    });

    renderHomeWithParams({});
    
    await waitFor(() => {
      expect(screen.getByAltText('text')).toHaveAttribute('src', expect.stringContaining('default_icon_listing.png'));
    });
  });

  test('renders correct document link based on application_id', () => {
    const { getDocumentPageLink } = Home.prototype;
    const application_id = '123';
    expect(getDocumentPageLink.call({ application_id })).toContain('/help/docs/sdk/latest/platform/application/catalog#getAppProducts');
  });

  test('renders without application_id', () => {
    renderHomeWithParams({});
    expect(screen.getByText('Example Platform API')).toBeInTheDocument();
    expect(screen.getByText('getProducts')).toBeInTheDocument();
  });
});
