describe("testing auth", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", (err) => {
      if (
        err.message.includes("Request failed with status code 403") ||
        err.message.includes("Request failed with status code 401")
      ) {
        return false;
      }
      return true;
    });
  });

  it("should login with fake user data", () => {
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
    cy.contains("Usuario logado").should("exist");
  });

  it("should signup with fake user data", () => {
    cy.intercept("POST", "/signup", {
      statusCode: 200,
    });

    cy.visit("/", { timeout: 3000 });
    cy.get('[data-cy="userMenu"]', { timeout: 3000 }).click();
    cy.get('[data-cy="Cadastre"]', { timeout: 3000 }).click();
    cy.get("input#email", { timeout: 3000 }).click().type("werner@teste");
    cy.get("input#password", { timeout: 3000 }).click().type("teste");
    cy.get('[data-cy="Continue"]', { timeout: 3000 }).click();
    cy.contains("Usuário registrado e logado com sucesso").should("exist");
  });
});
