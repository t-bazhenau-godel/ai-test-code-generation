// path: src/test-data/checkoutData.ts

/**
 * Test data for checkout operations
 */
export const checkoutData = {
  /**
   * Valid checkout information for standard user
   */
  validCheckout: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },

  /**
   * Invalid checkout data - missing fields
   */
  emptyFirstName: {
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345',
  },

  /**
   * Invalid checkout data - missing last name
   */
  emptyLastName: {
    firstName: 'John',
    lastName: '',
    postalCode: '12345',
  },

  /**
   * Invalid checkout data - missing postal code
   */
  emptyPostalCode: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
  },

  /**
   * Alternative valid checkout information
   */
  validCheckoutAlternative: {
    firstName: 'Jane',
    lastName: 'Smith',
    postalCode: '54321',
  },
};
