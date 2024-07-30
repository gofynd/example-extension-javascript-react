// __tests__/routeGuard.test.js

import { routeGuard } from '../../router/guard.js'; // Adjust the path as necessary
import { setCompany, setApplication } from '../../helper/utils'; // Adjust the path as necessary

// Mock the utility functions
jest.mock('../../helper/utils', () => ({
  setCompany: jest.fn(),
  setApplication: jest.fn(),
}));

describe('routeGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous calls to mocks
  });

  test('calls setCompany with company_id parameter', () => {
    const params = { company_id: '123' };
    routeGuard({ params });
    
    // Verify that setCompany is called with the correct parameter
    expect(setCompany).toHaveBeenCalledWith('123');
  });

  test('calls setApplication with application_id parameter', () => {
    const params = { application_id: '456' };
    routeGuard({ params });
    
    // Verify that setApplication is called with the correct parameter
    expect(setApplication).toHaveBeenCalledWith('456');
  });

  test('calls both setCompany and setApplication with respective parameters', () => {
    const params = { company_id: '123', application_id: '456' };
    routeGuard({ params });
    
    // Verify that both functions are called with the correct parameters
    expect(setCompany).toHaveBeenCalledWith('123');
    expect(setApplication).toHaveBeenCalledWith('456');
  });

  test('does not call setCompany if company_id is not provided', () => {
    const params = { application_id: '456' };
    routeGuard({ params });
    
    // Verify that setCompany is not called
    expect(setCompany).not.toHaveBeenCalled();
  });

  test('does not call setApplication if application_id is not provided', () => {
    const params = { company_id: '123' };
    routeGuard({ params });
    
    // Verify that setApplication is not called
    expect(setApplication).not.toHaveBeenCalled();
  });
});
