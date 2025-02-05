import './e2e';

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login');
  });
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('supabase.auth.token');
  });
  cy.visit('/');
});

// Create project command
Cypress.Commands.add('createProject', (project: Record<string, unknown>) => {
  cy.request({
    method: 'POST',
    url: '/api/projects',
    body: project,
  }).then((response) => {
    expect(response.status).to.eq(201);
    return cy.wrap(response.body);
  });
});

// Delete project command
Cypress.Commands.add('deleteProject', (projectId: string) => {
  cy.request({
    method: 'DELETE',
    url: `/api/projects?id=${projectId}`,
  }).then((response) => {
    expect(response.status).to.eq(204);
  });
});

// Wait for network idle
Cypress.Commands.add('waitForNetworkIdle', (timeout = 1000) => {
  let requestCount = 0;

  cy.intercept('**/*', (req) => {
    requestCount++;
    req.on('response', () => {
      requestCount--;
    });
  });

  cy.wait(timeout).then(() => {
    expect(requestCount).to.eq(0);
  });
});

// Check if element is visible in viewport
Cypress.Commands.add('isInViewport', { prevSubject: true }, (subject: JQuery<HTMLElement>) => {
  if (!subject || !subject[0]) {
    throw new Error('No element found');
  }

  const windowHeight = Cypress.config('viewportHeight') || 660;
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.lessThan(windowHeight);
  expect(rect.bottom).to.be.greaterThan(0);

  return cy.wrap(subject);
});

// Clear local storage and cookies
Cypress.Commands.add('clearLocalStorageAndCookies', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

// Mock Supabase auth
Cypress.Commands.add('mockSupabaseAuth', () => {
  cy.intercept('POST', '**/auth/v1/token?grant_type=password', {
    statusCode: 200,
    body: {
      access_token: 'mock-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
      user: {
        id: 'mock-user-id',
        email: 'admin@example.com',
        role: 'ADMIN',
      },
    },
  });
});

// Ensure commands are properly typed
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): void;
      logout(): void;
      createProject(project: Record<string, unknown>): Chainable<unknown>;
      deleteProject(projectId: string): void;
      waitForNetworkIdle(timeout?: number): void;
      isInViewport(): Chainable<JQuery<HTMLElement>>;
      clearLocalStorageAndCookies(): void;
      mockSupabaseAuth(): void;
    }
  }
}