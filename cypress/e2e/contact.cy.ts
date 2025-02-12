describe('Contact Form', () => {
  before(() => {
    // Disable all uncaught exception handling for hydration issues
    Cypress.on('uncaught:exception', () => false);
  });

  beforeEach(() => {
    // Configure longer timeout for all commands
    Cypress.config('defaultCommandTimeout', 20000);
    Cypress.config('pageLoadTimeout', 30000);
    
    // Visit contact page with proper setup
    cy.visit('/contact', {
      failOnStatusCode: false,
      timeout: 30000
    });
    
    // Wait for page to be fully loaded
    cy.window().should('have.property', 'document')
      .and('have.property', 'readyState')
      .and('eq', 'complete');

    // Intercept API calls
    cy.intercept('POST', '/api/send', {
      statusCode: 200,
      body: { success: true }
    }).as('sendMessage');

    // Wait for form to be loaded
    cy.get('form', { timeout: 20000 })
      .should('exist')
      .should('be.visible');
  });

  it('should successfully submit the form', () => {
    // Fill out the form with retries
    cy.get('input[name="name"]', { timeout: 10000 })
      .should('be.visible')
      .type('Test User');
    cy.get('input[name="email"]', { timeout: 10000 })
      .should('be.visible')
      .type('test@example.com');
    cy.get('input[name="phone"]', { timeout: 10000 })
      .should('be.visible')
      .type('+31612345678');
    cy.get('input[name="company"]', { timeout: 10000 })
      .should('be.visible')
      .type('Test Company');
    cy.get('textarea[name="message"]', { timeout: 10000 })
      .should('be.visible')
      .type('This is a test message');

    // Submit form
    cy.get('button[type="submit"]', { timeout: 10000 })
      .should('be.visible')
      .click();

    // Wait for API call
    cy.wait('@sendMessage');

    // Check success message with language support
    cy.contains(
      Cypress.env('LANG') === 'nl' 
        ? 'Bericht succesvol verzonden!' 
        : 'Message sent successfully!',
      { timeout: 10000 }
    ).should('be.visible');

    // Form should be reset
    cy.get('input[name="name"]', { timeout: 10000 }).should('have.value', '');
    cy.get('textarea[name="message"]', { timeout: 10000 }).should('have.value', '');
  });

  it('should handle API errors gracefully', () => {
    // Override the API intercept to return an error
    cy.intercept('POST', '/api/send', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('sendMessageError');

    // Fill out the form with retries
    cy.get('input[name="name"]', { timeout: 10000 })
      .should('be.visible')
      .type('Test User');
    cy.get('input[name="email"]', { timeout: 10000 })
      .should('be.visible')
      .type('test@example.com');
    cy.get('textarea[name="message"]', { timeout: 10000 })
      .should('be.visible')
      .type('This is a test message');

    // Submit form
    cy.get('button[type="submit"]', { timeout: 10000 })
      .should('be.visible')
      .click();

    // Wait for API call
    cy.wait('@sendMessageError');

    // Check error message with language support
    cy.contains(
      Cypress.env('LANG') === 'nl'
        ? 'Bericht versturen mislukt. Probeer het opnieuw.'
        : 'Failed to send message. Please try again.',
      { timeout: 10000 }
    ).should('be.visible');

    // Form values should be preserved
    cy.get('input[name="name"]', { timeout: 10000 }).should('have.value', 'Test User');
    cy.get('textarea[name="message"]', { timeout: 10000 }).should('have.value', 'This is a test message');
  });

  it('should handle form submission state correctly', () => {
    // Add delay to API response to test loading state
    cy.intercept('POST', '/api/send', {
      statusCode: 200,
      body: { success: true },
      delay: 1000
    }).as('sendMessageDelay');

    // Fill required fields with retries
    cy.get('input[name="name"]', { timeout: 10000 })
      .should('be.visible')
      .type('Test User');
    cy.get('input[name="email"]', { timeout: 10000 })
      .should('be.visible')
      .type('test@example.com');
    cy.get('textarea[name="message"]', { timeout: 10000 })
      .should('be.visible')
      .type('This is a test message');

    // Submit form
    cy.get('button[type="submit"]', { timeout: 10000 })
      .should('be.visible')
      .click();

    // Check loading state with language support
    cy.contains(
      Cypress.env('LANG') === 'nl' ? 'VERSTUREN...' : 'SENDING...',
      { timeout: 10000 }
    ).should('be.visible');
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.disabled');

    // Wait for API response
    cy.wait('@sendMessageDelay');

    // Check button returns to normal state
    cy.get('button[type="submit"]', { timeout: 10000 }).should('not.be.disabled');
    cy.contains(
      Cypress.env('LANG') === 'nl' ? 'VERSTUREN...' : 'SENDING...',
      { timeout: 10000 }
    ).should('not.exist');
  });
}); 