/// <reference types="Cypress" />

const ENV = Cypress.env(Cypress.env('stage'));
Cypress.config('baseUrl', ENV.baseUrl);

export class Navigator {
  public navigateTo(path: string): void {
    cy.visit(path);
  }

  public login(): void {
    this.navigateTo('');
    cy.get('#cy-username')
      .type('admin')
      .should('have.value', 'admin');
    cy.get('#cy-password')
      .type('admin')
      .should('have.value', 'admin');
    cy.get('#cy-login')
      .click();
    cy.get('#cy-page-heading')
      .should('be.visible');
    cy.get('#cy-logout')
      .should('be.visible');
  }

  public logout(): void {
    cy.get('#cy-logout')
      .click();
    cy.get('#cy-username')
      .should('be.visible');
  }
}
