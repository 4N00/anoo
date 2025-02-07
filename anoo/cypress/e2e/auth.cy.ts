describe('Authentication', () => {
  beforeEach(() => {
    cy.clearLocalStorageAndCookies();
  });

  describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('should show validation errors for empty form submission', () => {
      cy.get('button[type="submit"]').click();

      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });

    it('should show error for invalid email format', () => {
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.contains('Invalid email address').should('be.visible');
    });

    it('should show error for incorrect credentials', () => {
      cy.intercept('POST', '**/auth/v1/token?grant_type=password', {
        statusCode: 400,
        body: {
          error: 'Invalid login credentials',
        },
      });

      cy.get('input[type="email"]').type('wrong@example.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();

      cy.contains('Invalid login credentials').should('be.visible');
    });

    it('should successfully log in with correct credentials', () => {
      cy.mockSupabaseAuth();
      cy.get('input[type="email"]').type('admin@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      // Should redirect to admin page
      cy.url().should('include', '/admin');
    });

    it('should maintain login state after page refresh', () => {
      // Log in
      cy.mockSupabaseAuth();
      cy.login('admin@example.com', 'password123');

      // Visit admin page
      cy.visit('/admin');

      // Refresh page
      cy.reload();

      // Should still be on admin page
      cy.url().should('include', '/admin');
    });
  });

  describe('Protected Routes', () => {
    it('should redirect to login when accessing admin page without auth', () => {
      cy.visit('/admin');
      cy.url().should('include', '/login');
    });

    it('should redirect to login when accessing api without auth', () => {
      cy.request({
        url: '/api/projects',
        method: 'POST',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });

    it('should allow access to public pages without auth', () => {
      cy.visit('/');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      cy.mockSupabaseAuth();
      cy.login('admin@example.com', 'password123');
    });

    it('should successfully log out', () => {
      cy.visit('/admin');
      cy.contains('Log Out').click();

      // Should redirect to login page
      cy.url().should('include', '/login');

      // Should not be able to access admin page
      cy.visit('/admin');
      cy.url().should('include', '/login');
    });

    it('should clear auth state on logout', () => {
      cy.visit('/admin');
      cy.contains('Log Out').click();

      // Check local storage
      cy.window().then((win) => {
        expect(win.localStorage.getItem('supabase.auth.token')).to.be.null;
      });
    });
  });

  describe('Session Expiry', () => {
    it('should handle expired sessions gracefully', () => {
      // Mock expired token response
      cy.intercept('GET', '**/auth/v1/user', {
        statusCode: 401,
        body: {
          error: 'Token expired',
        },
      });

      cy.mockSupabaseAuth();
      cy.login('admin@example.com', 'password123');
      cy.visit('/admin');

      // Should redirect to login
      cy.url().should('include', '/login');
      cy.contains('Session expired. Please log in again.').should('be.visible');
    });

    it('should refresh token when needed', () => {
      cy.intercept('POST', '**/auth/v1/token?grant_type=refresh_token', {
        statusCode: 200,
        body: {
          access_token: 'new-mock-token',
          refresh_token: 'new-mock-refresh-token',
          expires_in: 3600,
        },
      });

      cy.mockSupabaseAuth();
      cy.login('admin@example.com', 'password123');
      cy.visit('/admin');

      // Force token refresh
      cy.window().then((win) => {
        win.localStorage.setItem('supabase.auth.token', JSON.stringify({
          currentSession: {
            expires_at: Date.now() - 1000,
          },
        }));
      });

      // Should stay logged in after token refresh
      cy.reload();
      cy.url().should('include', '/admin');
    });
  });
});