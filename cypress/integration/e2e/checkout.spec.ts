describe('Proceso de Checkout', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('test@example.com', 'password123');
  });

  it('debería permitir al usuario completar el proceso de checkout', () => {
    cy.get('[data-testid="product-item"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();
    cy.get('[data-testid="cart-icon"]').click();
    cy.get('[data-testid="checkout-button"]').click();
    cy.get('[data-testid="checkout-form"]').within(() => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="address"]').type('123 Test St');
      cy.get('input[name="city"]').type('Test City');
      cy.get('input[name="zipCode"]').type('12345');
    });
    cy.get('[data-testid="place-order-button"]').click();
    cy.get('[data-testid="order-confirmation"]').should('be.visible');
  });
});