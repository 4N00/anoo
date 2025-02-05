import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in a user
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Custom command to log out the current user
       * @example cy.logout()
       */
      logout(): Chainable<void>;

      /**
       * Custom command to create a new project
       * @example cy.createProject({ title: 'Test Project', description: 'Test Description' })
       */
      createProject(project: Record<string, unknown>): Chainable<unknown>;

      /**
       * Custom command to delete a project
       * @example cy.deleteProject('project-id')
       */
      deleteProject(projectId: string): Chainable<void>;

      /**
       * Custom command to wait for network requests to complete
       * @example cy.waitForNetworkIdle()
       */
      waitForNetworkIdle(timeout?: number): Chainable<void>;

      /**
       * Custom command to check if an element is in viewport
       * @example cy.get('.element').isInViewport()
       */
      isInViewport(): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to clear local storage and cookies
       * @example cy.clearLocalStorageAndCookies()
       */
      clearLocalStorageAndCookies(): Chainable<void>;

      /**
       * Custom command to mock Supabase authentication
       * @example cy.mockSupabaseAuth()
       */
      mockSupabaseAuth(): Chainable<void>;
    }
  }
}