/// <reference types="cypress" />

import { login } from "../support/commands";

describe("Interact with cart", () => {
  beforeEach(() => {
    login();
  });

  it("should interact with cart", () => {
    cy.intercept("POST", "/addProduct", {
      statusCode: 200,
    });
    cy.intercept("GET", "/cart", {
      statusCode: 200,
      body: {
        id: "c27634a1-5cbd-4383-9898-97290794b6c7",
        userId: "2e8da1aa-1f2e-4d5c-aa43-3620d6a20a2f",
        subtotal: 36,
        sessionId: null,
        cartProducts: [
          {
            cartId: "c27634a1-5cbd-4383-9898-97290794b6c7",
            cartToProductToppings: [
              {
                cartToProdId: "7ac7c00b-cf51-40b2-a00b-4c22e999f56e",
                id: "603ffc90-8cad-482c-983c-47244a948e9c",
                quantity: 2,
                topping: {
                  description: "Banan picada ,150g",
                  id: "31cc2701-7507-47e1-bb9e-4d2b16872721",
                  image:
                    "https://res.cloudinary.com/dnhy6fqpj/image/upload/v1693502060/ftim0pnx0bsa0ejmfui2.jpg",
                  name: "Banana",
                  price: 3,
                },
              },
              {
                cartToProdId: "7ac7c00b-cf51-40b2-a00b-4c22e999f56e",
                id: "3976d658-1273-4b64-b7a6-55ef1654af2e",
                quantity: 0,
                topping: {
                  description: "100 gramas de morango fresco picado",
                  id: "1d21ff21-98aa-4a64-aab6-7aad3cea0d05",
                  image:
                    "https://res.cloudinary.com/dnhy6fqpj/image/upload/v1694684492/tgnuaci5bztxch6wpl4e.jpg",
                  name: "Morango picado",
                  price: 3,
                },
              },
            ],
            id: "7ac7c00b-cf51-40b2-a00b-4c22e999f56e",
            price: 36,
            productId: "2577cbaa-b7b7-47b3-94c3-31dddab878c5",
            quantity: 2,
            product: {
              categoryId: "fabf5ed3-2264-4452-98c6-279e54e855f4",
              createdAt: "2023-08-31T16:01:55.709Z",
              description: "Delicioso açai creme 300 ml",
              id: "2577cbaa-b7b7-47b3-94c3-31dddab878c5",
              image:
                "https://res.cloudinary.com/dnhy6fqpj/image/upload/v1693497657/otwwchaet7rvbditbndo.jpg",
              name: "Açai 300 ml",
              price: "15",
              updatedAt: "2023-08-31T16:01:55.709Z",
            },
          },
        ],
      },
    });
    cy.intercept("POST", "/guestUser", {
      statusCode: 200,
    });

    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="card-product"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .eq(0)
      .click();
    cy.get('[data-cy="increaseTopping"]').eq(0).click();
    cy.get('[data-cy="increaseTopping"]').eq(0).click();
    cy.get('[data-cy="decreaseTopping"]').eq(0).click();
    cy.get('[data-cy="topping-quantity"]').eq(0).should("have.text", "1");

    cy.get('[data-cy="increaseQuantity"]').eq(0).click();
    cy.get('[data-cy="increaseQuantity"]').eq(0).click();
    cy.get('[data-cy="decreaseQuantity"]').eq(0).click();
    cy.get('[data-cy="product-quantity"]').eq(0).should("have.text", "2");

    cy.contains("Adicionar").click();
    // cy.get('[data-cy="menu"]', { timeout: 3000 });

    cy.get('[data-cy="cart-div"]', { timeout: 20000 });
  });
});
