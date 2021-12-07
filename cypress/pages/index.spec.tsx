/// <reference types="cypress" />

describe('Home page tests', () => {
  before(() => {
    cy.visit('/');
  });

  it('search input should be focused', () => {
    cy.focused().should('have.attr', 'type', 'search');
  });

  it('should update url when typing in search input', () => {
    cy.get('input').type('face');
    cy.url().should('include', 'face');

    cy.get('input').clear();
    cy.url().should('not.include', 'face');
  });
});

export {};
