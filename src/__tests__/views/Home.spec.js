import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router, Route, Routes, MemoryRouter } from 'react-router-dom';
import { Home } from '../../views/Home';
import MainService from '../../services/main-service';

jest.mock('../../services/main-service')
const mockProducts = {
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
}

const renderHomeWithParams = () => {
  return render(
    <Router>
      <Routes>
        <Route path="/:application_id?" element={<Home />} />
      </Routes>
    </Router>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loader when page is loading', () => {
    MainService.getAllProducts.mockReturnValue(new Promise(() => { })); // Simulate ongoing request
    const { getByTestId } = renderHomeWithParams({});
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  test('fetches and displays product list', async () => {
    MainService.getAllProducts.mockResolvedValue(mockProducts);
    const { getByText, getByAltText, getByTestId } = renderHomeWithParams({});

    await waitFor(() => {
      expect(getByTestId('product-name-1')).toBeInTheDocument();
      expect(getByTestId('product-item-code-1')).toBeInTheDocument();
      expect(getByText('Brand A')).toBeInTheDocument();
      expect(getByText('Category A')).toBeInTheDocument();
    });
  });

  test('renders Home component with application_id', async () => {
    MainService.getAllApplicationProducts.mockResolvedValue(mockProducts);
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={['/application/123']}>
        <Routes>
          <Route path="/application/:application_id" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(getByTestId('product-name-1')).toBeInTheDocument();
      expect(getByText('Brand A')).toBeInTheDocument();
      expect(getByText('Category A')).toBeInTheDocument();
    });
  });

});
