/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
export function login() {
  cy.intercept("POST", "/login", {
    statusCode: 200,
    headers: {
      "set-cookie":
        "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJlOGRhMWFhLTFmMmUtNGQ1Yy1hYTQzLTM2MjBkNmEyMGEyZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NTAzOTY1MSwiZXhwIjoxNjk1MTI2MDUxfQ.Lnv8yiA1bFQUI1vHf5YUNdDzGOMwEdcN7HKTRtRJvyY; HttpOnly secure; path=/; samesite=none;",
    },
  });

  cy.visit("/", { timeout: 3000 });
  cy.get('[data-cy="userMenu"]', { timeout: 3000 }).click();
  cy.get('[data-cy="Entre"]', { timeout: 3000 }).click();
  cy.get("input#email", { timeout: 3000 }).click().type("aaaaaaa@teste");
  cy.get("input#password", { timeout: 3000 }).click().type("teste");
  cy.get('[data-cy="Continue"]', { timeout: 3000 }).click();
  // cy.contains("Usuario logado").should("exist");
}

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Request failed with status code 403") ||
    err.message.includes("Request failed with status code 401") ||
    err.message.includes(
      "TypeError: Cannot read properties of null (reading 'document')"
    )
  ) {
    return false;
  }
  //   return true;
});
