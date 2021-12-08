/// <reference types="cypress" />

describe('Home page tests', () => {
  before(() => {
    cy.visit('/');
  });

  it('search input should be focused', () => {
    cy.focused().should('have.attr', 'type', 'search');
  });

  it('should load 60 emojis on initial load', () => {
    cy.get('[data-cy="emojis_grid"]').find('li').should('have.length', 60);
  });

  it('should load more data after scrolling close to the bottom of the page', () => {
    cy.get('[data-cy="grid_container"]')
      .scrollTo('bottom')
      .find('li')
      .should('have.length', 120);
  });

  it('should update url when typing in search input', () => {
    cy.get('input').type('face');
    cy.url().should('include', 'face');

    cy.get('input').clear();
    cy.url().should('not.include', 'face');
  });

  it('should successfully search items after typing in search input', () => {
    cy.get('input').type('smile');
    cy.contains(/results found/i).should('exist');
  });

  it('should load more search results after scrolling close to the bottom of the page', () => {
    cy.get('[data-cy="grid_container"]')
      .scrollTo('bottom')
      .find('li')
      .should('have.length.greaterThan', 60);
  });

  it('should show "no results found" if search does not yield any results', () => {
    cy.get('input').clear().type('xxxxxxx');
    cy.contains(/no results found/i).should('exist');
  });
});

export {};
