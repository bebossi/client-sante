import { login } from "../support/commands";

describe("testing admin", () => {
  beforeEach(() => {
    login();
  });

  it("should create appointment", () => {
    cy.intercept("POST", "/createAppointment", {
      statusCode: 200,
    });
    cy.intercept("GET", "/currentUser", {
      statusCode: 200,
      body: {
        role: "admin",
      },
    });

    cy.get('[data-cy="userMenu"]').click();
    cy.get('[data-cy="Agendamento"]', { timeout: 5000 }).click();
    cy.get('[data-cy="appointment-page"]').should("exist");
    cy.get('input[name="hour24"]').eq(0).click().type("20");
    cy.get('input[name="minute"]').eq(0).click().type("00");
    cy.get('input[name="hour24"]').eq(1).click({ force: true }).type("22");
    cy.get('input[name="minute"]').eq(1).click().type("00");
    cy.get('[data-cy="Crie um horário para busca e delivery"]').click();
    cy.contains("Horário criado").should("exist");
  });

  it("should set restaurant to be close", () => {
    cy.intercept("GET", "/currentUser", {
      statusCode: 200,
      body: {
        role: "admin",
      },
    });
    cy.intercept("PUT", "/updateIsOpen", {
      statusCode: 200,
    });
    cy.get('[data-cy="userMenu"]').click();
    cy.get('[data-cy="Agendamento"]').click();
    cy.get('[data-cy="appointment-page"]').should("exist");
    cy.get('[data-cy="updateIsOpen"]').click();
    cy.contains("Atualizado").should("exist");
  });

  it("interact with dashboard", () => {
    cy.intercept("GET", "/currentUser", {
      statusCode: 200,
      body: {
        role: "admin",
      },
    });
    cy.intercept("PUT", "/updateProduct/*", {
      statusCode: 200,
    });

    cy.get('[data-cy="userMenu"]').click();
    cy.get('[data-cy="Dashboard"]').click();
    cy.contains("Produtos").click();
    cy.get("#radix-\\:r2\\:").click();
    cy.contains("Atualizar").click();
    cy.contains("Editar").should("exist");
    cy.get("#\\:rr\\:-form-item").click().type(" atualizado");
    cy.get("#\\:rv\\:-form-item").click().type("20");
    cy.get('[data-cy="submit"]').click();
    cy.contains("Produto atualizado").should("exist");
  });
});
